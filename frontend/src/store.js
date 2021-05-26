import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {productListReducer,productDetailsReducer} from './reducers/productReducers'

const reducer = combineReducers({ productListReducer,productDetailsReducer });

const initialState = {};
// const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
