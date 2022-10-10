import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '~/components/Icon';
import { setLoop, setRandom, playMusic, addValueIsPlay, addHistorySong } from '../../../redux/actions';
import zingStorage from '~/utils/storage';
import styles from './PlayerBar.module.scss';
const cx = classNames.bind(styles);

function PlayerBar({ playSong, musicRef }) {
    const dispatch = useDispatch();
    const isRandom = useSelector((state) => state.IconProject.isRandom)
    const isPlay = useSelector((state) => state.IconProject.isPlay)
    const isLoop = useSelector((state) => state.IconProject.isLoop)
    
    const currentSong = useSelector((state) => state.playMusicReducer.song);
    const valueVolume = useSelector((state) => state.IconProject.valueVolume.volume)
    const listSong = useSelector((state) => state.musicsOfPageReducer);
    const [currentTimePercent, setCurrentTimePercent] = useState(0);
    const [LoadingNumber, setloadingNumber] = useState();
    
    const currentIndex = listSong.findIndex(playlist => playlist?.encodeId === currentSong?.encodeId)

    if (currentTimePercent) {
        if (isPlay) musicRef.current.play();
        else musicRef.current.pause();
    }

    const togglePlay = () => {
        if(isPlay) {
            dispatch(addValueIsPlay(false));
            musicRef.current.pause();
        } else {
            dispatch(addValueIsPlay(true));
            musicRef.current.play();
        }
    }

    const toggleRandom = () => {
        if (isRandom) {
            dispatch(setRandom(false));
        } else {
            dispatch(setRandom(true));
        }
    };

    const toggleLoop = () => {
        if (isLoop) {
            dispatch(setLoop(false));
        } else {
            dispatch(setLoop(true));
        }
    };

    const playRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * (listSong.length))
        dispatch(playMusic(listSong[randomIndex]));
    }

    const nextSong = () => {
        if(currentIndex < listSong.length - 1) {
            dispatch(playMusic(listSong[currentIndex + 1]));
        } else {
            dispatch(playMusic(listSong[0]));
        }
    }

    const prevSong = () => {
        if(currentIndex === 0) {
            dispatch(playMusic(listSong[listSong.length - 1]));
        } else {
            dispatch(playMusic(listSong[currentIndex - 1]));
        }
    }

    const handleNextSong = () => {
        if(isRandom){
            playRandomSong()
        } else {
            nextSong()
        }
        dispatch(addValueIsPlay(true))
    };

    const handlePrevSong = () => {
        if(isRandom){
            playRandomSong()
        } else {
            prevSong()
        }
        dispatch(addValueIsPlay(true))
    }

    //kết thúc audio sẽ làm gì ...
    const handleOnEnd = () => {
        if (!isLoop) {
            handleNextSong()
        }
    }


    const onTimeUpdate = () => {
        const duration = musicRef.current.duration;
        const ct = musicRef.current.currentTime;
        setCurrentTimePercent((ct / duration) * 100);
        setloadingNumber(parseInt(ct));
        musicRef.current.volume = valueVolume/100;
    };

    const onChangeValue = (e) => {
            musicRef.current.currentTime = (e.target.value * Math.ceil(musicRef.current.duration)/100);      
    };

    return (
        <div className={cx('wrapper', 'grow')}>
            <div className={cx('control-btns', 'flex justify-center grow')}>
                <Icon
                    s18
                    isActive={isRandom}
                    className={cx('icon')}
                    icon={<i className='fal fa-random'></i>}
                    activeIcon={<i className='fal fa-random'></i>}
                    onClick={toggleRandom}
                />

                <Icon
                    s18
                    className={cx('icon')}
                    icon={<i className='fal fa-step-backward'></i>}
                    onClick ={handlePrevSong}
                />

                <Icon
                    s14
                    activeNoColor
                    isActive={isPlay}
                    className={cx('icon', 'icon-play')}
                    icon={<i className='fas fa-play'></i>}
                    activeIcon={<i className='fas fa-pause'></i>}
                    onClick={() => togglePlay()}
                />

                <Icon
                    s18
                    className={cx('icon')}
                    icon={<i className='fal fa-step-forward'></i>}
                    onClick ={handleNextSong}
                />

                <Icon
                    s18
                    isActive={isLoop}
                    className={cx('icon')}
                    icon={<i className='fal fa-repeat'></i>}
                    activeIcon={<i className='fal fa-repeat'></i>}
                    onClick={toggleLoop}
                />
            </div>
            <div
                className={cx(
                    'control-time',
                    'flex grow justify-center items-center'
                )}
            >
                {!LoadingNumber ? (
                    <div className={cx('current-time')}>00:00</div>
                ) : (
                    <div className={cx('current-time')}>
                        {Math.floor(`${LoadingNumber}` / 60) < 10
                            ? '0' + Math.floor(`${LoadingNumber}` / 60)
                            : Math.floor(`${LoadingNumber}` / 60)}
                        :
                        {`${LoadingNumber}` % 60 < 10
                            ? '0' + (`${LoadingNumber}` % 60)
                            : `${LoadingNumber}` % 60}
                    </div>
                )}

                {playSong && (
                    <audio
                        src={playSong['128']}
                        type='audio'
                        autoPlay={isPlay}
                        ref={musicRef}
                        loop={isLoop}
                        onTimeUpdate={onTimeUpdate}
                        onEnded={handleOnEnd}
                    />
                )}
                
                <input
                    id='progress'
                    className={cx('progress')}
                    style={{
                        background: `linear-gradient(to right, #ffffff 0%, #ffffff ${currentTimePercent}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)`,
                    }}
                    type='range'
                    value={currentTimePercent}
                    min='0'
                    max='100'
                    onInput={onChangeValue}
                ></input>

                {/* {!currentSong.duration ? (
                    <div className={cx('total-time')}>00:00</div>
                ) : ( */}
                    <div className={cx('total-time')}>
                        {
                            Math.floor(`${currentSong.duration}` / 60) < 10
                            ? '0' + Math.floor(`${currentSong.duration}` / 60)
                            : Math.floor(`${currentSong.duration}` / 60)
                        } : {   
                            `${currentSong.duration}` % 60 < 10
                            ? '0' + (`${currentSong.duration}` % 60)
                            : `${currentSong.duration}` % 60
                        }
                    </div>
                {/* )} */}
            </div>
        </div>
    );
}

export default PlayerBar;
