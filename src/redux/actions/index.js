import * as types from '~/constant/actionTypes';

export const addSongToLibrary = (data) => ({
    type: types.ADD_SONG_TO_LIBRARY,
    payload: data,
});

export const removeSonginLibrary = (data) => ({
    type: types.REMOVE_SONG_IN_LIBRARY,
    payload: data,
});

export const addPlaylistToLibrary = (data) => ({
    type: types.ADD_PLAYLIST_TO_LIBRARY,
    payload: data,
});

export const addNameMV = (data) => ({
    type: types.SET_ACTIVE_GET_NAME_MV,
    payload: data,
});

export const addNameHistory = (data) => ({
    type: types.SET_ACTIVE_GET_NAME_HISTORY,
    payload: data,
});

export const addValueVolume = (data) => ({
    type: types.SET_ACTIVE_GET_ICON_VOLUME,
    payload: data,
});

export const addValueIsPlay = (data) => ({
    type: types.SET_ACTIVE_GET_IS_PLAY,
    payload: data,
});

export const setRandom = (data) => ({
    type: types.SET_ACTIVE_GET_IS_RANDOM,
    payload: data,
});

export const setLoop = (data) => ({
    type: types.SET_ACTIVE_GET_IS_LOOP,
    payload: data,
});

export const playMusic = (data) => ({
    type: types.PLAY_MUSIC,
    payload: data,
});

export const addHistorySong = (data) => ({
    type: types.ADD_PLAYLIST_TO_HISTORY,
    payload: data,
});

export const musicOfPage = (data) => ({
    type: types.MUSICS_OF_PAGE,
    payload: data,
});
