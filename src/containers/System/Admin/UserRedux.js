import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as action from '../../../store/actions'
import './UserRedux.scss'

class UserRedux extends Component {


    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        this.props.getGenderStar()
        // try {
        //     let res = await getAllCodeService('gender')
        //     let resPosition = await getAllCodeService('position')
        //     let resRole = await getAllCodeService('role')

        //     if (res && res.data && resPosition && resPosition.data && resRole && resRole.data) {
        //         this.setState({
        //             genderArr: res.data,
        //             positionArr: resPosition.data,
        //             roleArr: resRole.data
        //         })
        //     }

        // } catch (e) {
        //     console.log(e)
        // }
    }


    render() {
        console.log('check state userredux: ', this.state)
        let language = this.props.language
        let genders = this.state.genderArr
        let positions = this.state.positionArr
        let roles = this.state.roleArr
        return (
            <div className='user-redux-container'>
                <div className='title'>User redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 header-redux' ><FormattedMessage id="manage-user.user" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className='form-control'>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className='form-control'>
                                    {
                                        positions && positions.length > 0 &&
                                        positions.map((index, item) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? index.valueVi : index.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className='form-control'>
                                    {
                                        positions && positions.length > 0 &&
                                        roles.map((index, item) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI ? index.valueVi : index.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='col-12 button'>
                                <button className='btn btn-primary'><FormattedMessage id="manage-user.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStar: () => dispatch(action.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
