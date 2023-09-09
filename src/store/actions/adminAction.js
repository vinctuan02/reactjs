import actionTypes from './actionTypes';

export const fetchGenderStart = () => ({
    type: actionTypes.ADD_USER_START
})

export const fetchGenderSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})
export const fetchGenderFailed = () => ({
    type: actionTypes.ADD_USER_FAILED
})