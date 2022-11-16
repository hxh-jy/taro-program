import { createStore } from "redux";
import thunk from "redux-thunk";
import saveTabInfo from './reducers/ask'

export default createStore(saveTabInfo)