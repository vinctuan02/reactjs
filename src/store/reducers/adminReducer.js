import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER_START:
            console.log("adminReducer, case add user start: ", action)
            return {
                ...state,
            }

        case actionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
            }

        case actionTypes.ADD_USER_FAILED:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;