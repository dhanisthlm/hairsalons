import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import SalonList from './index';
import { SalonsItem } from '../SalonsItem';

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureStore();

const initialState = {
  salons: {
    list: [
      {
        name: 'Klippt och skuret',
        address: 'Kungsgatan 4',
        description: 'Stans bästa salong'
      }
    ]
  }
};

let store, wrapper;

beforeEach(()=>{
  store = mockStore(initialState)
})

test('salonsitem', () => {
  wrapper = shallow(<SalonList store={store} />);
  expect(SalonsItem.length).toBe(2);
})