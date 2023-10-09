import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss'
import * as action from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select'
import { CRUD_ACTION, LANGUAGES } from '../../../utils/constant';
import { getDetailInforDoctor } from '../../../services/userService';


const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            listDoctors: '',
            hasOldData: false,

            //save to doctor-infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    componentDidMount() {
        // console.log("dit mount")
        this.props.fetchAllDoctorsRedux()
        this.props.getRequiredDoctorInfor()
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("did update")
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInput(this.props.allDoctors, 'USERS')
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

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            // console.log('this.props.allRequiredDoctorInfor didUpdate: ', this.props.allRequiredDoctorInfor)
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor
            // let dataSelectPrice = this.buildDataInput(this.props.allRequiredDoctorInfor)
            let dataPaymentSelect = this.buildDataInput(resPayment)
            let dataPriceSelect = this.buildDataInput(resPrice)
            let dataProvinceSelect = this.buildDataInput(resProvince)

            this.setState({
                listPrice: dataPriceSelect,
                listPayment: dataPaymentSelect,
                listProvince: dataProvinceSelect
            })
            console.log("hi: ", dataPaymentSelect, dataPriceSelect, dataProvinceSelect)
        }
    }

    buildDataInput = (dataInput, type) => {
        let result = []
        let { language } = this.props
        dataInput.map((item, index) => {
            let object = {}
            let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi
            let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn

            object.label = language === LANGUAGES.VI ? labelVi : labelEn
            object.value = item.id
            result.push(object)
            // return 0
        })
        return result
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleSaveContentMarkdown = () => {
        // console.log('this.state: ', this.state)
        let { hasOldData } = this.state
        this.props.saveDetailInforDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            // specialtyId: this.state.specialtyId
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE
        })

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            // listDoctors: '',
            hasOldData: false
        })
    }

    handleChangeSelect = async (selectedDoctor) => {
        // console.log("hihihi")
        this.setState({ selectedDoctor });
        let res = await getDetailInforDoctor(selectedDoctor.value)
        // console.log("test res: ", res)
        if (res && res.errCode === 0 && res.data && res.data.Markdown &&
            res.data.Markdown.contentHTML && res.data.Markdown.contentMarkdown &&
            res.data.Markdown.description) {

            let markdown = res.data.Markdown
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        }
        // console.log(`Option selected:`, selectedDoctor);
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state
        return (
            <React.Fragment>
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>Manage Doctor</div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label>Chọn bác sĩ </label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='content-right'>
                            <lable>Thông tin giới thiệu</lable>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleOnChangeDesc(event)}
                                value={this.state.description}>
                            </textarea>
                        </div>
                    </div>
                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label>Chọn giá</label>
                            <Select
                                value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Chọn tỉnh thành</label>
                            <Select
                                value={this.state.selectedDoctor}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên phòng khám</label>
                            <input className='form-control'></input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám</label>
                            <input className='form-control'></input>
                        </div>
                        <div className='col-4 form-group'>
                            <label>Note</label>
                            <input className='form-control'></input>
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />

                    <button
                        className={hasOldData ? 'save-content-doctor' : 'create-content-doctor'}
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        {
                            hasOldData ? <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                        }
                    </button>
                    {/* <button className='save-content-doctor'
                        onClick={() => this.test()}
                    >
                        Test
                    </button> */}
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(action.fetchAllDoctor()),
        getRequiredDoctorInfor: () => dispatch(action.getRequiredDoctorInfor()),
        saveDetailInforDoctor: (data) => dispatch(action.saveDetailUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
