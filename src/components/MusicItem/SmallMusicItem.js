import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '../Icon';
import HeartIcon from '../Icon/Heart';
import PlaySongIcon from '../Icon/Play/PlaySongIcon';
import { playMusic } from '~/redux/actions';
import Image from '../Image';
import styles from './MusicItem.module.scss';
import { addHistorySong } from '../../redux/actions';
const cx = classNames.bind(styles);

function SmallMusicItemUser({ className, song, isPlaying }) {
    const dispatch = useDispatch();
    const [checkSong, setCheckSong] = useState(false)
    const librarySong = useSelector(state => state.songReducer.librarySong)
    const currentSong = useSelector(state => state.playMusicReducer.song);

    useEffect(() => {
        const isInLibrary = librarySong.findIndex(mySong => mySong.encodeId === song.encodeId) !== -1;
        setCheckSong(isInLibrary)
    }, [librarySong])

    const handlePlayMusic = (song) => {
        dispatch(playMusic(song));
        dispatch(addHistorySong(song))
    };

    return (
        <div className={cx('wrapper', 's-wrapper', {
            [className]: className,
            isActive: song.encodeId === currentSong?.encodeId
        })}>
            <div className={cx('media')}>
                <div className={cx('media-left', 'full-left')}>
                    <div
                        className={cx('thumb-wrap')}
                        onClick={() => handlePlayMusic(song)}
                    >
                        <Image
                            className={cx('thumb-img')}
                            src={song.thumbnail}
                            alt={song.title}
                        />
                        <div className={cx('hover-items')}>
                            <PlaySongIcon
                                data={song}
                                className={cx('thumb-img_playbutton')}
                            />
                        </div>
                    </div>
                    <div className={cx('song-infor')}>
                        <h3 className={cx('song-name', 'text-sm')}>
                            {song.title}
                        </h3>
                        <h5 className={cx('singer-name', 'text-xs')}>
                            {song.artistsNames}
                        </h5>
                    </div>
                </div>
                <div className={cx('media-right')}>
                    <div className={cx('hover-items')}>
                        <div className='flex items-center content-between'>
                            <div className={cx('item')}>
                                <HeartIcon activeNoColor={isPlaying} data={song} />
                            </div>
                            <div className={cx('item')}>
                                <Icon
                                    icon={<i className='far fa-ellipsis-h'></i>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SmallMusicItemUser;