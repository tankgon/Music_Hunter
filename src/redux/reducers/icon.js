import * as types from '~/constant/actionTypes';
import zingStorage from '~/utils/storage';

const initialState = {
    valueVolume: {
        beforeVolume: 0,
        volume: zingStorage.getValueVolume() || 50
    },
    isPlay: false,
    isLoop: zingStorage.getIsLoop() || false,
    isRandom: zingStorage.getIsRandom() || false,
};


const IconProject = (state = initialState, actions) => {
    switch (actions.type) {
        case types.SET_ACTIVE_GET_ICON_VOLUME:
            zingStorage.setValueVolume(actions.payload);
            return {
                ...state,
                valueVolume: {
                    beforeVolume: state.valueVolume.volume,
                    volume: actions.payload
                },
            };
        case types.SET_ACTIVE_GET_IS_PLAY:
            return {
                ...state,
                isPlay: actions.payload ,
            };
        case types.SET_ACTIVE_GET_IS_RANDOM:
            zingStorage.setIsRandom(actions.payload);
            return {
                ...state,
                isRandom: actions.payload,
            };
        case types.SET_ACTIVE_GET_IS_LOOP:
            zingStorage.setIsLoop(actions.payload);
            return {
                ...state,
                isLoop: actions.payload,
            };
        default:
            return state;
    }
};

export default IconProject;
