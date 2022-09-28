import { useState } from "react";
import classNames from "classnames/bind";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from "~/components/Icon";
import Media from "~/components/Media";
import styles from './SidebarRight.module.scss'

const cx = classNames.bind(styles)

function SidebarRight({playlistActive}) {
    const dataSong = [
        {
            idSong: 1,
            img: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp…over/9/7/5/7/9757a70a3932be1bfbba5695e120a4c1.jpg',
            song: '1Nguời Âm Phủ',
            name: '3Osad',   
        },
        {
            idSong: 2,
            img: 'https://th.bing.com/th/id/OIP.0Y82n3kBFwgZdIORysnp6gHaGO?pid=ImgDet&rs=1',
            song: '2Nguời Âm Phủ1',
            name: '2Osad1',   
        },
        {
            idSong: 3,  
            img: 'https://i.pinimg.com/originals/bf/49/7d/bf497de269863fb368a3cd3fcdb77555.jpg',
            song: '3Nguời Âm Phủ2',
            name: '1Osad2', 
        }
    ]
    const [data, setData] = useState(dataSong);

    const [activePlaylist, setActivePlaylist] = useState(true)
    const [activeHistory, setActiveHistory] = useState(false)

    const handleActivePlaylist = () => {
        if(!activePlaylist) {
            setActivePlaylist(true)
            setActiveHistory(false)
        }
    }
    const handleActiveHistory = () => {
        if(!activeHistory) {
            setActivePlaylist(false)
            setActiveHistory(true)
        }
    }
    const renderSong = () => {
        return( data.map((song, index) => {
            return(  
                <Draggable key={song.idSong} draggableId={song.idSong.toString()} index={index} type="TASK">
                    {(provided)=>(
                        <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} 
                        className={cx('song-playing')}>
                            {/* Em cmt tam thoi */}
                            {/* <Media 
                                image={song.thumbnail || song.thumbnailM}
                                noHover
                                song={song ? song : null}
                                largeContent
                                mediaActive
                            /> */}
                        </div>
                    )}
                </Draggable> 
            )
        }))
    }
    const handleDraEnd = (result) => {
        console.log(result);
    }

    const rendreListSong = () => {
        return(
            <DragDropContext onDragEnd={handleDraEnd}>
                <Droppable droppableId="characters" >
                    {(provided)=>(
                        <div className={cx('playlist-wrapper', 'playlist', {active: activePlaylist})}
                        {...provided.droppableProps} ref={provided.innerRef}>
                            { data.map((song, index) => {
                                return(  
                                    <Draggable key={song.idSong} draggableId={song.idSong.toString()} index={index}>
                                        {(provided)=>(
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} 
                                            ref={provided.innerRef} className={cx('song-playing')}>
                                                {/* Em cmt tam thoi */}
                                                {/* <Media 
                                                    image={song.thumbnail || song.thumbnailM}
                                                    noHover
                                                    song={song ? song : null}
                                                    largeContent
                                                    mediaActive
                                                /> */}
                                            </div>
                                        )}
                                    </Draggable> 
                                )
                            })}
                            {provided.placeholder}      
                            <div className={cx('playlist-title')}>
                                <h3 className={cx('title')}>Tiếp theo  </h3>
                                <h4 className={cx('subtitle')}>Từ playlist <span> Top 100 nhạc VPOP hay nhất</span></h4>
                            </div>
                            <div className={cx('next-songs')}>
                                {renderSong()}
                            </div>
                        </div>
                    )}
                </Droppable>    
            </DragDropContext>
        )
    }

    return ( 
        <div className={cx('wrapper', {active: playlistActive})}>
            <div className={cx('header')}>
                <div className={cx('tabbars')}>
                    <div 
                        className={cx('tabbar-item', {active: activePlaylist})}
                        onClick={handleActivePlaylist}
                    >
                        <h5 className={cx('tabbar-heading')}>Danh sách phát</h5>
                    </div>
                    <div 
                        className={cx('tabbar-item', {active: activeHistory})}
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
            {rendreListSong()}
        </div>
     );
}

export default SidebarRight;