import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from './SidebarLeft.module.scss'
import images from "~/images";
import Menu from './Menu/Menu';
import MenuItem from './Menu/MenuItem';
import {useSelector} from 'react-redux';

const cx = classNames.bind(styles)

function SidebarLeft() {
    
    const thanhMV = useSelector(state => state.songReducer.nameMV)
    const thanhHistory = useSelector(state => state.songReducer.nameHistory)

    return ( 
        <aside className={cx('wrapper')}>
            <Link to={''} className={cx('logo-link')}>
                <img src={images.logo} className={cx('logo-img')} alt='Zing mp3'/>
            </Link>
            <div className={cx('nav')}>
                <Menu>
                    <MenuItem 
                        title="Cá Nhân" 
                        to={'/user/music/song'} 
                        icon={<i className="fal fa-user"></i>} 
                    />
                    <MenuItem
                        title="Khám phá"
                        to={''}
                        icon={<i className="fal fa-compact-disc"></i>}
                    />
                    <MenuItem
                        title="#zingchart"
                        to={'/zing-chart'}
                        icon={<i className="fal fa-solid fa-chart-line"></i>}
                    />
                    <MenuItem
                        title="Radio"
                        to={'/radio'}
                        icon={<i className="fal fa-signal-stream"></i>}
                    />
                    <MenuItem
                        title="Theo dõi"
                        to={'/following'}
                        icon={<i className="fal fa-satellite-dish"></i>}
                    />
                </Menu>
            </div>
            <div className={cx('sidebar-divide')}></div>
            <div className={cx('category')}>
                <Menu>
                    <MenuItem 
                        title="Nhạc Mới"
                        to={'/nhac-moi'}
                        icon={<i className="fal fa-music"></i>}
                    />
                    <MenuItem 
                        title="Thể Loại"
                        to={'/types'}
                        icon={<i className="fal fa-icons"></i>}
                    />
                    <MenuItem 
                        title="Top 100"
                        to={'/top100'}
                        icon={<i className="fal fa-star"></i>}
                    />
                    <MenuItem 
                        title="MV"                      
                        to={`/the-loai-video/${thanhMV[1] === undefined || thanhMV[1] === '' ? 'Viet-Nam' : thanhMV[1]}`}
                        icon={<i className="fal fa-tv-music"></i>}
                    />
                    <div className={cx("box-vip")}>
                        <p className={cx('vip-desc')}>Nghe nhạc không quảng cáo cùng kho nhạc VIP</p>
                        <div className={cx('vip-btn')}>
                            NÂNG CẤP VIP
                        </div>
                    </div>
                </Menu>
                <h3 className={cx('heading')}>Thư Viện</h3>
                <Menu>
                    <MenuItem 
                        noActive
                        title="Bài Hát"
                        to={'/user/music/song'}
                        icon={<i className="far fa-album-collection"></i>}
                    />
                    <MenuItem 
                        noActive
                        title="Playlist"
                        to={'/playlist'}
                        icon={<i className="fal fa-list-music"></i>}
                    />
                    <MenuItem 
                        noActive
                        title="Gần Đây"
                        to={`/history/${thanhHistory[1] === undefined || thanhHistory[1] === '' ? 'song' : thanhHistory[1]}`}
                        icon={<i className="fal fa-history"></i>}
                    />
                </Menu>
            </div>
            <div className={cx('add-playlist')}>
                <i className="fal fa-plus"></i>
                <span className={cx('heading')}>Tạo Playlist Mới</span>
            </div>
        </aside> 
    );
}

export default SidebarLeft;