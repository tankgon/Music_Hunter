import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import Loading from '../Loading/Loading';
import MusicItem from '~/components/MusicItem';
import styles from './Top100US.module.scss';
import getHome from '~/api/getHome';
const cx = classNames.bind(styles);

const Top100US = () => {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getHome.getChart()
            setMusic(res.data.data);
        };
        fetchData();

        document.title =
            '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại';
    }, []);

    return (
        <div className={cx('wrapper')}>
            {music.weekChart ? (
                music.weekChart.us.items.map((item, index) => (
                    <LazyLoadComponent key={index}>
                        <MusicItem
                            number={index + 1}
                            ranking
                            song={item}
                        />
                    </LazyLoadComponent>
                ))
            ) : (
                <div>
                    <Loading />
                    <Loading />
                </div>
            )}
        </div>
    );
};

export default Top100US;
