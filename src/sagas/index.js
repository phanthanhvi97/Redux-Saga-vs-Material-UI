import { call, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects'
import { fetchListTaskFailed, fetchListTaskSuccess, filterTaskSuccess } from '../actions/task'
import { hideLoading, showLoading } from '../actions/ui'
import { getList } from '../apis/task'
import { STATUS_CODE } from '../constants'
import * as taskConstants from '../constants/task'
import * as toast from '../helper/toastHelper'

//delay cung la blocking
function* watchFetchListTaskAction() {
    while (true) {
        yield take(taskConstants.FETCH_TASK)
        //sau dong nay bi blocking cho den khi fetch task xong
        yield put(showLoading())
        const res = yield call(getList)
        // console.log(res)
        //cung block
        const { status, data } = res
        if (status === STATUS_CODE.SUCCESS) {
            //dispatch action fetch list task success
            yield put(fetchListTaskSuccess(data))
            //cung blocking
            toast.toastSuccess()

        } else {
            //dispatch cai failed
            yield put(fetchListTaskFailed(data))
        }
        // yield delay(1000)
        yield put(hideLoading())

    }
}
function* filterTaskSaga({payload}){
    yield delay(500)
    const {keyword} = payload
    const list=yield select(state=>state.task.listTask)
    const filteredTask=list.filter(task=>task.title.trim().toLowerCase().includes(keyword.trim().toLowerCase()))
    // console.log(filteredTask)
    yield put(filterTaskSuccess(filteredTask))
}
function* rootSaga() {
    yield fork(watchFetchListTaskAction)
    yield takeLatest(taskConstants.FILTER_TASK,filterTaskSaga)
}
export default rootSaga