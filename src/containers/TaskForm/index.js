import { Box, Button, Grid, withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import React, { Component } from 'react';
import styles from './styles';
import { compose, bindActionCreators } from 'redux'
import * as modalActions from '../../actions/modal'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import renderTextField from '../../components/FormHelper/TextField'
class TaskForm extends Component {
    handleSubmitForm = data => {
        console.log(data)
    }
    render() {
        const { classes, modalActionCreators, handleSubmit } = this.props
        const { hideModal } = modalActionCreators
        return (
            <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <Field
                            id="title"
                            label="Tieu de"
                            className={classes.textField}
                            margin="normal"
                            name="title"
                            component={renderTextField}
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Field
                            id="description"
                            label="Mo ta"
                            multiline
                            rowsmax="4"
                            className={classes.textField}
                            margin="normal"
                            component={renderTextField}
                            name="description"
                        />
                    </Grid>
                    <Grid item md={12}>
                        <Box display="flex" flexDirection="row-reverse" mt={1}>
                            <Button variant="contained" color="primary" type='submit'>Save</Button>
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
const mapDispatchToProps = dispatch => ({
    modalActionCreators: bindActionCreators(modalActions, dispatch)
})
const FORM_NAME = 'TASK_MANAGEMENT'
const withConnect = connect(null, mapDispatchToProps)
const withReduxForm = reduxForm({
    form: FORM_NAME
})
export default compose(withStyles(styles), withConnect, withReduxForm)(TaskForm)