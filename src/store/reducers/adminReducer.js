import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // console.log("adminReducer, case FETCH_GENDER_START: ", action)
            state.isLoadingGender = true
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            // console.log("adminReducer, case FETCH_GENDER_SUCCESS: ", action)
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            // console.log("adminReducer, case FETCH_GENDER_FAILED: ", action)
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            // console.log("adminReducer, case FETCH_ROLE_START: ", action)
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            // console.log("adminReducer, FETCH_ROLE_SUCCESS: ", action)
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)

            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_START:
            // console.log("adminReducer, case FETCH_ROLE_START: ", action)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            // console.log("adminReducer, FETCH_ROLE_SUCCESS: ", action)
            state.roles = action.data
            // console.log("state fetch role success", state)
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)

            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.users = action.users
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USER_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            // console.log("adminReducer, case FETCH_ROLE_FAILED: ", action)
            // console.log("actiontypes action: ", action)
            state.topDoctors = []
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default adminReducer;