import classNames from 'classnames/bind';

import styles from './NewRelease.module.scss'
import images from '~/images';
import Image from '~/components/Image';
const cx = classNames.bind(styles)

function NewRelease({ data }) {

    return ( 
        <div className={cx('wrapper')}>
            <a href="#" className={cx('nav-btn', 'active')}>Bài hát</a>
            <div className={cx('list-song')}>
                {data.items.all.map((song, index) => {
                    if(index<12) {  //giới hạn render 12 bài
                        return(
                            <div 
                            key={song.encodeId} 
                            className={cx('w-[50%] px-4 md:w-[33.33%] md:px-3.5')}>
                                <div className={cx('song-item')}>
                                    <div className={cx('cd')}>
                                        <Image 
                                            className={cx('cd-thumb')}
                                            src={song.thumbnail || song.thumbnailM}
                                            alt={song.title}
                                            defaultAvt={images.defaultAvataSong}
                                        />
                                    </div>
                                    <div className={cx('media-content')}>
                                        <div className={cx('song-name','text-sm')}>{song.title}</div>
                                        <div className={cx('singer-name')}>
                                            <span>{song.artistsNames}</span>
                                        </div>
                                        <div className={cx('time-status')}>{song.streamingStatus} ngày trước</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
     );
}

export default NewRelease;