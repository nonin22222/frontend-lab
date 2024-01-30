// auth-module.js
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const store = useStore();
  const router = useRouter();

  const checkLogin = async () => {
    const user = await fetchUserData();
    return user && user.status === true;
  };

  const checkPosition = async () => {
    const user = await fetchUserData();
    return user && user.position === "admin";
  };

  const logout = () => {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userData");
    localStorage.removeItem("userData");
    store.commit("ClearLogin");
    router.push("/");
    console.log("ออกสำเร็จ");
  };

  const fetchUserData = async () => {
    try {
      const fakeUserData = {
        id: 1,
        user: "123",
        email: "user@example.com",
        status: true,
        position: "admin",
      };
      return fakeUserData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  return {
    checkLogin,
    checkPosition,
    logout,
  };
};
