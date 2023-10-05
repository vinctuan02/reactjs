import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }

    componentDidMount() {
        this.setArrDays(this.props.language)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setArrDays(this.props.language)
        }
    };

    setArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        // console.log("Arr date: ", arrDate)
        this.setState({
            allDays: allDays
        })
    }

    handleOnChangeSelect = async (event) => {
        console.log("event.target: ", event.target.value)
        if (this.props.doctorId && this.props.doctorId !== -1) {
            let doctorId = this.props.doctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log("check res get schedule: ", res)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }

    }
    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        return (
            <React.Fragment>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })

                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'><span>Lịch khám</span></i>
                        </div>
                        <div className='time-content'>
                            {
                                allAvailableTime && allAvailableTime.length > 0 ?
                                    allAvailableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGES.VI ?
                                            item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                        return (
                                            <button key={index}>{timeDisplay}</button>
                                        )
                                    })
                                    :
                                    <div>Không có lịch hẹn trong khoảng thời gian này, vui lòng chọn thời gian khác!</div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
