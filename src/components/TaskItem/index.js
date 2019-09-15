import React, { Component } from 'react'
import { withStyles, CardContent, CardActions } from '@material-ui/core'
import styles from './styles'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
// import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class TaskItem extends Component {
    render() {
        const { task, status, classes } = this.props
        const { title } = task
        return (
            <div>
                <Card key={task.id} className={classes.card}>
                    <CardContent>
                        <Grid container justify="space-between">
                            <Grid item md={8}>
                                <Typography component="h2">
                                    {title}
                                </Typography>
                            </Grid>
                            <Grid item md={4}>
                                {status.label}
                            </Grid>
                        </Grid>
                        <p>{task.description}</p>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        {/* <Button size="small"></Button> */}
                        <Fab color="secondary" aria-label="Edit" className={classes.fab} size="small">
                            <EditIcon />
                        </Fab>
                        <Fab aria-label="delete" className={classes.fab} size="small">
                            <DeleteIcon />
                        </Fab>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(TaskItem)
