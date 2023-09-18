import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions'
import { LANGUAGES } from '../../../utils/constant';

// import { FormattedMessage } from 'react-intl';

import Slider from "react-slick"



// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'

class OutStandingDoctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }

    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctor: this.props.topDoctorsRedux
            })
        }


    }

    componentDidMount() {
        this.props.loadTopDoctor()
    }

    render() {
        let arrDoctor = this.state.arrDoctor
        let language = this.props
        console.log("test language: ", language)
        console.log(LANGUAGES.VI, LANGUAGES.EN)
        arrDoctor = arrDoctor.concat(arrDoctor).concat(arrDoctor)
        console.log('arrDoctor: ', arrDoctor)
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật</span>
                        <button className='button-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {
                                arrDoctor.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`
                                    return (
                                        <div className='section-customize' key={index}>
                                            <div className='customize-boder'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-outstanding-doctor'
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    >
                                                    </div>
                                                </div>
                                                <div className='position text-center'>
                                                    <div>
                                                        {
                                                            language !== LANGUAGES.VI ? nameVi : nameEn
                                                        }
                                                    </div>
                                                    {/* <div>Cơ xương khớp 2</div> */}
                                                    {/* <div>{nameVi}</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
        changeLanguage: () => dispatch(action.changeLanguageApp())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
