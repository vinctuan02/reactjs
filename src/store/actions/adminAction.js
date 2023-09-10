import { escape } from 'lodash';
import { getAllCodeService } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchGenderStart = () => ({
//     type: actionTypes.ADD_USER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}


export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})


export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        let res = await getAllCodeService('role')
        // console.log("admin action, getallcode role", res)
        if (res && res.errCode === 0) {
            dispatch(fetchRoleSuccess(res.data))
        } else {
            dispatch(fetchRoleFailed())
        }
    }
}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})