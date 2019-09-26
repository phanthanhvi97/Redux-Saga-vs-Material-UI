import { Box, Button, Grid, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import styles from './styles';
import {compose, bindActionCreators} from 'redux'
import * as modalActions from '../../actions/modal'
import {connect} from 'react-redux'

class TaskForm extends Component {
    render() {
        const { classes, modalActionCreators} = this.props
        const {hideModal} = modalActionCreators
        return (
            <form>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <TextField
                            id="standard-name"
                            label="Tieu de"
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Mo ta"
                            multiline
                            rowsMax="4"
                            className={classes.textField}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={1}>
                            <Button variant="contained" color="primary">Save</Button>
                            <Box mr={1}>
                                <Button variant="contained" color="secondary" onClick={hideModal}>Cancel</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        )
    }
}
const mapDispatchToProps=dispatch=>({
    modalActionCreators:bindActionCreators(modalActions,dispatch)
})
const withConnect=connect(null,mapDispatchToProps)
export default compose(withStyles(styles), withConnect)(TaskForm)