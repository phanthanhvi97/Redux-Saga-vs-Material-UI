import { Box, Button, Grid, withStyles } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalActions from '../../actions/modal';
import renderTextField from '../../components/FormHelper/TextField';
import styles from './styles';
import validate from './validate';
import * as taskActions from '../../actions/task'
class TaskForm extends Component {
    handleSubmitForm = data => {
        const {taskActionCreators} = this.props
        const {addTask} = taskActionCreators
        const {title, description} = data
        addTask(title, description)
    }
    render() {
        const { classes, modalActionCreators, handleSubmit, invalid, submitting} = this.props
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
                            <Button disabled={invalid||submitting} variant="contained" color="primary" type='submit'>Save</Button>
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
    modalActionCreators: bindActionCreators(modalActions, dispatch),
    taskActionCreators:bindActionCreators(taskActions,dispatch)
})
const FORM_NAME = 'TASK_MANAGEMENT'
const withConnect = connect(null, mapDispatchToProps)
const withReduxForm = reduxForm({
    form: FORM_NAME,
    validate
})
export default compose(withStyles(styles), withConnect, withReduxForm)(TaskForm)