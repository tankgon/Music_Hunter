import * as types from '~/constant/actionTypes';
import zingStorage from '~/utils/storage';

const initialState = {
    song: zingStorage.getCurrentSong() || null,
};

const playMusicReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.PLAY_MUSIC:
            zingStorage.setCurrentSong(actions.payload)
            return {
                song: actions.payload
            };
        default:
            return state;
    }
};

export default playMusicReducer;
