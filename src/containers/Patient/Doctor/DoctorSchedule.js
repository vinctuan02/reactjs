import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import moment from 'moment'
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils/constant';

class DetailDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allDays: []
        }
    }

    componentDidMount() {
        console.log("Moment vie: ", moment(new Date()).format('dddd - DD/MM'))
        console.log("Moment en: ", moment(new Date()).locale('en').format('ddd - DD/MM'))
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            if (this.props.language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM')
            } else {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM')
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object)
        }
        // console.log("Arr date: ", arrDate)
        this.setState({
            allDays: allDays
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            let allDays = []
            for (let i = 0; i < 7; i++) {
                let object = {}
                if (this.props.language === LANGUAGES.VI) {
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
    };

    setArrDays = () => {
        
    }


    render() {
        let { allDays } = this.state
        return (
            <React.Fragment>
                <select>
                    {allDays && allDays.length > 0 &&
                        allDays.map((item, index) => {
                            return (
                                <option value={item.label} key={item.value}>
                                    {item.label}
                                </option>
                            )
                        })

                    }
                </select>
                <div>Doctor shcedule</div>
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
