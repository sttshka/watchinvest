import { TUser } from "~/types/user";

type TSingleResponse<T> = {
  success: boolean;
  data: T;
};
type MultipleResponse<T> = {
  success: boolean;
  data: {
    total: number;
    items: T[];
  };
};

type TUsersResponse = TSingleResponse<TUser>;

type TDeliveryAddress = {
  country: string;
  city: string;
  address: string;
  contact: string;
  is_default: boolean;
  id: number;
  user_id: number;
  en: boolean;
  ctime: string;
  atime: string;
  dtime: string;
};

type TDeliveryAddressResponse = MultipleResponse<TDeliveryAddress>;

export const useUsersStore = defineStore("users", () => {
  const addresses = ref<TDeliveryAddress[]>([]);

  async function updateCredentials(credentials: Partial<TUser>) {
    const { data } = await useApiFetch<TUsersResponse>(
      "users/update_credentials",
      {
        method: "POST",
        body: credentials,
      }
    );
    return data.value?.data.me;
  }
  async function updateAvatar(dataString: string) {
    const { data } = await useApiFetch<TUsersResponse>("users/update_avatar", {
      method: "POST",
      body: {
        image: {
          data_url: dataString,
        },
      },
    });
    return data.value?.data.me;
  }

  async function updateEmail(email: string) {
    const { data, error } = await useApiFetch<TUsersResponse>(
      "users/update_email",
      {
        method: "POST",
        body: {
          email,
        },
      }
    );
    return {
      data: data.value?.data.me,
      error: error.value,
    };
  }

  async function updatePhone(phone: string) {
    const { data, error } = await useApiFetch<TUsersResponse>(
      "users/update_email",
      {
        method: "POST",
        body: {
          phone,
        },
      }
    );
    return {
      data: data.value?.data.me,
      error: error.value,
    };
  }

  async function updatePassword({
    password,
    password_old,
  }: {
    password: string;
    password_old: string;
  }) {
    const { data, error } = await useApiFetch<TUsersResponse>(
      "users/update_password",
      {
        method: "POST",
        body: {
          password,
          password_old,
        },
      }
    );
    return {
      data: data.value?.data.me,
      error: error.value,
    };
  }

  async function loadDeliveryAddresses() {
    const { data, error } = await useApiFetch<TDeliveryAddressResponse>(
      "delivery_addresses",
      {
        method: "GET",
      }
    );
    if (error.value) {
      console.log("error", error);
    }

    addresses.value = data.value?.data.items as TDeliveryAddress[];
    console.log("addresses.value", addresses.value);

    return {
      data: data.value?.data.items,
      error: error.value,
    };
  }

  async function updateAddressCredentials(credentials: TDeliveryAddress) {
    const { data, error } = await useApiFetch<
      TSingleResponse<TDeliveryAddress>
    >(`delivery_addresses/${credentials.id}`, {
      method: "POST",
      body: credentials,
    });

    if (data.value?.data) {
      addresses.value = addresses.value.map((item) => {
        if (item.id === credentials.id) {
          return data.value?.data;
        }
        return item;
      });
    }

    if (error.value) {
      console.log("error", error);
    }
    return {
      data: data.value?.data,
      error: error.value,
    };
  }
  async function deleteAddress(id: number) {
    const { data, error } = await useApiFetch<
      TSingleResponse<TDeliveryAddress>
    >(`delivery_addresses/${id}`, {
      method: "DELETE",
    });

    if (data.value?.data) {
      addresses.value = addresses.value.filter((item) => item.id !== id);
    }

    return {
      data: data.value?.data,
      error: error.value,
    };
  }
  async function createAddress(credentials: TDeliveryAddress) {
    const { data, error } = await useApiFetch<
      TSingleResponse<TDeliveryAddress>
    >("delivery_addresses", {
      method: "POST",
      body: credentials,
    });

    if (data.value?.data) {
      addresses.value = addresses.value.map((item) => {
        if (item.is_default) {
          return {
            ...item,
            is_default: false,
          };
        }
        return item;
      });
      addresses.value.push(data.value?.data);
    }

    return {
      data: data.value?.data,
      error: error.value,
    };
  }

  async function setDefaultAddress(id: number) {
    const { data, error } = await useApiFetch<
      TSingleResponse<TDeliveryAddress>
    >(`delivery_addresses/${id}`, {
      method: "POST",
      body: {
        is_default: true,
      },
    });
    if (error.value) {
      console.log("error", error);
    }
    if (data.value?.data) {
      addresses.value.forEach((item) => {
        if (item.id === id) {
          item.is_default = true;
          return;
        }

        item.is_default = false;
      });
    }

    return {
      data: data.value?.data,
      error: error.value,
    };
  }

  return {
    addresses,
    updatePassword,
    updatePhone,
    updateCredentials,
    updateAvatar,
    updateEmail,
    loadDeliveryAddresses,
    createAddress,
    deleteAddress,
    updateAddressCredentials,
    setDefaultAddress,
  };
});
