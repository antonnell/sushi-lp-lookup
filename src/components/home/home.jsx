import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  TextField,
  CircularProgress,
  Switch
} from '@material-ui/core';
import BigNumber from 'bignumber.js'
import SearchIcon from '@material-ui/icons/Search';

import { colors } from '../../theme'

import {
  ERROR,
  GET_ACCOUNT,
  GET_ACCOUNT_RETURNED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    center: 'flex-start',
    alignItems: 'center'
  },
  seachContainer: {
    backgroundColor: colors.sushiBackground,
    fontSize: '36px',
    height: '80px',
    borderRadius: '40px',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    display: 'flex',
    '-webkit-box-pack': 'center',
    justifyContent: 'center',
    boxShadow: 'rgb(226, 214, 207) 4px 4px 8px inset, rgb(247, 244, 242) -6px -6px 12px inset',
    margin: '0px auto 16px',
    paddingLeft: '12px'
  },
  searchInput: {
    padding: '12px',
    minWidth: '600px',
  },
  searchButton: {
    height: '80px',
    width: '80px',
    borderRadius: '40px'
  },
  resultCard: {
    background: colors.sushiCardBackground,
    boxShadow: colors.sushiCardBoxShadow,
    border: '1px solid '+colors.sushiCardBorder,
    width: '260px',
    minHeight: '300px',
    borderRadius: '12px',
    margin: '12px',
    padding: '24px'
  },
  resultCards: {
    width: '100%',
    maxWidth: '1200px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly'
  },
  marketLogo: {
    fontSize: '36px',
    height: '80px',
    width: '80px',
    borderRadius: '40px',
    '-webkit-box-align': 'center',
    alignItems: 'center',
    display: 'flex',
    '-webkit-box-pack': 'center',
    justifyContent: 'center',
    boxShadow: 'rgb(226, 214, 207) 4px 4px 8px inset, rgb(247, 244, 242) -6px -6px 12px inset',
    margin: '0px auto 16px',
  },
  stats: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  stat: {
    width: '100%',
    height: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  name: {
    padding: '6px, 0px'
  },
  toggleSwitch: {
    display: 'flex',
    alignItems: 'center'
  },
  fitlers: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
  }
});

class Home extends Component {

  constructor(props) {
    super()

    this.state = {
      search: '',
      markets: null,
      loading: false,
      viewAll: true,
    }
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned);
    emitter.on(GET_ACCOUNT_RETURNED, this.accountReturned);
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned);
    emitter.removeListener(GET_ACCOUNT_RETURNED, this.accountReturned);
  };

  errorReturned = () => {
    this.setState({
      loading: false,
    })
  }

  accountReturned = () => {
    this.setState({
      loading: false,
      markets: store.getStore('markets')
    })
  }

  render() {
    const { classes } = this.props;
    const { search, markets, loading, viewAll } = this.state

    console.log(viewAll)

    return (
      <div className={ classes.root }>
        <div className={ classes.fitlers }>
          <div className={ classes.seachContainer }>
            <TextField
              id='search'
              value={ search }
              onChange={ this.onChange }
              className={ classes.searchInput }
              onKeyDown={ this.onSearchKeyDown }
              placeholder='Search'
            />
            <Button
              className={ classes.searchButton}
              onClick={ this.onSearchClick }
              >
              <SearchIcon color='primary' />
            </Button>
          </div>
          <div className={ classes.toggleSwitch}>
            <Typography variant='h5'>With Balance</Typography>
            <Switch
              name='viewAll'
              checked={ viewAll }
              onChange={ this.viewAllChanged }
              color="primary"
            />
            <Typography variant='h5'>All</Typography>
          </div>
        </div>
        { loading &&
          <CircularProgress />
        }
        { !loading &&
          <div className={ classes.resultCards }>
            { markets &&
              markets.filter((mar) => {
                if(viewAll === true) {
                  return true
                }

                return mar.borrowed > 0 || mar.underlyingBalance > 0
              }).map((market) => {
                return this.renderMarket(market)
              })
            }
          </div>
        }
      </div>
    )
  };

  renderMarket = (market) => {
    const { classes } = this.props;

    return <div className={ classes.resultCard }>
      <div className={ classes.marketLogo }>
        <img
          alt=""
          src={ this.getLogoForAsset(market) }
          height="30px"
        />
      </div>
      <Typography variant='h3' align='center' className={ classes.name }>{ market.symbol }</Typography>
      <div className={ classes.stats }>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>Borrowed</Typography>
          <Typography variant='h4'>{ new BigNumber(market.borrowed).toFixed(2) } { market.symbol }</Typography>
        </div>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>LP</Typography>
          <Typography variant='h4'>{ new BigNumber(market.lp).toFixed(2) }</Typography>
        </div>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>Profit</Typography>
          <Typography variant='h4'>{ new BigNumber(market.profit).toFixed(2) }</Typography>
        </div>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>Shortfall</Typography>
          <Typography variant='h4'>{ new BigNumber(market.shortFall).toFixed(2) }</Typography>
        </div>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>Shortfall In Token</Typography>
          <Typography variant='h4'>{ new BigNumber(market.shortFallInToken).toFixed(2) } { market.symbol }</Typography>
        </div>
        <div className={ classes.stat }>
          <Typography variant='h4' color='primary'>UL Balance</Typography>
          <Typography variant='h4'>{ new BigNumber(market.underlyingBalance).toFixed(2) } { market.symbol }</Typography>
        </div>
      </div>
    </div>
  }

  getLogoForAsset = (asset) => {
    try {
      return require('../../assets/tokens/'+asset.symbol+'-logo.png')
    } catch {
      return require('../../assets/tokens/unknown-logo.png')
    }
  }

  viewAllChanged = (event) => {
    let val = {}
    val[event.target.name] = event.target.checked
    this.setState(val)
  }

  onChange = (event) => {
    let val = {}
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  onSearchKeyDown = (event) => {
    if(event.which == 13) {
      this.onSearchClick()
    }
  }

  onSearchClick = () => {
    const { search } = this.state

    this.setState({ loading: true })
    dispatcher.dispatch({ type: GET_ACCOUNT, content: { address: search } })
  }
}

export default withRouter(withStyles(styles)(Home));
