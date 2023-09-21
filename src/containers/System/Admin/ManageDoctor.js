import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { LANGUAGES } from '../../../utils/constant';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: ''
        }
    }

    componentDidMount() {
        console.log("dit mount")
        this.props.fetchAllDoctorsRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("did update")
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInput(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        console.log('this.state: ', this.state)
        this.props.saveDetailInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor,
            // specialtyId: this.state.specialtyId
        })
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

    buildDataInput = (dataInput) => {
        let result = []
        let { language } = this.props
        dataInput.map((item, index) => {
            let object = {}
            let labelVi = `${item.lastName} ${item.firstName}`
            let labelEn = `${item.firstName} ${item.lastName}`

            object.label = language === LANGUAGES.VI ? labelVi : labelEn
            object.value = item.id
            result.push(object)
        })
        return result
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
                                options={this.state.listDoctors}
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
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(action.fetchAllDoctor()),
        saveDetailInforDoctor: (data) => dispatch(action.saveDetailUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
