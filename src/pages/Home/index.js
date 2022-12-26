import classNames from 'classnames/bind';
import 'react-slideshow-image/dist/styles.css';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
//getAPI
// import {
//     getHome,
//     //... and many other services
// } from "nhaccuatui-api-full";
import getHome from '../../api/getHome';
import MySlide from './Slide/MySlide';
import NewRelease from './NewRelease/NewRelease';
import Playlist from '~/components/Playlist';
import styles from './Home.module.scss';
import SlideRadio from '../Radio/SlideRadio';
const cx = classNames.bind(styles);

function Home() {
    const [getSlide, setGetSlide] = useState();
    const [newRelease, setNewRelease] = useState();
    const [playlistToday, setPlaylistToday] = useState();
    const [newMusic, setNewMusic] = useState();
    const [mixArtists, setMixArtists] = useState();
    const [weekChart, setWeekChart] = useState();
    const [top100, setTop100] = useState();
    const [topNewMusic, setTopNewMusic] = useState();
    const [playlistNewMusic, setPlaylistNewMusic] = useState();
    const [listRadio, setListRadio] = useState();
    const [XONE, setXONE] = useState();

    useEffect(() => {
        document.title =
            'Zing MP3 | Nghe tải nhạc chất lượng cao trên destop, mobile và TV';
    }, []);

    console.log(weekChart);

    useEffect(() => {
        const gethomePage = async () => {
            try {
                const res1 = await getHome.homePage('1');
                setGetSlide(res1.data.data.items[0].items);
                setNewRelease(res1.data.data.items[4]);
                setPlaylistToday(res1.data.data.items[2]);

                const res2 = await getHome.homePage('2');
                setMixArtists(res2.data.data.items[0]);

                const res3 = await getHome.homePage('3');
                setListRadio(res3.data.data.items[0]);
                setNewMusic(res3.data.data.items[1]);
                setWeekChart(res3.data.data.items[3]);

                const res4 = await getHome.homePage('4');
                setTop100(res4.data.data.items[0]);

                const res5 = await getHome.homePage('5');
                setPlaylistNewMusic(res5.data.data.items[1].items);
                setTopNewMusic(res5.data.data.items[2]);
                setXONE(res5.data.data.items[0])

            } catch (error) {
                console.log(error);
            }
        };
        gethomePage();
    }, []);

    const propsSlide5 = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 5,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
    };

    const propsSlide3 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        arrows: false,
    };

    return (
        <div className={cx('wrapper')}>
            {getSlide && <MySlide getSlide={getSlide} />}

            {playlistToday ? <div className={cx('section')}>   
                <div className={cx('section-header', 'flex justify-between')}>
                    <h3 className={cx('section-title')}>{playlistToday.title}</h3>
                    <Link to={'/top100'} className={cx('section-link')}>
                        Tất cả
                    </Link>
                </div>
                <div className={cx('list-playlist')}>
                    {playlistToday.items.map((playlist, index) => {
                        if (index < 5) {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.artists.map(
                                        (artist, index) => {
                                            return index < playlist.artists.length - 1 ? `${artist.name}, ` : `${artist.name}`;
                                        }
                                    )}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                    }})}
                </div>
            </div> : null }
            
            {newRelease ? <div className={cx('section')}>
                <h3 className={cx('section-title')}>{newRelease.title}</h3>
                <NewRelease data={newRelease} />
            </div> : null} 

            {mixArtists ? <div className={cx('section')}>   
                <div className={cx('section-header', 'flex justify-between')}>
                    <h3 className={cx('section-title')}>{mixArtists.title}</h3>
                    <Link to={'/top100'} className={cx('section-link')}>
                        Tất cả
                    </Link>
                </div>
                <div className={cx('list-playlist')}>
                    {mixArtists.items.map((playlist, index) => {
                        if (index < 5) {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.artists.map(
                                        (artist, index) => {
                                            return index < playlist.artists.length - 1 ? `${artist.name}, ` : `${artist.name}`;
                                        }
                                    )}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                    }})}
                </div>
            </div>: null }

            {listRadio ? <div className={cx('section')}>
                <div className={cx('section-header', 'flex justify-between')}>
                    <h3 className={cx('section-title')}>{listRadio.title}</h3>
                    <Link to={'/radio'} className={cx('section-link')}>
                        Tất cả
                    </Link>
                </div>
                <div className={cx('list-slide')}>
                    <SlideRadio listRadio={listRadio} />
                </div>
            </div> : null}

            {newMusic ? <div className={cx('section')}>
                <h3 className={cx('section-title')}>{newMusic.title}</h3>
                <div className={cx('list-playlist')}>
                    {newMusic.items.map((playlist) => {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.sortDescription}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                    })}
                </div>
            </div> : null }

            {weekChart ? <div className={cx('section')}>
                <div className={cx('list-playlist')}>
                    { weekChart.items.map((item, index) => {
                        return (
                            <div key={index} className={cx( 'card-wrapper','w-[33.33%] px-3.5 mb-7' )}>
                                <div className={cx('card-banner')}>
                                    <a className={cx('card-link')} href='#'></a>
                                    <img src={item.cover} className={cx('card-img')}/>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div> : null }

            {top100 ? <div className={cx('section')}>   
                <div className={cx('section-header', 'flex justify-between')}>
                    <h3 className={cx('section-title')}>{top100.title}</h3>
                    <Link to={'/top100'} className={cx('section-link')}>
                        Tất cả
                    </Link>
                </div>
                <div className={cx('list-playlist')}>
                    {top100.items.map((playlist, index) => {
                        if (index < 5) {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.artists.map(
                                        (artist, index) => {
                                            return index < playlist.artists.length - 1 ? `${artist.name}, ` : `${artist.name}`;
                                        }
                                    )}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                    }})}
                </div>
            </div> : null }

            
            {XONE ? <div className={cx('section')}>
                <h3 className={cx('section-title')}>{XONE.title}</h3>
                <div className={cx('list-playlist')}>
                    {XONE &&
                        XONE.items.map((playlist) => {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='w-[25%] px-3 md:w-[20%] md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.sortDescription}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                        })}
                </div>
            </div> : null}

            {/* <div className={cx('section')}>
                <h3 className={cx('section-title')}>Nghệ sĩ yêu thích</h3>
                <div className={cx('list-slide')}>
                    <Slider {...propsSlide5}>
                        {mixArtists && mixArtists.map((artist, index) => {
                            return (
                                <div key={index} className={cx('card-wrapper')}>
                                    <a href='#' className={cx('artists-card')}>
                                        <img className={cx('card-img')} src={artist.thumbnail} alt=''/>
                                        <div className={cx('card-content')}>
                                            <h4 className={cx('name-artists')}>{artist.artistsNames}</h4>
                                            <div className={cx('thumbs')}> 
                                            {artist.song.items.map( (thumb, index) => { if (index < 3) { 
                                                return (
                                                <div key={index} className={cx('thumb')}>         
                                                <img className={cx('thumb-img')} src={ thumb.thumbnail} alt=''/>     
                                                </div> )}})}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            );})}
                    </Slider>
                </div>
            </div> */}

            { playlistNewMusic ? <div className={cx('section')}>
                <div className={cx('section-header', 'flex justify-between')}>
                    <h3 className={cx('section-title')}>Nhạc mới</h3>
                    <Link to={'/nhac-moi'} className={cx('section-link')}>
                        Tất cả
                    </Link>
                </div>
                <div className={cx('list-slide')}>
                    <Slider {...propsSlide3}>
                        {playlistNewMusic &&
                            playlistNewMusic.map((item, index) => {
                                return (
                                    <div key={item.encodeId} className={cx('card-wrapper')}>
                                        <div className={cx('card-inner')}>
                                            <img src={item.thumbnail} className={cx('card-img')}/>
                                            <div className={cx('top-music-content' )}> 
                                                <div className={cx('music-info')} ><a href={'#'} title={item.title}className={cx('title')}>         {item.title}     </a>     <p         className={cx(             'subtitle'         )}     >         {item.artistsNames}     </p> </div> <div>     <span         className={cx(             'ranking'         )}     >         #{index + 1}     </span> </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div> : null }

            <div className={cx('section')}>
                <Slider {...propsSlide5}>
                    {topNewMusic &&
                        topNewMusic.items.map((playlist, index) => {
                            return (
                                <Playlist
                                    key={playlist.encodeId}
                                    className='px-3 md:px-3.5'
                                    name={playlist.title}
                                    describe={playlist.artistsNames}
                                    link='#' //mặc định
                                    image={
                                        playlist.thumbnail ||
                                        playlist.thumbnailM
                                    }
                                    data={playlist}
                                />
                            );
                        })}
                </Slider>
            </div>
            
        </div>
    );
}

export default Home;
