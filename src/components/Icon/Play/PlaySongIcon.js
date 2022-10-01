import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './PlaySongIcon.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addValueIsPlay, addHistorySong } from '../../../redux/actions';
const cx = classNames.bind(styles)

function PlaySongIcon({className, data = {encodeId: null}}) {
    const dispatch = useDispatch();
    const isPlay = useSelector((state) => state.IconProject.isPlay['1']) || false
    const song = useSelector((state) => state.playMusicReducer.song);
    const classIcon = ['fas fa-play', 'fas fa-waveform']

    const handleClick = () => {
        dispatch(addValueIsPlay(true));
    };
    return (
        <>
            {data?.encodeId === song?.encodeId && isPlay === true ? (
                <button className={cx('wrapper', className)} onClick={() => dispatch(addValueIsPlay(false))}>
                    <span className={cx('icon')}>
                        <i className={cx(classIcon[1])}></i>
                    </span>
                </button>
            ) : null}

            {data?.encodeId === song?.encodeId && isPlay === false ? (
                <button className={cx('wrapper', className)} onClick={() => dispatch(addValueIsPlay(true))}>
                    <span className={cx('icon')}>
                        <i className={cx(classIcon[0])}></i>
                    </span>
                </button>
            ): null}

            {data?.encodeId !== song?.encodeId ? (
                <button className={cx('wrapper', className)} onClick={handleClick}>
                    <span className={cx('icon')}>
                        <i className={cx(classIcon[0])}></i>
                    </span>
                </button>
            ): null}
        </>
    );
}
export default PlaySongIcon;