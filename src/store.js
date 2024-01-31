// src/store.js
import { createStore } from "vuex";
export default createStore({
  // สถานะ
  state: {
    logedIn: false,
    token: localStorage.getItem("token"),
    _id: "",
    userName: null,
    roles: "",
  },
  //ตัวดึงข้อมูล
  getters: {
    logedIn: (state) => state.logedIn,
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
    setLogin(state, item) {
      (state.logedIn = item.logedIn),
        (state.userName = item.userName),
        (state.roles = item.roles),
        (state.id = item.id);
    },
    setAdmin(state, item) {
      state.userName = item.userName;
      state.roles = item.roles;
      state.id = item.id;
    },
    ClearLogin(state) {
      state.logedIn = false;
      state.token = "";
      state.name = "";
      state.roles = "";
      state.id = "";
      state.state = false;
      localStorage.clear();
    },
    setToken(state, item) {
      state.token = item;
    },
  },
  // การทำงาน
  actions: {},
  modules: {},
});
