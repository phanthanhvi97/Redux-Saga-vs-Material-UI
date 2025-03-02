import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from "@material-ui/icons/Add"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as taskActions from '../../actions/task'
import TaskForm from '../TaskForm'
import TaskList from '../../components/TaskList'
import { STATUSES } from '../../constants'
import styles from './styles'
import SearchBox from '../../components/SearchBox'
import * as modalActions from '../../actions/modal'

class TaskBoard extends Component {
    componentDidMount() {
        const { taskActionCreators } = this.props
        // const { fetchListTaskRequest } = taskActionCreators
        const { fetchListTask } = taskActionCreators
        // fetchListTaskRequest()
        fetchListTask()

    }
    openForm = () => {
        const {modalActionCreators}=this.props
        const {showModal, changeModalTitle,changeModalContent}= modalActionCreators
        showModal()
        changeModalTitle('Them moi cong viec')
        changeModalContent(<TaskForm/>)
    }
    renderBoard() {
        const { listTask } = this.props
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
    handleFilter=(e)=>{
        const {value} = e.target
        const { taskActionCreators } = this.props
        const { filterTask } = taskActionCreators
        filterTask(value)
    }
    renderSearchBox(){
        let xhtml=null
        xhtml=(
            <SearchBox handleChange={this.handleFilter}/>
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
                {this.renderSearchBox()}
                {this.renderBoard()}
                {/* {this.renderForm()} */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listTask: state.task.listTask
    }
}
const mapDispatchToProps = dispatch => {
    return {
        taskActionCreators: bindActionCreators(taskActions, dispatch),
        modalActionCreators: bindActionCreators(modalActions,dispatch)
    }
}
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(TaskBoard))