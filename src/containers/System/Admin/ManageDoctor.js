import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: "Chocolate" },
    { value: 'strawberry', label: "Strawberry" },
    { value: 'vanilla', label: "Vanilla" },
]


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('this.state: ', this.state)
    }

    handleChange = selectedDoctor => {
        this.setState({ selectedDoctor });
        console.log(`Option selected:`, selectedDoctor);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        // console.log("check state: ", this.state)

        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Manage Doctor</div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
                            />
                        </div>
                        <div className='content-right'>
                            <lable>Thông tin giới thiệu</lable>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}
                            >
                                Nguyen Van  Tuan
                            </textarea>
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                    <button className='save-content-doctor'
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        Lưu thông tin
                    </button>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(action.fetchAllUserStart()),
        deleteUserRedux: (data) => dispatch(action.deleteUser(data)),
        // editUserRedux: (data) => dispatch(action.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
