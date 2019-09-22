import {combineReducers} from 'redux'
import taskReducer from './task'
import uiReducer from './ui'
const rootReducers = combineReducers({
    task:taskReducer,
    ui:uiReducer
})
export default rootReducers