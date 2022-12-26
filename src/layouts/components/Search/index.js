import { useState, useEffect, useRef, Fragment } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { getTopKeyword } from "nhaccuatui-api-full";
import getHome from '~/api/getHome';
import Wrapper from '~/components/Popper';
import { useDebounce } from '~/hooks';
import styles from './Search.module.scss';
import images from "~/images";
import Image from '~/components/Image';
import SmallMusicItemUser from '~/components/MusicItem/SmallMusicItem';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    
    const inputRef = useRef();
    const debouncedValue = useDebounce(searchValue, 500);
    
    const [topSearchs, setTopSearchs] = useState([]);

    useEffect(() => {
        const getTopSearch = async () => {
            try {
                const res = await getTopKeyword()
                setTopSearchs(res.listKeyValue)
                if(!searchValue.trim()) {
                    setSearchResult()
                    return; 
                }
                const res1 = await getHome.getSearch(`${searchValue}`)
                console.log(res1, searchValue);
                setSearchResult(res1.data.data)
            } catch (error) {
                // alert(error);
            }
        };
        getTopSearch();
    },[debouncedValue])

    function renderTopSearch() {
        if(topSearchs) {
            return topSearchs.map((item, index) => {
                return (
                    <h4 key={index} className={cx('suggest-item')}>
                        <i className="fal fa-search"></i>
                        <span>{item.title}</span>
                    </h4>
                )
            })
        }
    }

    function renderSongsResult() {
        if(searchResult && searchResult !== '') {
            return (
                searchResult.songs.map(item => {
                    return ( <SmallMusicItemUser key={item.encodeId} isPlaying song={item} />)
                })
            )
        }
    }

    function renderPlaylistsResult() {
        if(searchResult && searchResult !== '') {
            return (
                searchResult.playlists.map(item => {
                    return (
                        <div key={item.encodeId} className={cx('result-item')}>
                            <div className={cx('cd')}>
                                <Image 
                                    className={cx('cd-thumb')}
                                    src={item.thumbnail || item.thumbnailM}
                                    alt={item.title}
                                    defaultAvt={images.defaultAvataSong}
                                />
                            </div>
                            <div className={cx('media-content')}>
                                <div className={cx('song-name','text-sm')}>{item.title}</div>
                                <div className={cx('singer-name', 'text-xs')}>
                                    <span>
                                        Playlist • {item.artistsNames}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    }
    
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return ( 
        <div> 
            <HeadlessTippy
                interactive
                placement={'bottom'}
                visible={showResult}
                onClickOutside={handleHideResult}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <Wrapper className="suggest">
                            <div className={cx('suggest-list')}>
                                {searchValue ? (
                                    <Fragment>
                                        <h3 className={cx('search-title','search-key')}>
                                            <i className="fal fa-search"></i>
                                            Tìm kiếm {!!searchValue && `"${searchValue}"`}
                                        </h3>
                                        <h3 className={cx('search-title')}>Bài hát</h3>
                                        {renderSongsResult()}
                                        <h3 className={cx('search-title')}>Playlist</h3>
                                        {renderPlaylistsResult()}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <h3 className={cx('search-title')}>Tìm kiếm nhiều nhất</h3>
                                        {renderTopSearch()}
                                    </Fragment>
                                )}
                            </div>
                        </Wrapper>
                    </div>
                )}
            >
                <div className={cx('wrapper', {activeSearch: showResult } )}>
                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <i className="fal fa-search"></i>
                    </button>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <i className="fal fa-times"></i>
                        </button>
                    )}

                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;