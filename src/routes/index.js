import store from '../store';
import { loadSalon } from '../actions/salons';

export const updateSalon = (nextState, replace, callback) => {
    store
        .dispatch(loadSalon(nextState.params.id))
        callback();
};