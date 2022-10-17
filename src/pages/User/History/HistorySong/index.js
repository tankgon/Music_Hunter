import React from 'react'
import styles from '../../User.module.scss';
import classNames from "classnames/bind";
import MusicItem from '~/components/MusicItem';
import zingStorage from '~/utils/storage';
const cx = classNames.bind(styles)


function HistorySong() {

    return (
        <div className={cx('song-list')}>
            {
                (zingStorage.getHistorySong()) ?
                zingStorage.getHistorySong().map(song => {
                    return (
                        <MusicItem
                            key={song.encodeId} 
                            song={song} 
                        />
                    )
                }) : null
            }
        </div>
    )
}

export default HistorySong