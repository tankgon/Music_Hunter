import classNames from 'classnames/bind';
import React from 'react'
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';
import styles from './MV.module.scss';
import Menu from './NavbarMV/Menu';
import MenuItem from './NavbarMV/MenuItem';
import {useDispatch} from 'react-redux';
import * as actions from '~/redux/actions';
const cx = classNames.bind(styles);

function MV() {
  const dispatch = useDispatch();
  const [getNameUrl, setGetNameUrl] = useState('');

  const handleGetName = () => {
    if(window.location.href === 'http://localhost:3000/the-loai-video/Viet-Nam') setGetNameUrl('Viet-Nam')
    if(window.location.href === 'http://localhost:3000/the-loai-video/Au-My') setGetNameUrl('Au-My')
    if(window.location.href === 'http://localhost:3000/the-loai-video/Han-Quoc') setGetNameUrl('Han-Quoc')
    if(window.location.href === 'http://localhost:3000/the-loai-video/Khong-Loi') setGetNameUrl('Khong-Loi')
  }
  useEffect(() => {
    dispatch(actions.addNameMV(getNameUrl));
    document.title = 'Video | Tuyển tập nhạc hay chọn lọc';
  }, [getNameUrl]);

  return (
    <div>
        <div className={cx('flex')}>
            <div className={cx('MV')}>MV</div>
            <div className={cx("hr-right")}></div>

            <div onClick={handleGetName}> 
              <Menu>
                <MenuItem title={"VIỆT NAM"} to={'/the-loai-video/Viet-Nam'}/>
                <MenuItem title={"US-UK"} to={'/the-loai-video/Au-My'}/>
                <MenuItem title={"KPOP"} to={'/the-loai-video/Han-Quoc'}/>
                <MenuItem title={"HÒA TẤU"} to={'/the-loai-video/Khong-Loi'}/>
              </Menu>
            </div>
         

        </div>
        <div className={cx('hr-top','mar-b-30')}/>
        <Outlet/>
        
    </div>

    
  )
}

export default MV