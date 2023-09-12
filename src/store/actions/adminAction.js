import { escape, reject } from 'lodash';
import { getAllUsers, getAllCodeService, createNewUserService, deleteUserService } from '../../services/userService';
import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

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



export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START })
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositonFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchPositionSuccess = (positonData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positonData
})
export const fetchPositonFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})




export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            console.log(e)
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

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_ROLE_START })
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                console.log("Create user success")
                toast.success("Create user successed")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                console.log("Create user failed")
                dispatch(saveUserFailed())
            }
            reject()
        } catch (e) {
            console.log(e)
        }

    }
}


export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCES
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            // dispatch({ type: actionTypes.FETCH_ALL_USER_SUCCESS })
            let res = await getAllUsers('ALL')
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data)
            if (res && res.errCode === 0) {
                toast.success("Delete user success")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                dispatch(deleteUserFailed())
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCES
})


export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})