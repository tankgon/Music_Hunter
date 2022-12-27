import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import Loading from './Loading/Loading';
import Playlist from '~/components/Playlist';
import styles from './Top100.module.scss';
import getHome from '~/api/getHome';
import { ReactComponent as Banner } from '~/images/bannertop100.svg';

const cx = classNames.bind(styles);

function Top100() {
    const [topMusic, setTopMusic] = useState();


    const getTop = async() => {
        try{
            const res = await getHome.getTop100()
            setTopMusic(res.data.data);
        }
        catch (err){
            console.log(err);
        }
    }
    getTop()

    const renderLoading = () => {
        if (topMusic) {
            return (
                <div className={cx('wrapper')}>
                    <div className={cx('banner-top100')}>
                        <div className={cx('bg-img')}></div>
                        <div className={cx('bg-blur')}></div>
                        <div className={cx('bg-blur-2')}></div>
                        <Banner className={cx('banner-svg')} />
                    </div>
                    {topMusic && topMusic.map((playlist) => {
                        return (
                        <div className={cx('section')} key={playlist.encodeId}>
                            <h3 className={cx('section-title')}>{playlist.title}</h3>
                            <div className={cx('list-playlist')}>     
                                {playlist.items.map((topics, index) => (
                                    <Playlist
                                        className='w-[25%] px-3 md:w-[20%] md:px-3.5 mb-7'
                                        name={topics.title}
                                        describe={topics.artists.map( (artist, index) => {
                                            return index < topics.artists.length - 1 ? `${artist.name}, ` : `${artist.name}`;}
                                        )}
                                        link = '#' //mặc định
                                        image = { topics.thumbnail || topics.thumbnailM }
                                        iconLeft = { <i className='fal fa-heart'></i> }
                                        iconLeftActive = { <i className='fas fa-heart'></i> }
                                        titleIconLeft = 'Thêm vào thư viện'
                                    />
                                ))}
                            </div>
                        </div>)
                    })}
                </div>
            );
        } else return <Loading />;
    };
    return <>{renderLoading()}</>;
}

export default Top100;
