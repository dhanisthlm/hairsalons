import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import salons from './salons'

export default combineReducers({
  routeReducer,
  salons
})
