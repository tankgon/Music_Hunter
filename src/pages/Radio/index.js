import classNames from 'classnames/bind';
import SlideRadio from './SlideRadio';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Radio.module.scss'
import Loading from './Loading/Loading';
import getHome from '../../api/getHome';
const cx = classNames.bind(styles)

function Radio() {
    const [listRadio, setListRadio] = useState()
    useEffect(() => {
        const homePage3 = async () => {
            try {
                const res = await getHome.homePage3();
                setListRadio(res.data.data.items[0]);   
            } catch (error) {
                console.log(error);
            }
        };
        homePage3()

        document.title = 'Radio | Xem bài hát, album, MV đang hot nhất hiện tại';
    }, [])

    const renderLoading = () => {
        if(listRadio){
            return(
                <div className={cx('wrapper')}>
                    <div className={cx('section')}>
                        <div className={cx('list-slide')}>
                            <SlideRadio listRadio={listRadio}/>
                        </div>
                    </div>
                </div>
            )
        }else return <><Loading/></>
    } 
     
    return <>{renderLoading()}</>
}

export default Radio;