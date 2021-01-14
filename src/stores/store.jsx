import async from 'async';
import {
  PROVIDER,
  SUSHI_CONTRACT_ADDRESS,
  ERROR,
  GET_ACCOUNT,
  GET_ACCOUNT_RETURNED
} from '../constants';
import Web3 from 'web3';

import { ERC20ABI } from './abi/erc20ABI';
import { SushiILProtectionABI } from './abi/sushiILProtectionABI'

import BigNumber from 'bignumber.js'

const rp = require('request-promise');

const Dispatcher = require('flux').Dispatcher;
const Emitter = require('events').EventEmitter;

const dispatcher = new Dispatcher();
const emitter = new Emitter();

class Store {
  constructor() {

    this.store = {
      web3context: null,
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case GET_ACCOUNT:
            this.getAccount(payload);
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    // console.log(this.store)
    return emitter.emit('StoreUpdated');
  };

  getAccount = async (payload) => {

    const { address } = payload.content
    const web3 = await this._getWeb3Provider()

    const sushiContract = new web3.eth.Contract(SushiILProtectionABI, SUSHI_CONTRACT_ADDRESS)

    const markets = await this._getMarkets(sushiContract)

    async.map(markets, async (market, callback) => {

      try {
        const marketContract = new web3.eth.Contract(ERC20ABI, market)

        let symbol = ''
        let name = ''
        let erc20Decimals = 0
        if(market.toLowerCase() === '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2'.toLowerCase()) {
          symbol = 'MKR'
          name = 'Maker'
          erc20Decimals = 18
        } else {
          symbol = await marketContract.methods.symbol().call();
          name = await marketContract.methods.name().call();
          erc20Decimals = parseInt(await marketContract.methods.decimals().call())
        }

        const bnERC20Decimals = new BigNumber(10)
          .pow(erc20Decimals)

        const decimals = parseInt(await sushiContract.methods.decimals().call());
        const bnDecimals = new BigNumber(10)
          .pow(decimals)

        let balance = 0
        let borrowed = 0
        let lp = 0
        let profit = 0
        let shortFall = 0
        let shortFallInToken = 0
        let underlyingBalanceOf = 0

        try {
          balance = await sushiContract.methods.balanceOf(address).call();
        } catch(ex) {
          balance = 0
        }

        try {
          borrowed = await sushiContract.methods.borrowed(address, market).call();
        } catch(ex) {
          lp = 0
        }

        try {
          lp = await sushiContract.methods.lp(address, market).call();
        } catch(ex) {
          lp = 0
        }

        try {
          profit = await sushiContract.methods.profit(market, address, balance).call();
        } catch(ex) {
          profit = 0
        }

        try {
          shortFall = await sushiContract.methods.shortFall(market, address, balance).call();
        } catch(ex) {
          shortFall = 0
        }

        try {
          shortFallInToken = await sushiContract.methods.shortFallInToken(market, address, balance).call();
        } catch(ex) {
          shortFallInToken = 0
        }

        try {
          underlyingBalanceOf = await sushiContract.methods.underlyingBalanceOf(address, market).call();
        } catch(ex) {
          underlyingBalanceOf = 0
        }

        const bnBalance = new BigNumber(balance)
          .div(bnDecimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnBorrowed = new BigNumber(borrowed)
          .div(bnDecimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnLP = new BigNumber(lp)
          .div(bnDecimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnProfit = new BigNumber(profit)
          .div(bnDecimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnShortfall = new BigNumber(shortFall)
          .div(bnDecimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnShortfallInToken = new BigNumber(shortFallInToken)
          .div(bnERC20Decimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);
        const bnUnderlyingBalance = new BigNumber(underlyingBalanceOf)
          .div(bnERC20Decimals)
          .toFixed(decimals, BigNumber.ROUND_DOWN);

        const asset = {
          address: market,
          name: name,
          symbol: symbol,
          balance: bnBalance,
          borrowed: bnBorrowed,
          lp: bnLP,
          profit: bnProfit,
          shortFall: bnShortfall,
          shortFallInToken: bnShortfallInToken,
          underlyingBalance: bnUnderlyingBalance,
        }

        if(callback) {
          callback(null, asset)
        } else {
          return asset
        }
      } catch(ex) {
        console.log(ex)
        if(callback) {
          callback(ex)
        } else {
          throw ex
        }
      }
    }, (err, assets) => {
      if(err) {
        return emitter.emit(ERROR, err)
      }

      store.setStore({ markets: assets })
      return emitter.emit(GET_ACCOUNT_RETURNED, assets)
    })
  }

  _getMarkets = async (sushiContract) => {
    try {
      return await sushiContract.methods.markets().call()
    } catch (ex) {
      console.log(ex)
      return []
    }
  }

  _getWeb3Provider = async () => {
    const web3 = new Web3(PROVIDER)
    return web3
  }
}

var store = new Store();

export default {
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
};
