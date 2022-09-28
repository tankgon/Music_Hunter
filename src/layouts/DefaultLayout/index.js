import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import MusicControl from '~/layouts/components/MusicControl';
import SidebarLeft from '~/layouts/components/SidebarLeft';
import styles from './DefaultLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function DefaultLayout() {

    const currentSong = useSelector(state => state.playMusicReducer.song)

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', {
                "container-full": !currentSong
            })}>
                <SidebarLeft />
                <div className={cx('main-container', 'flex-1')}>
                    <Header />
                    <div className={cx('page')}>
                        <Outlet />
                    </div>
                    {currentSong ? <MusicControl /> : ''}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
