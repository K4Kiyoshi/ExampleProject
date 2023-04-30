import { applyMiddleware, createStore } from "redux";
import { createStateSyncMiddleware, initMessageListener } from "redux-state-sync";

const initialState = {
  sidebarShow: "responsive",
  login: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "login":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState, applyMiddleware(createStateSyncMiddleware()));

initMessageListener(store);

export default store;
