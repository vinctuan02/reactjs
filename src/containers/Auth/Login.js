import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleOnChangeInputUserName = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value)
    }

    handleOnChangeInputPassWord = (event) => {
        this.setState({
            password: event.target.value
        })
        console.log(event.target.value)
    }

    handleLogin = () => {
        alert("hihi")
    }

    render() {
        return (
            <>
                <div className='login-background'>
                    <div className='login-container'>
                        <div className='login-content row'>
                            <div className='col-12 text-login'>Login</div>
                            <div className='col-12 form-group login-input'>
                                <label>User name</label>
                                <input
                                    type='text' className='form-control' placeholder='Enter you User Name'
                                    value={this.state.username}
                                    onChange={(event) => this.handleOnChangeInputUserName(event)}
                                />
                            </div>
                            <div className='col-12 form-group login-input'>
                                <label>Password</label>
                                <input type='password' className='form-control' placeholder='Enter your Password' 
                                onChange={(event) => this.handleOnChangeInputPassWord(event)}
                                />
                            </div>
                            <div className='col-12' >
                                <button className='btn-login' onClick={()=> this.handleLogin()}>Login</button>
                            </div>
                            <div className='col-12'>
                                <span className='forgot-password'>Forgot your password</span>
                            </div>
                            <div className='col-12 text-center'>
                                <span className='text-other-login'>Or login with</span>
                            </div>
                            <div className='col-12 social-login'>
                                <i className="fab fa-google-plus-g"></i>
                                <i className="fab fa-facebook-f"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
