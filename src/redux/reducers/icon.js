import * as types from '~/constant/actionTypes';
import zingStorage from '~/utils/storage';

const initialState = {
    valueVolume: zingStorage.getAddValueVolume,
    isPlay: false,
    isLoop: zingStorage.getIsLoop() || false,
    isRandom: zingStorage.getIsRandom() || false,
};


const IconProject = (state = initialState, actions) => {
    switch (actions.type) {
        case types.SET_ACTIVE_GET_ICON_VOLUME:
            let valueVolume = [state.valueVolume];
            valueVolume.push(actions.payload);
            return {
                ...state,
                valueVolume: valueVolume,
            };
        case types.SET_ACTIVE_GET_IS_PLAY:
            return {
                ...state,
                isPlay: actions.payload ,
            };
        case types.SET_ACTIVE_GET_IS_RANDOM:
            console.log('loop', state.isLoop);
            console.log('random', state.isRandom);
            zingStorage.setIsRandom(actions.payload);
            return {
                ...state,
                isRandom: actions.payload,
            };
        case types.SET_ACTIVE_GET_IS_LOOP:
            zingStorage.setIsLoop(actions.payload);
            console.log(state.isLoop);
            return {
                ...state,
                isLoop: actions.payload,
            };
        default:
            return state;
    }
};

export default IconProject;
