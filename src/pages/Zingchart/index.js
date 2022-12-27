import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import getHome from '~/api/getHome';
import { Link } from 'react-router-dom';
import { Chart } from './chart';
import Loading from './Loading/Loading';
import MusicItem from '~/components/MusicItem';
import TopMusic from './TopMusic/TopMusic';
import styles from './Zingchart.module.scss';
import { useDispatch } from 'react-redux';
import { musicOfPage } from '~/redux/actions';

const cx = classNames.bind(styles);

function Zingchart() {
    const [music, setMusic] = useState([]);
    const [chartInfo, setChartInfo] = useState();
    const [visible, setVisible] = useState(10);
    const [offBtn, setOffBtn] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const res = await getHome.getChart()
            setMusic(res.data.data);
            const playlist = { songs: music.RTChart.items }
            dispatch(musicOfPage(playlist));
            setChartInfo(music.RTChart.chart);
        };
        fetchData();
        document.title = '#zingchart | Xem bài hát, album, MV đang hot nhất hiện tại';
    }, []);
    const handleShowMoreItems = () => {
        setVisible((prev) => prev + 90);
        setOffBtn(true);
    };
    return (
        <div>
            <div className={cx('wrapper-chart')}>
                <div className={cx('blur')}></div>
                <h1>#zingchart </h1>
                <div className={cx('chart')}>
                    {chartInfo && <Chart chart={chartInfo} />}
                </div>
            </div>
            <div className={cx('list-music')}>
                {music.RTChart ? (
                    music.RTChart.items.slice(0, visible).map((item, index) => (
                        <LazyLoadComponent key={index}>
                            <MusicItem song={item} ranking number={index + 1} />
                        </LazyLoadComponent>
                    ))
                ) : (
                    <div>
                        <Loading />
                    </div>
                )}
                {!offBtn && (
                    <div className={cx('btn-box')}>
                        <button
                            onClick={handleShowMoreItems}
                            className={cx('btn')}
                        >
                            Xem top 100
                        </button>
                    </div>
                )}
            </div>
            {music.weekChart?.vn || music.weekChart?.us || music.weekChart?.korea ? (
                <div className={cx('top-100')}>
                    <div className={cx('blur')}></div>
                    <div className={cx('alpha')}></div>
                    <div className={cx('title')}>
                        <Link to='/zing-chart'>Bảng Xếp Hạng Tuần</Link>
                    </div>
                    <div className={cx('top-board')}>
                        {/* thay đổi link to đúng URL */}
                        <TopMusic
                            to='/zing-chart-tuan/Bai-hat-Viet-Nam'
                            country='Việt Nam'
                            data={music.weekChart?.vn}
                        />
                        <TopMusic
                            to='/zing-chart-tuan/bai-hat-US-UK'
                            country='US-UK'
                            data={music.weekChart?.us}
                        />
                        <TopMusic
                            to='/zing-chart-tuan/bai-hat-Kpop'
                            country='K-Pop'
                            data={music.weekChart?.korea}
                        />
                    </div>
                </div>
            ) : (
                <div className={cx('loading-img')}></div>
            )}
        </div>
    );
}

export default Zingchart;
