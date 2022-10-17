import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './MusicControl.module.scss';
import Media from '~/components/Media';
import PlayerBar from '~/layouts/components/PlayerBar';
import Icon from '~/components/Icon';
import SidebarRight from '../SidebarRight';
import zingStorage from '~/utils/storage';
import * as actions from '~/redux/actions';
import axios from 'axios';
const cx = classNames.bind(styles);

function MusicControl() {
    const dispatch = useDispatch();
    const valueVolume = useSelector(state => state.IconProject.valueVolume);
    const [toggleBtn, setToggleBtn] = useState(false);
    const [activePlaylist, setActivePlaylist] = useState(false);
    const [valueInput, setValueInput] = useState(valueVolume.volume);
    const [playSong, setPlaySong] = useState('');

    const musicRef = useRef();
    const song = useSelector((state) => state.playMusicReducer.song);

    const onChangeValue = (e) => {
        setValueInput(parseInt(e.target.value));
    };

    useEffect(() => {
        dispatch(actions.setValueVolume(valueInput));
    }, [valueInput]);

    function handleTogglePlaylist() {
        if (toggleBtn) {
            setToggleBtn(false);
        } else {
            setToggleBtn(true);
        }
        activePlaylist ? setActivePlaylist(false) : setActivePlaylist(true);
    }

    const handleMute = () => {
        if(valueInput !==0) {
            setValueInput(0)
        } else {
            setValueInput(valueVolume.beforeVolume)
        }
        
    };

    useEffect(() => {
        axios
            .get(
                `https://apizingmp3.herokuapp.com/api/song?id=${song.encodeId}`
            )
            .then((res) => setPlaySong(res.data.data));
    }, [song]);

    return (
        <div
            className={cx('wrapper', 'px-5 flex justify-between items-center')}
        >
            <div
                className={cx(
                    'control-left',
                    'flex items-center justify-start',
                    'active'
                )}
            >
                {song ? 
                    <Media
                        image={song.thumbnail || song.thumbnailM ||
                            'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp…over/9/7/5/7/9757a70a3932be1bfbba5695e120a4c1.jpg'}
                        largeCd
                        noHover
                        song={song}
                        songName={song.title || 'Nguời âm phủ'}
                        singerName={song.artistsNames || 'OSAD'}
                    />
                :null}
            </div>
            <PlayerBar playSong={playSong} musicRef={musicRef} />
            <div
                className={cx('control-right', 'flex items-center justify-end')}
            >
                <Tippy content='MV'>
                    <div className='icon'>
                        <Icon icon={<i className='fal fa-tv-music'></i>} />
                    </div>
                </Tippy>
                <Tippy content='Xem lời bài hát'>
                    <div className='icon'>
                        <Icon
                            s14
                            icon={<i className='fal fa-microphone'></i>}
                        />
                    </div>
                </Tippy>
                <Tippy content='Chế độ cửa sổ'>
                    <div className='icon'>
                        <Icon
                            s14
                            icon={<i className='fal fa-window-restore'></i>}
                        />
                    </div>
                </Tippy>

                <div className={cx('control-volume', 'flex items-center')}>
                    <Icon
                        isActive={valueInput===0? true : false}
                        activeNoColor
                        icon={<i className='fal fa-volume'></i>}
                        activeIcon={<i className='fal fa-volume-mute'></i>}
                        onClick= {handleMute}
                    />
                    <input
                        id='volume'
                        style={{
                            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${valueInput}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.3) 100%)`,
                        }}
                        className={cx('volume')}
                        type='range'
                        value={valueInput}
                        step='1'
                        min='0'
                        max='100'
                        onChange={onChangeValue}
                    ></input>
                </div>
                <span className={cx('divide', 'block mx-5')}></span>

                <Tippy content='Danh sách phát'>
                    <div className='icon'>
                        <Icon
                            onClick={handleTogglePlaylist}
                            s14
                            hover
                            square
                            activeNoColor={toggleBtn}
                            icon={<i className='fal fa-list-music'></i>}
                            activeIcon={<i className='fal fa-list-music'></i>}
                        />
                    </div>
                </Tippy>
            </div>
            <SidebarRight playlistActive={activePlaylist} />
        </div>
    );
}

export default MusicControl;
