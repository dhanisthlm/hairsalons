import { handleActions } from 'redux-actions'

export default handleActions({
    RECEIVE_SALONS: (state, action) => {
        action.payload.sort((a, b) => {
            return a.price - b.price;
        });
        const priceRange = state.priceRange;
        priceRange.min = action.payload[0].price;
        priceRange.max = action.payload[action.payload.length -1].price;

        return {
            ...state,
            list: action.payload,
            filteredList: action.payload,
            priceRange
        }
    },
    LOAD_SALON: (state, action) => {
        return {
            ...state,
            item: action.payload[0]
        }
    },
    RECEIVE_SALONS_BY_RANGE: (state, action) => {
        const priceRange = state.priceRange;
        priceRange.lowest = action.payload.range.lowest;
        priceRange.highest = action.payload.range.highest;

        return {
            ...state,
            priceRange: priceRange,
            filteredList: action.payload.data
        }
    },
}, {
    priceRange: {
        lowest: null,
        highest: null,
        min: null,
        max: null
    },
  list: [],
    filteredList: [],
  item: {}
})
