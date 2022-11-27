import { applyMiddleware, combineReducers, configureStore } from "@reduxjs/toolkit";
import {locationReducer,roomReducer,authReducer,userReducer,bookingReducer,commentReducer} from './reducers'


const rootReducer = combineReducers({
  locationReducer,roomReducer,authReducer,userReducer,bookingReducer,commentReducer
});
export const store = configureStore(
{
  reducer: rootReducer,
 
}

);
