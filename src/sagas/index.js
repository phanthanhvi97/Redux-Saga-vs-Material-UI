import { call, delay, fork, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { hideModal } from '../actions/modal'
import { addTaskFailed, addTaskSuccess, fetchListTask, fetchListTaskFailed, fetchListTaskSuccess } from '../actions/task'
import { hideLoading, showLoading } from '../actions/ui'
import { addTask, getList } from '../apis/task'
import { STATUSES, STATUS_CODE } from '../constants'
import * as taskConstants from '../constants/task'
import * as toast from '../helper/toastHelper'
//delay cung la blocking
function* watchFetchListTaskAction() {
    while (true) {
        const action = yield take(taskConstants.FETCH_TASK)
        //sau dong nay bi blocking cho den khi fetch task xong
        yield put(showLoading())
        //cung block
        const {payload } = action
        const {params} = payload
        const res = yield call(getList,params)
        // console.log(res)
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
function* filterTaskSaga({ payload }) {
    yield delay(500)
    const { keyword } = payload
    yield put(fetchListTask({ q:keyword }))
}
function* addTaskSaga({ payload }) {
    const { title, description } = payload
    yield put(showLoading())
    const resp = yield call(addTask, {
        title,
        description,
        status: STATUSES[0].value
    })
    const { data, status } = resp
    if (status === STATUS_CODE.CREATED) {
        yield put(addTaskSuccess(data))
        yield put(hideModal())
    } else {
        yield put(addTaskFailed(data))
    }
    yield delay(1000)
    yield put(hideLoading())

}
function* rootSaga() {
    yield fork(watchFetchListTaskAction)
    yield takeLatest(taskConstants.FILTER_TASK, filterTaskSaga)
    yield takeEvery(taskConstants.ADD_TASK, addTaskSaga)

}
export default rootSaga