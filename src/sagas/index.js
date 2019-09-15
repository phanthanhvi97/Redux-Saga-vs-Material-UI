import { fork, take, call, put } from 'redux-saga/effects'
import * as taskTypes from '../constants/task'
import { getList } from '../apis/task'
import { STATUS_CODE } from '../constants'
import { fetchListTaskSuccess, fetchListTaskFailed } from '../actions/task'
function* watchFetchListTaskAction() {
    while (true) {
        yield take(taskTypes.FETCH_TASK)
        //sau dong nay bi blocking cho den khi fetch task xong
        const res = yield call(getList)
        //cung block
        const { status, data } = res
        if (status === STATUS_CODE.SUCCESS) {
            //dispatch action fetch list task success
            yield put(fetchListTaskSuccess(data))
        } else {
            //dispatch cai failed
            yield put(fetchListTaskFailed(data))
        }
    }
}
function* watchCreateTaskAction() {
    console.log('create')
}
function* rootSaga() {
    yield fork(watchFetchListTaskAction)
    yield fork(watchCreateTaskAction)
}
export default rootSaga