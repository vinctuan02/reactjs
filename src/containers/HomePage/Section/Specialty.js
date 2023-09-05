import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'

import { FormattedMessage } from 'react-intl';

import Slider from "react-slick"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'

class Specialty extends Component {

    render() {

        let settings = {
            dots: false,
            ifninite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        }

        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='button-section'>Xem thêm</button>
                    </div>

                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-image'>
                                </div>
                                <div>Cơ xương khớp 1</div>
                            </div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
