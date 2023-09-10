import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log("adminReducer, case FETCH_GENDER_START: ", action)
            state.isLoadingGender = true
            return {
                ...initialState,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log("adminReducer, case FETCH_GENDER_SUCCESS: ", action)
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...initialState,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            console.log("adminReducer, case FETCH_GENDER_FAILED: ", action)
            state.isLoadingGender = false
            return {
                ...initialState,
            }

        case actionTypes.FETCH_ROLE_START:
            console.log("adminReducer, case add user start: ", action)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            console.log("adminReducer, ROLE copyState: ", action)
            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            console.log("adminReducer, case add user failed: ", action)

            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;