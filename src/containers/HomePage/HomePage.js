import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            ifninite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2
        }

        return (
            <div>
                <HomeHeader />
                <Specialty settings = {settings}/>
                <MedicalFacility settings = {settings}/>
                <div style={{ height: "300px" }}>hi</div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
