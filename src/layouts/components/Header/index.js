import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { useState, useEffect } from 'react';
import Search from '../Search';
import Icon from '~/components/Icon';
import styles from './Header.module.scss';
import images from '~/images';
import Menu from '~/components/Popper/Menu/Menu';
import ThemeList from './ThemeList/index';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/config';
import { onAuthStateChanged } from '@firebase/auth';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const [color, setColor] = useState(false);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    window.addEventListener('scroll', changeBackground);

    let classActive = '';
    const [checkToppic, setCheckToppic] = useState(false);



    const openToppic = () =>{
        setCheckToppic(true)
    }
    const closeToppic = () =>{
        setCheckToppic(false)
    }

    const a =() =>{
        alert('thasnh')
    }


    const userMenu = [
        {
            title: 'Nâng cấp VIP',
            leftIcon: <i className='fal fa-gem'></i>,
        },
        {
            title: 'Mua code VIP',
            leftIcon: <i className='fal fa-gem'></i>,
        },
        {
            title: 'Đăng xuất',
            leftIcon: <i className='fal fa-sign-out'></i>,
            onClick: {a}
        },
    ];

    const settingMenu = [
        {
            title: 'Danh sách chặn',
            leftIcon: <i className='fal fa-ban'></i>,
        },
        {
            title: 'Chất lượng nhạc',
            leftIcon: <i className='fas fa-adjust'></i>,
            rightIcon: <i className='far fa-angle-right'></i>,
            children: [{ title: 'SQ: 128' }, { title: 'HD: 320' }],
        },
        {
            title: 'Giao diện',
            leftIcon: <i className='fal fa-play-circle'></i>,
            rightIcon: <i className='far fa-angle-right'></i>,
            children: [{ title: 'a' }, { title: 'b' }],
        },

        {
            title: 'Giới thiệu',
            leftIcon: <i className='fal fa-info-circle'></i>,
        },
        {
            title: 'Góp ý',
            leftIcon: <i className='fal fa-flag-alt'></i>,
            href: 'https://forms.gle/Nvh7kthdvr4a5SBd7',
        },
        {
            title: 'Liên Hệ',
            leftIcon: <i className='fal fa-phone-alt'></i>,
            href: 'https://mp3.zing.vn/huong-dan/contact',
        },
        {
            title: 'Thỏa thuận sử dụng',
            leftIcon: <i className='fal fa-file-alt'></i>,
            href: 'https://mp3.zing.vn/tnc',
        },
    ];


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            }
        })
    }, [navigate]);

    return (
        
        <div className={color ? cx('wrapper') : cx('wrapper2')}> 
        
            <div className={cx('inner')}>
                <div className={cx('left')}>
                    <button className={cx('direct-btn')}>
                        <i className='fal fa-long-arrow-left'></i>
                    </button>
                    <button className={cx('direct-btn')}>
                        <i className='fal fa-long-arrow-right'></i>
                    </button>
                    <div className={cx('search')}>
                        <Search />
                    </div>
                </div>

                <div className={cx('right')}>
                    <Tippy content='Chủ đề'>
                        <div className={cx('icon')}>
                            <Icon
                                onClick={openToppic}
                                btn
                                hover
                                icon={
                                    <svg
                                        width='20'
                                        height='20'
                                        className='header__nav-icon'
                                        viewBox='0 0 20 20'
                                    >
                                        <defs>
                                            <linearGradient
                                                id='j32lhg93hd'
                                                x1='62.206%'
                                                x2='18.689%'
                                                y1='70.45%'
                                                y2='39.245%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    stopColor='#F81212'
                                                ></stop>
                                                <stop
                                                    offset='100%'
                                                    stopColor='red'
                                                ></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id='hjoavsus6g'
                                                x1='50%'
                                                x2='11.419%'
                                                y1='23.598%'
                                                y2='71.417%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    stopColor='#00F'
                                                ></stop>
                                                <stop
                                                    offset='100%'
                                                    stopColor='#0031FF'
                                                ></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id='la1y5u3dvi'
                                                x1='65.655%'
                                                x2='25.873%'
                                                y1='18.825%'
                                                y2='56.944%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    stopColor='#FFA600'
                                                ></stop>
                                                <stop
                                                    offset='100%'
                                                    stopColor='orange'
                                                ></stop>
                                            </linearGradient>
                                            <linearGradient
                                                id='2dsmrlvdik'
                                                x1='24.964%'
                                                x2='63.407%'
                                                y1='8.849%'
                                                y2='55.625%'
                                            >
                                                <stop
                                                    offset='0%'
                                                    stopColor='#13EFEC'
                                                ></stop>
                                                <stop
                                                    offset='100%'
                                                    stopColor='#00E8DF'
                                                ></stop>
                                            </linearGradient>
                                            <filter
                                                id='4a7imk8mze'
                                                width='230%'
                                                height='230%'
                                                x='-65%'
                                                y='-65%'
                                                filterUnits='objectBoundingBox'
                                            >
                                                <feGaussianBlur
                                                    in='SourceGraphic'
                                                    stdDeviation='3.9'
                                                ></feGaussianBlur>
                                            </filter>
                                            <filter
                                                id='301mo6jeah'
                                                width='312.7%'
                                                height='312.7%'
                                                x='-106.4%'
                                                y='-106.4%'
                                                filterUnits='objectBoundingBox'
                                            >
                                                <feGaussianBlur
                                                    in='SourceGraphic'
                                                    stdDeviation='3.9'
                                                ></feGaussianBlur>
                                            </filter>
                                            <filter
                                                id='b2zvzgq7fj'
                                                width='295%'
                                                height='295%'
                                                x='-97.5%'
                                                y='-97.5%'
                                                filterUnits='objectBoundingBox'
                                            >
                                                <feGaussianBlur
                                                    in='SourceGraphic'
                                                    stdDeviation='3.9'
                                                ></feGaussianBlur>
                                            </filter>
                                            <filter
                                                id='a1wq161tvl'
                                                width='256%'
                                                height='256%'
                                                x='-78%'
                                                y='-78%'
                                                filterUnits='objectBoundingBox'
                                            >
                                                <feGaussianBlur
                                                    in='SourceGraphic'
                                                    stdDeviation='3.9'
                                                ></feGaussianBlur>
                                            </filter>
                                            <path
                                                id='qtpqrj1oda'
                                                d='M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z'
                                            ></path>
                                            <path
                                                id='jggzvnjgfc'
                                                d='M0 0H20V20H0z'
                                            ></path>
                                            <path
                                                id='2eiwxjmc7m'
                                                d='M3.333 14.167V5.833l-1.666.834L0 3.333 3.333 0h3.334c.04 1.57.548 2.4 1.524 2.492l.142.008C9.403 2.478 9.958 1.645 10 0h3.333l3.334 3.333L15 6.667l-1.667-.834v8.334h-10z'
                                            ></path>
                                        </defs>
                                        <g
                                            fill='none'
                                            fillRule='evenodd'
                                            transform='translate(2 3)'
                                        >
                                            <mask id='tinejqaasb' fill='#fff'>
                                                <use xlinkHref='#qtpqrj1oda'></use>
                                            </mask>
                                            <use
                                                fill='#FFF'
                                                fillOpacity='0'
                                                xlinkHref='#qtpqrj1oda'
                                            ></use>
                                            <g mask='url(#tinejqaasb)'>
                                                <g transform='translate(-2 -3)'>
                                                    <mask
                                                        id='uf3ckvfvpf'
                                                        fill='#fff'
                                                    >
                                                        <use xlinkHref='#jggzvnjgfc'></use>
                                                    </mask>
                                                    <use
                                                        fill='#D8D8D8'
                                                        xlinkHref='#jggzvnjgfc'
                                                    ></use>
                                                    <circle
                                                        cx='8.9'
                                                        cy='6.8'
                                                        r='9'
                                                        fill='url(#j32lhg93hd)'
                                                        filter='url(#4a7imk8mze)'
                                                        mask='url(#uf3ckvfvpf)'
                                                    ></circle>
                                                    <circle
                                                        cx='9.3'
                                                        cy='13.7'
                                                        r='5.5'
                                                        fill='url(#hjoavsus6g)'
                                                        filter='url(#301mo6jeah)'
                                                        mask='url(#uf3ckvfvpf)'
                                                    ></circle>
                                                    <circle
                                                        cx='15.9'
                                                        cy='6.9'
                                                        r='6'
                                                        fill='url(#la1y5u3dvi)'
                                                        filter='url(#b2zvzgq7fj)'
                                                        mask='url(#uf3ckvfvpf)'
                                                    ></circle>
                                                    <circle
                                                        cx='16.4'
                                                        cy='17.7'
                                                        r='7.5'
                                                        fill='url(#2dsmrlvdik)'
                                                        filter='url(#a1wq161tvl)'
                                                        mask='url(#uf3ckvfvpf)'
                                                    ></circle>
                                                </g>
                                            </g>
                                            <use
                                                fill='#FFF'
                                                fillOpacity='0.05'
                                                xlinkHref='#2eiwxjmc7m'
                                            ></use>
                                        </g>
                                    </svg>
                                }
                            />
                        </div>
                    </Tippy>

                    <Tippy content="Nâng cấp VIP">
                        <div className={cx('icon')}>
                            <Icon
                                btn
                                hover
                                icon={<i className='fal fa-gem'></i>}
                            />
                        </div>
                    </Tippy>
                    <Tippy content='Tải lên'>
                        <div className={cx('icon')}>
                            <Icon
                                btn
                                hover
                                icon={
                                    <i
                                        style={{ transform: 'rotate(-90deg)' }}
                                        className='fal fa-sign-out'
                                    ></i>
                                }
                            />
                        </div>
                    </Tippy>

                    <Menu items={settingMenu}>
                        <div className={cx('icon')}>
                            <Icon
                                btn
                                hover
                                icon={<i className='fal fa-cog'></i>}
                            />
                        </div>
                    </Menu>

                    <Menu items={userMenu} >
                        <img
                            // onClick={(set) => (alert('thanh'),{
                            //     user: null,
                            //     setUser: (user) => set({ user: user }),
                            //     modalName: '',
                            //     setModalName: (modalName) => set({ modalName: modalName }), 
                            // })} 
                            alt='avatar'
                            className={cx('user-avatar')}
                            src={images.defaultAvata}
                        />
                    </Menu>
                </div>

                <div
                    className={cx(
                        'modal-theme',
                        'open',
                        checkToppic == true
                            ? (classActive = 'open')
                            : (classActive = 'close')
                    )}
                >
                    <div className={cx('modal-container')}>
                        <div
                            className={cx('modal__close-btn')}
                            onClick={closeToppic}
                        >
                            <i
                                className={cx(
                                    'fal fa-times',
                                    'close__btn-icon'
                                )}
                            ></i>
                        </div>
                        <div className={cx('theme__header')}>
                            <h3 className={cx('theme__header-title')}>
                                Giao Diện
                            </h3>
                        </div>
                        <div className={cx('theme__content')}>
                            <div className={cx('grid', 'theme__container')}>
                                {/* {modalListTheme.map((listTheme, index) => (
                                    <ThemeList key={index} listTheme={listTheme} listThemeIndex={index} onChangeTheme={handleChangeTheme} />
                                ))} */}
                                {/* <Dynamic/> */}
                                <ThemeList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
