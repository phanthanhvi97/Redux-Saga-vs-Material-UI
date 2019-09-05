import React, { Component } from 'react'
import { withStyles, CardContent, CardActions } from '@material-ui/core'
import styles from './styles'
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

class TaskItem extends Component {
    render() {
        const {task, status, classes}=this.props
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
                    </CardContent>
                    <CardActions>
                        <Button size="small">

                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}
export default withStyles(styles)(TaskItem)
