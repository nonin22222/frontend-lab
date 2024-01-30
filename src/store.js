// src/store.js
import { createStore } from "vuex";
export default createStore({
  // สถานะ
  state: {
    LoggedIn: false,
    token: localStorage.getItem("token"),
    _id: "",
    userName: null,
    setuserId: null,
    globalLoading: false,
    roles: "",
  },
  //ตัวดึงข้อมูล
  getters: {
    LoggedIn: (state) => state.LoggedIn,
    token: (state) => state.token,
    _id: (state) => state._id,
    username: (state) => state.userName,
    roles: (state) => state.roles,
  },
  // การเปลี่ยนแปลง
  mutations: {
    setRoles(state, roles) {
      state.roles = roles;
      localStorage.setItem("roles", roles);
    },
    setUserName(state, name) {
      state.userName = name;
      localStorage.setItem("userName", name);
    },
    setuserId(state, _id) {
      state._id = _id;
      localStorage.setItem("userId", _id);
    },
    setLogin(state, item) {
      state.LoggedIn = item.LoggedIn;
      (state._id = item._id),
        (state.userName = item.userName),
        (state.position = item.position);
    },
    ClearLogin(state) {
      state.LoggedIn = false;
      state._id = "";
      state.userName = "";
      state.token = "";
      localStorage.clear();
    },
    setToken(state, item) {
      state.token = item;
    },
    SET_GLOBAL_LOADING(state, value) {
      state.globalLoading = value;
    },
  },
  // การทำงาน
  actions: {},
  modules: {},
});
