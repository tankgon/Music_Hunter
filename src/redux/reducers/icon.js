import * as types from '~/constant/actionTypes';
import zingStorage from '~/utils/storage';

const initialState = {
    valueVolume: zingStorage.getAddValueVolume,
    isPlay: true,
    isLoop: '',
    isRanDom: '',
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
            let isPlay = [state.isPlay];
            isPlay.push(actions.payload);
            return {
                ...state,
                isPlay: isPlay ,
            };
        case types.SET_ACTIVE_GET_IS_RANDOM:
            let isRanDom = [state.isRanDom];
            isRanDom.push(actions.payload);
            return {
                ...state,
                isRanDom: isRanDom,
            };
        case types.SET_ACTIVE_GET_IS_LOOP:
            let isLoop = [state.isLoop];
            isLoop.push(actions.payload);
            return {
                ...state,
                isLoop: isLoop,
            };
        default:
            return state;
    }
};

export default IconProject;
