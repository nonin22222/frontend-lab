// src/store.js
import { createStore } from "vuex";
export default createStore({
  // สถานะ
  state: {
    loading: false,
    logedIn: false,
    token: localStorage.getItem("token"),
    _id: "",
    userName: null,
    roles: "",
  },
  // การเปลี่ยนแปลง
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
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
    setUserName(state, userName) {
      state.userName = userName;
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
  //ตัวดึงข้อมูล
  getters: {
    logedIn: (state) => state.logedIn,
    token: (state) => state.token,
    _id: (state) => state._id,
    username: (state) => state.userName,
    roles: (state) => state.roles,
    isLoading(state) {
      return state.loading;
    },
  },
  // การทำงาน
  actions: {
    setLoading({ commit }, status) {
      commit("setLoading", status);
    },
  },
  modules: {},
});
