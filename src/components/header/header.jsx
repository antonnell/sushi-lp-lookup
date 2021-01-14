import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  Typography
} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { colors } from '../../theme'
import ENS from 'ethjs-ens';

import Store from "../../stores";
const emitter = Store.emitter
const store = Store.store

const styles = theme => ({
  root: {
    verticalAlign: 'top',
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '40px'
    }
  },
  header: {
    borderTop: 'none',
    width: '100%',
    display: 'flex',
    padding: '24px 32px',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      padding: '16px 24px'
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    cursor: 'pointer',
  },
  iconPNG: {
    marginRight: '12px'
  },
  links: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    }
  },
  link: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    '&:hover': {
      paddingBottom: '9px',
      borderBottom: "3px solid "+colors.newBlue,
    }
  },
  title: {
    textTransform: 'capitalize'
  },
  linkActive: {
    padding: '12px 0px',
    margin: '0px 12px',
    cursor: 'pointer',
    paddingBottom: '9px',
    borderBottom: "3px solid "+colors.newBlue,
  },
  account: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flex: '0'
    }
  },
});

class Header extends Component {

  constructor(props) {
    super()

    this.state = {
      account: store.getStore('account'),
      modalOpen: false
    }
  }

  render() {
    const {
      classes
    } = this.props;

    const {
      account,
      addressEnsName,
      modalOpen
    } = this.state

    return (
      <div className={ classes.root }>
        <div className={ classes.header }>
          <div className={ classes.icon }>
            <img
              className={ classes.iconPNG }
              alt=""
              src={ require('../../assets/SUSHI-logo.png') }
              height={ '30px' }
              onClick={ () => { this.nav('') } }
            />
            <Typography variant='h4'>Sushi Lookup</Typography>
          </div>
          <div className={ classes.links }>
          </div>
          <div className={ classes.account }>
          </div>
        </div>
      </div>
    )
  }

  renderLink = (screen) => {
    const {
      classes
    } = this.props;

    return (
      <div className={ (window.location.pathname==='/'+screen || (window.location.pathname === '/' && screen === 'home') )?classes.linkActive:classes.link } onClick={ () => { this.nav(screen) } }>
        <Typography variant={'h4'} className={ `title` }>{ screen }</Typography>
      </div>
    )
  }

  nav = (screen) => {
    this.props.history.push('/'+screen)
  }

  addressClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }
}

export default withRouter(withStyles(styles)(Header));
