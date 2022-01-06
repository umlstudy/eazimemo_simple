import { SjLogUtil } from '@sejong/common';
import { combineReducers } from 'redux';
import { AppAction } from '../action/AppAction';

const initial = { value: 100, init: true };
export const appReducer = (state = initial, action: AppAction ): any => {
    switch (action.type) {
        case AppAction.INC.getSagaType():
            SjLogUtil.debug("INC => " + state.value);
            return Object.assign({}, state, {
                value: state.value + (action as any).value
            });
        case AppAction.DEC.getSagaType():
            return Object.assign({}, state, {
                value: state.value + (action as any).value
            });
        default:
            return state;
    }
};

export const rootReducer = combineReducers({ appReducer });
