import React from 'react'
import classNames from 'classnames/bind';
import styles from './Film.module.scss';
import { Link, useParams } from "react-router-dom";
import getMV from '../../../api/getMV'
import { useState, useEffect, } from 'react';
const cx = classNames.bind(styles);

function Film() {
  const { id } = useParams();
  const [listrender, setlistrender] = useState([]);
  useEffect(() => {
    const getDetailFilmFC = async () => {
        try {
            const a = await getMV.getDetailMV(`${id}`);
            setlistrender(a.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    getDetailFilmFC();
    
  },[id])

  const artists = () =>{
    if(listrender.artists){
      return listrender.artists.map((item, index)=>{
        return(
          <Link key={index} to={'#'} className={cx('is-ghost')}>
            {item.name}{item.name == listrender.artists[listrender.artists.length-1].name ? '' : ', '}
          </Link>
        )
      })
    }
  }

  const artists_botton = () =>{
    if(listrender.artists){
      return listrender.artists.map((item, index)=>{
        return(
          <Link key={index} to={'#'} className={cx('is-ghost', 'hover')}>
            {item.name}{item.name == listrender.artists[listrender.artists.length-1].name ? '' : ', '}
          </Link>
        )
      })
    }
  }

  const playList = () => {
    if(listrender.recommends) {
      return listrender.recommends.map((item, index) =>{
        return(
          <div key={index} className={cx('zm-carousel-item', 'is-fullhd-1.2', 'is-widescreen-2', 'is-desktop-20', 'is-touch-3', 'is-tablet-3')}>
            <div className={cx('zm-card', 'video-item')}>
              <div className={cx('zm-card-image', 'video-image')}>
                <figure className={cx('image', 'is-48x48')}>
                  <img src={`${item.thumbnailM}`}></img>
                </figure>
                <div className={cx('opacity-behind')}></div>
                <div className={cx('zm-box', 'zm-actions', 'video-actions')}>
                  <button className={cx('zm-btn', 'action-play', 'button')}>
                    <i className={cx('icon', 'action-play', 'ic-svg-play-circle')}></i>
                  </button>  
                </div>
                {/* <div className={cx('zm-brand')}>03:33</div> */}         
              </div>
              <div className={cx('media')}>
                <div className={cx('media-content')}>
                  <div className={cx('title')}>
                    <Link className={cx('name_header')} to={'#'}>
                      <span>{item.title}</span>
                    </Link>
                  </div>
                  <div className={cx('subtitle', 'is-one-line')}>
                    {item.artists.map((item_behind, index)=>{
                      return(
                        <Link key={index} className={cx('is-ghost', 'hover')} to={'#'}>
                          {item_behind.name}{item_behind.name == item.artists[item.artists.length-1].name ? '' : ', '}
                        </Link>
                      )                     
                    })}
                    
                  </div>
                  
                </div>                                  
              </div>
            </div>                                 
          </div> 
        )
      })
    }
  }

  const onPlayList = () => {
    if(listrender){
      return(
        <div className={cx('zm-card', 'video-item', 'video-active')}>
          <div className={cx('zm-card-image', 'video-image')}>
            <figure className={cx('image', 'is-48x48')}>
              <img src={`${listrender.thumbnailM}`}></img>
            </figure>
            <div className={cx('opacity')}></div>
            <div className={cx('zm-box', 'zm-actions', 'video-actions')}>
              <button className={cx('zm-btn', 'action-play', 'button')}>
                <i className={cx('icon', 'action-play', 'fas fa-play')}></i>
              </button> 
            </div>
            {/* <div className={cx('zm-brand')}>03:33</div> */}
            <div className={cx('zm-brand-playing')}>Đang phát</div>
          </div>
          <div className={cx('media')}>
            <div className={cx('media-content')}>
              <div className={cx('title')}>
                <Link className={cx('name_header')} to={'#'}>
                  <span>{listrender?.song?.title}</span>
                </Link>
              </div>
              <div className={cx('subtitle', 'is-one-line')}>
                {artists_botton()}
              </div>
              
            </div>                                  
          </div>
        </div>
      )
    }
  }
  

  return (
    
    <div 
    style={{backgroundImage:
      `url(${listrender.thumbnailM})`,
    backgroundRepeat:"no-repeat",backgroundSize:"cover"}} 
    className={cx('video-container')}>
        <div className={cx('video-header')}>
            <div className={cx('level')}>
                <div className={cx('level-left')}>
                  <div className={cx('level-item')}>
                    <div className={cx('media')}>
                      <div className={cx('media-left')}>
                        <figure className={cx('image', 'is-40x40', 'is-rounded')}>
                          {listrender.artist ? <img src={`${listrender.artist.thumbnail}`}></img> : null}        
                        </figure>

                      </div>
                      <div className={cx('media-content')}>
                        <div className={cx('title')}>{listrender?.song?.title}</div>
                        <div className={cx('subtitle', 'is-one-line')}>
                          {artists()}
                        </div>
                      </div>
                      <div className={cx('media-right')}>
                        <button className={cx('zm-btn', 'zm-tooltip-btn')}>
                          <i className={cx('icon','fal fa-heart')}></i>
                        </button>
                        <button className={cx('zm-btn', 'zm-tooltip-btn')}>
                          <i className={cx('icon','fal fa-music')}></i>
                        </button>
                        <button className={cx('zm-btn', 'zm-tooltip-btn')}>
                          <i className={cx('icon','far fa-ellipsis-h')}></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('level-right')}>
                  <button className={cx('zm-btn', 'zm-tooltip-btn')}>
                    <i className={cx('icon','fal fa-compress-wide')}></i>
                  </button>
                  <button className={cx('zm-btn', 'zm-tooltip-btn')}>
                    <i className={cx('icon','fal fa-times')}></i>
                  </button>
                </div>
            </div>
        </div>
        <div className={cx('video-body')}>
          <div className={cx('container')}>
            <div className={cx('columns', 'is-multiline')}>
              <div className={cx('video-player', 'column', 'mar-b-0')}>
                <div id={cx('videoPlayer')}>
                  <div className={cx('player-button-minimize')}>
                    <button className={cx('zm-btn', 'zm-tooltip-btn', 'mar-r-5', 'is-hover-circle', 'button')}>
                      <i className={cx('icon','fal fa-spinner-third')}></i>
                    </button>
                    <button className={cx('zm-btn', 'zm-tooltip-btn', 'is-hover-circle', 'button')}>
                      <i className={cx('icon','fal fa-spinner-third')}></i>
                    </button>
                  </div>
                  <div className={cx('player-info-fullscreen')}>
                    Cuộn trang để xem nhiều hơn
                    <i className={cx('icon','fal fa-chevron-down')}></i>
                  </div>
                  {/* <div className={cx('--z--player')}> */}


                    {listrender.streaming ? 
                   <iframe 
                    className={cx('class')} 
                    preload='metadata' 
                    controls
                    frameBorder="0"
                    allowFullScreen
                    src={listrender.streaming.mp4["720p"]}></iframe>
                    : null}

                    

                    {/* <div className={cx('--z--zpl-settings-menu', 
                    '--z--show'
                    )}>
                      <div className={cx('--z--zpl-panel')}>
                        <div className={cx('--z--panel-scroll-wrapper')}>
                          <div className={cx('--z--zpl-panel-inner')}>
                            <div className={cx('--z--zpl-menu-item')}>
                              <div className={cx('--z--zpl-item-label')}>Chất lượng</div>
                              <div className={cx('--z--zpl-item-content')}>
                                <div className={cx('--z--zpl-has-expand')}>
                                  <span>Auto 1080p</span>
                                  <i className={cx('icon_menu', 'fal fa-angle-right')}></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      
                    
                    </div>

                    <div className={cx('--z--controls-wrapper')}>
                      <div className={cx('--z--controls')}>
                        <div className={cx('--z--progress-bar')}>
                          <span className={cx('--z--bar', '--z--bar-bg')}></span>
                          <span className={cx('--z--bar', '--z--bar-fill-load',)}></span>
                          <span className={cx('--z--bar', '--z--bar-fill-recent',)}>
                            <span className={cx('--z--bullet')}></span>
                          </span>
                          <span className={cx('--z--seek-time', 
                          // '--z--hide'
                          )}>02:06</span>
                        </div>
                      </div>
                    </div> */}
                  {/* </div> */}
                  
                             
                 


                </div>
              </div>
              <div className={cx('queue-player', 'column', 'mar-b-0')}>
                  <div className={cx('video-queue', 'is-vertical')}>
                    <div className={cx('list-playing')}>
                      <div className={cx('container', 'mar-b-30')}>
                        <div className={cx('list-playing-header')}>
                          <h3 className={cx('pull-left', 'title')}> Danh Sách Phát </h3>
                          <button className={cx('zm-btn', 'zm-auto-play-switch', 'pull-left', 'button')}>
                            <div> Tự Động Phát</div>
                            <i className={cx('icon_right', 'far fa-toggle-on')}></i>
                            {/* <i className={cx('icon_right', 'far fa-toggle-off')}></i> */}
                          </button>
                        </div>
                        <div className={cx('list-playing-body')}>
                          <div className={cx('list-playing-body-content')}>
                            <div className={cx('zm-carousel-wrapper')}>
                              <div className={cx('zm-carousel')}>
                                <div className={cx('zm-carousel__container')}>

                                  <div className={cx('zm-carousel-item', 'is-fullhd-1.2', 'is-widescreen-2', 'is-desktop-20', 'is-touch-3', 'is-tablet-3')}>
                                    {onPlayList()}                                   
                                  </div>

                                  {playList()}                             


                                </div>
                              </div>
                            </div>

                            <div className={cx('track-horizontal')}>
                              <div className={cx('track-horizontal_mini')}></div>
                            </div>

                            <div className={cx('track-vertical')}>
                              <div className={cx('thumb-vertical')}></div>
                            </div> 

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>                  
                  
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Film