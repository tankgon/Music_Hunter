import * as types from '~/constant/actionTypes';

const initialState = {
    title: '',
    songs: []
};

const musicsOfPageReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case types.MUSICS_OF_PAGE:
            return {
                title: actions.payload.title,
                songs: actions.payload.songs
            };
        default:
            return state;
    }
};

export default musicsOfPageReducer;
