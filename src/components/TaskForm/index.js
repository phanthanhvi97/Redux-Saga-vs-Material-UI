import React, { Component } from 'react'
import { withStyles, Modal, Grid, Button, Box } from '@material-ui/core'
import styles from './styles'
import TextField from '@material-ui/core/TextField';

class TaskForm extends Component {
    render() {
        const { open, classes, onClose } = this.props
        return (
            <Modal open={open} onClose={onClose}>
                <div className={classes.modal}>
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
                                        <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
        )
    }
}
export default withStyles(styles)(TaskForm)