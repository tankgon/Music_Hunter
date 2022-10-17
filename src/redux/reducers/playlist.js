import * as types from "~/constant/actionTypes";
import zingStorage from "~/utils/storage";

//songReducer để xử lí các action liên quan đến song

const initialState = {
    libraryPlaylist: zingStorage.getLibraryPlaylist() || [],
    currentPlaylist: {
        title: zingStorage.getCurrentPlaylist().title || "",
        songs: zingStorage.getCurrentPlaylist().songs || null,
    }
}

const playlistReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.ADD_PLAYLIST_TO_LIBRARY:
            zingStorage.setLibraryPlaylist([...state.libraryPlaylist, actions.payload])
            return {
                ...state,
                libraryPlaylist: [...state.libraryPlaylist, actions.payload]
            }
        case types.SET_CURRENT_PLAYLIST:
            zingStorage.setCurrentPlaylist(actions.payload)
            return {
                ...state,
                currentPlaylist: {
                    title: actions.payload.title,
                    songs: actions.payload.songs,
                }
            }
        default:
            return state;
    }
}

export default playlistReducer;