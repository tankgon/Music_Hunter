import { useEffect, useMemo } from 'react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './PlaySongIcon.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addValueIsPlay, setCurrentPlaylist } from '../../../redux/actions';
import Icon from '..';
import playlistReducer from '~/redux/reducers/playlist';
const cx = classNames.bind(styles)

function PlaySongIcon({className, data = {encodeId: null}}) {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.IconProject.isPlay)
    const song = useSelector((state) => state.playMusicReducer.song);
    const musicsOfPage = useSelector(state => state.musicsOfPageReducer)
    const currentPlaylist = useSelector(state => state.playlistReducer.currentPlaylist)

    const togglePlay = () => {
        if(isPlay) {
            dispatch(addValueIsPlay(false));
        } else {
            dispatch(addValueIsPlay(true));
        }
    };

    const hanldePlayNewMusic = () => {
        if(currentPlaylist.songs === musicsOfPage) {
            dispatch(addValueIsPlay(true));
        } else {
            dispatch(setCurrentPlaylist(musicsOfPage))
            dispatch(addValueIsPlay(true));
        }
    }
    return (
        <>
            {data?.encodeId === song?.encodeId && (
                <button className={cx('wrapper', className)}>
                    <Icon
                        activeNoColor
                        s18
                        isActive={isPlay}
                        className={cx('icon')}
                        icon={<i className='fas fa-play'></i>}
                        activeIcon={<i className='fas fa-waveform'></i>}
                        onClick={togglePlay}
                    />
                </button>
            ) }

            {data?.encodeId !== song?.encodeId && (
                <button className={cx('wrapper', className)} >
                    <Icon
                        s18
                        isActive={false}
                        className={cx('icon')}
                        icon={<i className='fas fa-play'></i>}
                        activeIcon={<i className='fas fa-waveform'></i>}
                        onClick={hanldePlayNewMusic}
                    />
                </button>
            )}
        </>
    );
}
export default PlaySongIcon;