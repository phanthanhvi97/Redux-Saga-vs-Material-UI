import React, { Component } from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/styles'
import LoadingIcon from '../../assets/loading.gif'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import * as uiAction from '../../actions/ui'

class GlobalLoading extends Component {
    render() {
        const { classes, showLoading } = this.props
        let xhtml = null
        if (showLoading.showLoading) {
            xhtml = (
                <div className={classes.globalLoading}>
                    <img src={LoadingIcon} alt='' className={classes.icon} />
                </div>
            )
        }
        return xhtml
    }
}

const mapStateToProps = state => {
    return {
        showLoading: state.ui
    }
}
const withConnect = connect(mapStateToProps, null)
// export default withStyles(styles)(withConnect)(GlobalLoading)
export default compose(
    withStyles(styles),
    withConnect
)(GlobalLoading)