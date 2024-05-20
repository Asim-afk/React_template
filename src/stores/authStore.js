import Cookies from "js-cookie";
import { create } from "zustand";

const isLoggedIn = Cookies.get("token") ? true : false;

const token = Cookies.get("token") || null;

const role =
  Cookies.get("_role") === "user1" || Cookies.get("_role") === "user2"
    ? Cookies.get("_role")
    : null;

const useAuthStore = create((set) => ({
  userData: { isLoggedIn, role, token },

  userPermissions: { canEdit: false, canDelete: false },

  setUserPermissions: (data) => {
    set({
      userPermissions: { canEdit: data.canEdit, canDelete: data.canDelete },
    });
  },
  setUserData: (data) => {
    Cookies.set("token", data.token, { sameSite: "Lax" });
    Cookies.set("_role", data.role, { sameSite: "Lax" });
    set({
      userData: {
        isLoggedIn: data.isLoggedIn,
        role: data.role,
        token: data.token,
      },
    });
  },

  removeUser: () => {
    Cookies.remove("_role", { sameSite: "Lax" });
    Cookies.remove("token", { sameSite: "lax" });
    set({ userData: { isLoggedIn: false, role: null, token: null } });
  },
}));

export { useAuthStore };
