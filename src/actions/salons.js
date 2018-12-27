import * as request from 'axios';

export const loadSalon = (id) => (dispatch) => {
    return request
        .get(`/api/salon/${id}`)
        .then(({data}) => {
            dispatch({
                type: 'LOAD_SALON',
                payload: data
            })
        })
};

export const receiveSalons = () => (dispatch) => {
    return request
        .get('/api/salons')
        .then(({data}) => {
            dispatch({
                type: 'RECEIVE_SALONS',
                payload: data
            })
        })
};

export const setPriceRange = (range) => (dispatch) => {
    const priceRange = JSON.stringify(range);
    return request
        .get(`/api/salons/range/${priceRange}`)
        .then(({data}) => {
            dispatch({
                type: 'RECEIVE_SALONS_BY_RANGE',
                payload: {
                    data,
                    range
                }
            })
        })
};


