import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant';
import * as action from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';


class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgULR: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            action: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
        // console.log("componentDid mout() this.state: ", this.state)
        // console.log("componentDid mout() this.props: ", this.props)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("did update")
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.positionsRedux !== this.props.positionsRedux) {
            let arrPositions = this.props.positionsRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
            // console.log("this.state: ", this.state)
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            // console.log('this.state: ', this.state)
            // console.log("this.props: ", this.props)

            let arrPositions = this.props.positionsRedux
            let arrRole = this.props.roleRedux
            let arrGenders = this.props.genderRedux

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                avatar: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '1',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : '1',
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '1',
                action: CRUD_ACTION.CREATE
            })
        }

    }

    handleOnchangeImage = (event) => {
        console.log(event)
        let data = event.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgULR: objectUrl,
                avatar: file
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgULR)
            return
        this.setState({ isOpen: true })
    }

    onChangeInput = (event, id) => {
        console.log(event.target.value)
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })

        // this.props.fetchUserRedux()
    }

    checkValidateInput = () => {
        let isValidate = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValidate = false
                alert("missing parameter: " + arrCheck[i])
                break
            }
        }
        return isValidate
    }

    handleEditUserFromParent = (user) => {
        console.log("check handle edituser from parent", user)
        this.setState({
            email: user.email,
            password: 'hashcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTION.EDIT
        })


    }

    render() {
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state
        let language = this.props.language
        let genders = this.props.genderRedux
        let positions = this.props.positionsRedux
        let roles = this.props.roleRedux
        console.log("this.state: ", this.state)

        // console.log("state render ", this.state)
        return (
            <div className='user-redux-container'>
                <div className='title'>User redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 header-redux' ><FormattedMessage id="manage-user.user" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => this.onChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => this.onChangeInput(event, 'password')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => this.onChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => this.onChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => this.onChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'gender')}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'position')}
                                >
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className='form-control'
                                    onChange={(event) => this.onChangeInput(event, 'role')}
                                >
                                    {
                                        roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.key}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchangeImage(event)}
                                    />
                                    <label className='lable-update' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url("${this.state.previewImgULR}")` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 button'>
                                <button
                                    className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id= {this.state.action === CRUD_ACTION.EDIT ? "manage-user.edit" : "manage-user.save"} />
                                </button>
                            </div>
                            <div className='col-12'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgULR}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}


// async componentDidMount() {
//     console.log("componentdidmout")
//     this.props.getGenderStart()
//     this.props.getRoleStart()
//     this.props.getPositionStart()
// }


const mapStateToProps = state => {
    // console.log("adminAction, state of redux: ", state)
    // console.log("Mapstatetoprops")

    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGenderRedux: state.admin.isLoadingGender,
        positionsRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    // console.log("MapdispatchToProps")
    return {
        getGenderStart: () => dispatch(action.fetchGenderStart()),
        getRoleStart: () => dispatch(action.fetchRoleStart()),
        getPositionStart: () => dispatch(action.fetchPositionStart()),
        createNewUser: (data) => dispatch(action.createNewUser(data)),
        // fetchUserRedux: () => dispatch(action.fetchAllUserStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
