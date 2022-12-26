import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Loading from '../Zingchart/Loading/Loading';
import MusicItem from '~/components/MusicItem';
import styles from './NhacMoi.module.scss';
import { useDispatch } from 'react-redux';
import { musicOfPage } from '~/redux/actions';

const cx = classNames.bind(styles);

function Nhacmoi() {
    const [music, setMusic] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios
                .get(`https://apizingmp3.vercel.app/api/newreleasechart`)
                .then((res) => res.data.data);
            const playlist = {
                title: data.title,
                songs: data.items
            }
            dispatch(musicOfPage(playlist));
            setMusic(data);
        };
        fetchData();
        document.title = '#zingchart tuần, #zingchart Zing - Bài hát';
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('blur')}></div>
            <div className={cx('alpha')}></div>
            <div className={cx('alpha1')}></div>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h1>Nhạc Mới</h1>
                    <span>
                        <i className='fas fa-play'></i>
                    </span>
                </div>
                <div>
                    {music.items ? (
                        music.items.map((item, index) => (
                            <LazyLoadComponent key={index}>
                                <MusicItem
                                    song={item}
                                    index={index}
                                    ranking
                                    number={index + 1}
                                />
                            </LazyLoadComponent>
                        ))
                    ) : (
                        <div>
                            <Loading />
                        </div>
                    )}
                </div>
                <div className={cx('space')}></div>
            </div>
        </div>
    );
}

export default Nhacmoi;
