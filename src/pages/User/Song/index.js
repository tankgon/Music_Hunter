import styles from '../User.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import zingStorage from '~/utils/storage';
import MusicItem from '~/components/MusicItem';
import { useDispatch } from 'react-redux';
import { musicOfPage } from '~/redux/actions';

const cx = classNames.bind(styles);

function UserSong() {
    const [mySongs, setMySongs] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const mySongs = zingStorage.getLibrarySong()?.slice().reverse() || [];
        const userPlaylist = {
            title: 'Nhạc cá nhân',
            songs: mySongs
        }

        if (!!mySongs) {
            setMySongs(mySongs);
            dispatch(musicOfPage(userPlaylist));
        }
    }, []);

    return (
        <div>
            <a href='#' className={cx('nav-btn', 'active')}>
                Yêu thích
            </a>
            <div className={cx('library-song')}>
                <div className={cx('lib-header', 'media')}>
                    <div className={cx('media-left')}>
                        <h4 className={cx('lib-heading')}>Bài hát</h4>
                    </div>
                    <div className={cx('media-content')}>
                        <h4 className={cx('lib-heading')}>Album</h4>
                    </div>
                    <div className={cx('media-right')}>
                        <h4 className={cx('lib-heading')}>Thời gian</h4>
                    </div>
                </div>
                <div className={cx('song-list')}>
                    {mySongs.map((song, index) => {
                        return <MusicItem key={index} song={song} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default UserSong;
