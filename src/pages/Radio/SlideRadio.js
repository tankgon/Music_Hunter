import classNames from 'classnames/bind';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './Radio.module.scss'
import { useEffect } from 'react';
const cx = classNames.bind(styles)

function SlideRadio({ listRadio }) {
    //custom arrows
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={cx('arrow', 'next', {[className]: className})}
            onClick={onClick}
          >
            <span className={cx('arrown-icon')}><i className="fal fa-angle-right"></i></span>
          </div>
        );
    }
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={cx('arrow', 'prev', {[className]: className})}
            onClick={onClick}
            >
                <span className={cx('arrown-icon')}><i className="fal fa-angle-left"></i></span>
            </div>
        );
    }
    const propsSlide7 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 6,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    }

    function circle(time) {
        const currentDate = new Date().getTime() / 1000
        const percentCircle = (currentDate - time.startTime) / (time.endTime - time.startTime) * 306
        return (306 - percentCircle)
    }



    return ( 
        <div>
            <Slider {...propsSlide7} >
                {listRadio && listRadio.items.map((item) => {
                    return(
                        <div key={item.id} className={cx('card-wrapper')}>
                            <a className={cx('link-radio')} href='#'>
                                <div className={cx('card-radio')}>
                                    <img className={cx('radio-img')} src={item.program.thumbnail} />
                                    <svg className={cx('circle-svg')} viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48.75" stroke="#ff4b4a" fill='none' strokeWidth="3" strokeDasharray="306" strokeDashoffset={circle(item.program)}/>
                                    </svg> 
                                    <div className={cx('host')}>
                                        <img className={cx('host-img')} src={item.host.thumbnail} />
                                    </div>
                                </div>
                                <span className={cx('live')}>LIVE</span>
                            </a>
                            <div className={cx('radio-content')}>
                                <h4 className={cx('title')}>{item.host.name}</h4>
                                <p className={cx('subtitle')}>{item.activeUsers} đang nghe</p>
                            </div>
                        </div>
                    )
                })}
            </Slider >
        </div>
     );
}

export default SlideRadio;