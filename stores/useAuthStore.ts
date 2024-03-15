import { TUser } from "~/types/user";
import { defineStore } from "pinia";

type TCredentials = {
  email: string;
  password: string;
};

type TConfirm = {
  email: string;
  code: string;
};

type TRecover = {
  email: string;
};

type TUserResponse = {
  success: boolean;
  data: {
    token: string;
    me: TUser;
  };
};

export const useAuthStore = defineStore("auth", () => {
  const pageStore = usePageStore();

  const user = ref<TUser | null>(null);
  const confirmEmail = ref<string | null>(null);
  // const isLoggedIn = computed(() => !!user.value);
  const isLoggedIn = computed(() => !!user.value?.id > 0);
  const userIsAdmin = computed(
    () => isLoggedIn.value && user.value?.user_type === "admin"
  );

  const fetchUser = async () => {
    // type this later
    const { data } = await useApiFetch<TUser>("auth/me");
    user.value = data.value?.data?.me.id > 0 ? data?.value?.data?.me : null;
  };

  const login = async (credentials: TCredentials) => {
    const login = await useApiFetch("auth/login", {
      method: "POST",
      body: credentials,
    });

    await fetchUser();

    return login;
  };

  const logout = async () => {
    await useApiFetch("auth/logout", { method: "POST" });
    user.value = null;
  };

  const register = async (credentials: TCredentials) => {
    const register = await useApiFetch("auth/register", {
      method: "POST",
      body: credentials,
    });
    return register;
  };

  const confirm = async (credentials: TConfirm) => {
    const confirm = await useApiFetch("auth/confirm", {
      method: "POST",
      body: credentials,
    });

    await fetchUser();

    return confirm;
  };

  const recover = async (credentials: TRecover) => {
    const recover = await useApiFetch("auth/recover", {
      method: "POST",
      body: credentials,
    });

    return recover;
  };

  return {
    user,
    isLoggedIn,
    userIsAdmin,
    confirmEmail,
    login,
    logout,
    register,
    confirm,
    recover,
    fetchUser,
  };
});
