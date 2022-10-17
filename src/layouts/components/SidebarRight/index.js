import { useState } from "react";
import classNames from "classnames/bind";
import styles from './SidebarRight.module.scss'
import { useSelector, useDispatch } from 'react-redux';

import Icon from "~/components/Icon";
import SmallMusicItemUser from "~/components/MusicItem/SmallMusicItem";

const cx = classNames.bind(styles)

function SidebarRight({ playlistActive }) {
    const currentSong = useSelector((state) => state.playMusicReducer.song);
    const listHistory = useSelector(state => state.songReducer.libraryHistory)
    const listMusic = useSelector((state) => state.playlistReducer.currentPlaylist);

    const [activePlaylist, setActivePlaylist] = useState(true)
    const [activeHistory, setActiveHistory] = useState(false)

    const handleActivePlaylist = () => {
        if (!activePlaylist) {
            setActivePlaylist(true)
            setActiveHistory(false)
        }
    }
    const handleActiveHistory = () => {
        if (!activeHistory) {
            setActivePlaylist(false)
            setActiveHistory(true)
        }
    }

    const renderListSong = () => {
        return (
            <>
            <div className={cx('playlist-wrapper', 'playlist', { active: activePlaylist })}>
                <div className={cx('song-playing')}>
                    {<SmallMusicItemUser className='song-playing' isPlaying song={currentSong} />}
                </div>
                <div className={cx('playlist-title')}>
                    <h3 className={cx('title')}>Tiếp theo  </h3>
                    <h4 className={cx('subtitle')}>Từ playlist <span> {listMusic.title}</span></h4>
                </div>
                <div className={cx('list-songs')}>
                    {
                        listMusic.songs.map((song) => {
                            return (
                                <SmallMusicItemUser key={song.encodeId} song={song} />
                            )
                        })
                    }
                </div>
            </div>
            <div className={cx('playlist-wrapper', 'playlist', { active: activeHistory })}>
                <div className={cx('list-songs')}>
                    {
                        listHistory.map((song) => {
                            return (
                                <SmallMusicItemUser key={song.encodeId} song={song} />
                            )
                        })
                    }
                </div>
            </div>
        </>
        )
    }

    return (
        <div className={cx('wrapper', { active: playlistActive })}>
            <div className={cx('header')}>
                <div className={cx('tabbars')}>
                    <div
                        className={cx('tabbar-item', { active: activePlaylist })}
                        onClick={handleActivePlaylist}
                    >
                        <h5 className={cx('tabbar-heading')}>Danh sách phát</h5>
                    </div>
                    <div
                        className={cx('tabbar-item', { active: activeHistory })}
                        onClick={handleActiveHistory}
                    >
                        <h5 className={cx('tabbar-heading')}>Nghe gần đây</h5>
                    </div>
                </div>
                <div className={cx('header-btn')}>
                    <Icon
                        s14 hover
                        icon={<i className="fal fa-alarm-clock"></i>}
                    />
                </div>
                <div className={cx('header-btn')}>
                    <Icon
                        hover
                        icon={<i className="far fa-ellipsis-h"></i>}
                    />
                </div>
            </div>
            {renderListSong()}
        </div>
    );
}
export default SidebarRight;