import axios from '../axios'

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const getTopDoctorService = (limit) => {
    // console.log("test limit", limit)
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const saveDetailInforDoctor = (inputData) => {
    return axios.post('/api/save-infor-doctor', inputData)
}

const getDetailInforDoctor = (inputId) => {
    // console.log("inputId: ", inputId)
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    // console.log("save")
    return axios.post('/api/bulk-create-schedule', data)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctors,
    saveDetailInforDoctor,
    getDetailInforDoctor,
    saveBulkScheduleDoctor
}