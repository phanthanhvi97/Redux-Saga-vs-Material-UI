import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import styles from './styles'
import Button from '@material-ui/core/Button'
import AddIcon from "@material-ui/icons/Add"
import Grid from '@material-ui/core/Grid';
import { STATUSES } from '../../constants'
import TaskList from '../../components/TaskList'
import TaskForm from '../../components/TaskForm'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as taskActions from '../../actions/task'

const listTask = [
    {
        id: 1,
        title: "Read book",
        description: "Read material book",
        status: 0
    },
    {
        id: 2,
        title: "Read",
        description: "Read",
        status: 2
    },
    {
        id: 3,
        title: "book",
        description: "book",
        status: 1
    }
]
class TaskBoard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: false
        }
    }
    componentDidMount(){
        const {taskActionCreators}=this.props
        const {fetchListTaskRequest} = taskActionCreators
        fetchListTaskRequest()
    }
    handleClose=()=>{
        this.setState({
            open:false
        })
    }
    openForm=()=>{
        this.setState({
            open:true
        })
    }
    renderBoard() {
        // const { classes } = this.props
        let xhtml = null
        xhtml = (
            <Grid container spacing={2}>
                {
                    STATUSES.map((status) => {
                        const taskFiltered = listTask.filter(task => task.status === status.value)
                        return <TaskList tasks={taskFiltered} status={status} key={status.value} />
                    })
                }
            </Grid>
        )
        return xhtml
    }
    renderForm() {
        const { open } = this.state
        let xhtml = null
        xhtml = (
            <TaskForm open={open} onClose={this.handleClose}/>
        )
        return xhtml
    }
    render() {
        const { classes } = this.props
        return (
            <div className={classes.taskBoard}>
                <Button variant="contained" color="primary" className="classes.button" onClick={this.openForm}>
                    <AddIcon />Thêm mới công việc
                </Button>
                {this.renderBoard()}
                {this.renderForm()}
            </div>
        )
    }
}

const mapStateToProps=null
const mapDispatchToProps=dispatch=>{
    return{
        taskActionCreators:bindActionCreators(taskActions,dispatch)
    }
}
export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(TaskBoard))