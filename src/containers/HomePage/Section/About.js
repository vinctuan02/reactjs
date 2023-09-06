import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { FormattedMessage } from 'react-intl';

// import specialtyImg from '../../../assets/specialty/co-xuong-khop.jpeg'
class About extends Component {

    render() {
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói gì về HoiDanIT
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%" height="400px" src="https://www.youtube.com/embed/DFVuYoDVS_g"
                            title="Dreaming" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Không thể phủ nhận Liveaction One Piece thành công như hiện tại là nhờ vào sự giám sát của Eiichiro Oda - tác giả của manga gốc.
                            Ông đã yêu cầu Netflix quay lại rất nhiều cảnh mà ông cho là không đạt. Bên cạnh đó, Oda còn đưa ra điều kiện, nhà sản xuất,
                            biên kịch không được đưa bất kỳ câu chuyện tình cảm lãng mạn hay mối quan hệ mập mờ nào giữa các thành viên trong băng Mũ Rơm khi lên phim.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
