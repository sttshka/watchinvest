<template>
  <div class="flex flex-col gap-4 lg:gap-6">
    <div
      class="text-[18px] lg:text-[24px] 2xl:text-[36px] font-medium text-secondary"
    >
      Настройки
    </div>

    <!-- <pre>{{ auth.user?.contact }}</pre> -->
    <!-- <pre>{{ userStore.addresses }}</pre> -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-1 flex-col lg:flex-row">
        <AppCard class="w-full lg:w-2/3">
          <template #header>
            <SectionHeader
              icon="IconProfileCircle"
              title="Персональные данные"
            />
          </template>
          <template #content>
            <div class="p-4 lg:p-6">
              <div class="flex flex-col gap-4 relative">
                <AppCardField
                  title="E-mail"
                  :value="auth.user?.email"
                  @edit="emailChangeIsOpen = true"
                />
                <AppCardField
                  title="Пароль"
                  value="••••••••••••"
                  can-edit
                  @edit="passwordChangeIsOpen = true"
                />
                <AppCardField
                  title="Phone"
                  can-edit
                  :value="userPhone"
                  @edit="phoneChangeIsOpen = true"
                />
                <!-- <AppCardField title="Страна" value="🇹🇷 Турция" /> -->
              </div>
            </div>
          </template>
        </AppCard>
        <div
          class="p-4 lg:p-6 bg-white w-full lg:w-1/3 border-t-[1px] lg:border-t-0 border-l-0 lg:border-l-[1px] border-gray-1 flex flex-row lg:flex-col items-center lg:justify-center"
        >
          <div
            class="flex lg:flex-col items-center justify-start lg:justify-center gap-4"
          >
            <label for="fileInput" class="file-upload">
              <div
                class="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] 2xl:w-[140px] 2xl:h-[140px] relative cursor-pointer"
                @click="avatarChangeIsOpen = true"
              >
                <NuxtImg
                  v-if="auth.user?.avatar"
                  provider="customProvider"
                  class="w-full h-full object-cover overflow-clip rounded-full"
                  :src="auth.user.avatar.filepath"
                />
                <div
                  v-else
                  class="flex justify-center items-center bg-gray-1 rounded-full w-full h-full"
                >
                  <span
                    class="text-[24px] lg:text-[36px] 2xL:text-[40px] leading-[120%] font-medium text-secondary"
                  >
                    {{ userFirstLetter }}
                  </span>
                </div>
                <div
                  class="absolute right-0 bottom-0 rounded-full bg-gray-1 w-8 h-8 flex justify-center items-center border-[2px] border-white"
                >
                  <IconCamera class="w-4 h-4 text-secondary" />
                </div>
              </div>
            </label>
            <input
              class="hidden"
              @change="handleSelectFile"
              accept="image/*"
              type="file"
              id="fileInput"
            />

            <div class="flex flex-col gap-1">
              <div class="text-gray-text text-[14px]">Ваше имя</div>
              <div class="flex gap-[6px] items-center justify-center">
                <div
                  class="text-secondary text-[17px] lg:text-[20px] font-medium flex-1"
                >
                  {{ auth.user?.first_name }}
                </div>
                <button
                  class="w-6 h-6 flex justify-center items-center bg-gray-1 rounded-full cursor-pointer"
                  @click="userNameChangeIsOpen = true"
                >
                  <IconEdit class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AppCard>
        <template #header>
          <SectionHeader icon="IconLocation" title="Адрес доставки" />
        </template>
        <template #content>
          <div class="flex flex-col">
            <div
              v-for="address in userStore.addresses"
              :key="i"
              class="flex lg:items-center flex-row gap-4 py-4 px-6 border-b-[1px] border-gray-1 last:border-none transition-colors relative"
              :class="{
                '!cursor-default': address.is_default,
              }"
            >
              <AppRadio
                class="h-fit"
                :model-value="address.is_default"
                @click="selectAddress(address.id)"
              />
              <div class="w-full flex flex-col lg:flex-row gap-3">
                <div class="flex-1">
                  <div class="text-[14px] text-gray-text">Получатель</div>
                  <div class="text-[16px] text-secondary">
                    {{ auth.user?.first_name }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-[14px] text-gray-text">Контакты</div>
                  <div class="text-[16px] text-secondary">
                    {{ address.contact }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-[14px] text-gray-text">Адрес</div>
                  <div class="text-[16px] text-secondary">
                    {{ address.address }}
                  </div>
                </div>
                <div class="flex-1">
                  <div class="text-[14px] text-gray-text">Город</div>
                  <div class="text-[16px] text-secondary">
                    {{ address.city }}
                  </div>
                </div>
              </div>
              <div class="flex-2 flex gap-2 absolute right-4 top-4 lg:static">
                <button
                  @click="handleDeleteAddress(address)"
                  class="bg-gray-1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-red hover:bg-opacity-50 transition-colors"
                >
                  <IconTrash class="w-[20px] h-[20px]" />
                </button>
                <button
                  @click="handleEditAddress(address)"
                  class="bg-gray-1 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-2 transition-colors"
                >
                  <IconEdit class="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <AppButton
            size="md"
            dark
            class="flex gap-3 text-base font-medium"
            @click="handleCreateAddress"
          >
            <span
              ><svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="https://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1103_11336)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.25892 6.25322H6.25322V6.25892L0 6.25894V7.7468L6.25322 7.74678L6.2532 14H7.74106L7.74108 7.74678H7.74678V7.74108L14 7.74106V6.2532L7.74678 6.25322L7.7468 0H6.25894L6.25892 6.25322Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1103_11336">
                    <rect width="14" height="14" fill="currentColor" />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <span>Добавить адрес</span>
          </AppButton>
        </template>
      </AppCard>

      <AppCard>
        <template #header>
          <SectionHeader icon="IconPlasticCard" title="Способ оплаты" />
        </template>
        <template #content>
          <div class="flex flex-col gap-4 p-6">
            <AppCardField title="Метод" value="Криптовалюта " />
          </div>
        </template>
      </AppCard>

      <div class="flex flex-col gap-4">
        <div
          class="text-primary underline cursor-pointer"
          @click="passwordChangeIsOpen = true"
        >
          Change password
        </div>
        <div class="text-primary underline cursor-pointer">Logout</div>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <AppModal
      v-model="userNameChangeIsOpen"
      @close="userNameChangeIsOpen = false"
    >
      <ChangeName @close="userNameChangeIsOpen = false" />
    </AppModal>

    <AppModal v-model="emailChangeIsOpen" @close="emailChangeIsOpen = false">
      <ChangeEmail @close="emailChangeIsOpen = false" />
    </AppModal>

    <AppModal v-model="phoneChangeIsOpen" @close="phoneChangeIsOpen = false">
      <ChangePhone @close="phoneChangeIsOpen = false" />
    </AppModal>

    <AppModal
      v-model="passwordChangeIsOpen"
      @close="passwordChangeIsOpen = false"
    >
      <ChangePassword @close="passwordChangeIsOpen = false" />
    </AppModal>

    <AppModal
      v-model="addressChangeIsOpen"
      @close="addressChangeIsOpen = false"
    >
      <ChangeAddress
        :address="currentAddress"
        @close="addressChangeIsOpen = false"
      />
    </AppModal>
  </Teleport>
</template>

<script setup lang="ts">
import SectionHeader from "./SectionHeader.vue";
import AppCard from "./AppCard.vue";
import AppRadio from "../ui/AppRadio.vue";
import AppCardField from "./AppCardField.vue";
import IconEdit from "../icons/IconEdit.vue";
import IconTrash from "../icons/IconTrash.vue";
import ChangeName from "./modals/ChangeName.vue";
import ChangePassword from "./modals/ChangePassword.vue";
import ChangeAddress from "./modals/ChangeAddress.vue";
import IconCamera from "~/components/icons/IconCamera.vue";
import ChangeEmail from "./modals/ChangeEmail.vue";
import ChangePhone from "./modals/ChangePhone.vue";

const userNameChangeIsOpen = ref(false);
const passwordChangeIsOpen = ref(false);
const emailChangeIsOpen = ref(false);
const phoneChangeIsOpen = ref(false);
const addressChangeIsOpen = ref(false);

const auth = useAuthStore();
const userStore = useUsersStore();
await userStore.loadDeliveryAddresses();

const userFirstLetter = computed(() => {
  return auth.user?.email.toUpperCase().split("")[0];
});

const userPhone = computed(() => {
  if (auth.user) {
    const foundPhone = auth.user.contact?.find(
      (contact) => contact.contact_type === "phone"
    );
    if (foundPhone) {
      return foundPhone.contact_value;
    }
  }
  return null;
});

function handleSelectFile(event: Event) {
  if (!event.target) {
    return;
  }
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];
  if (file) {
    handleUpdateAvatar(file);
  }
}

function handleUpdateAvatar(file: File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async () => {
    const me = await userStore.updateAvatar(reader.result as string);
    if (me) {
      auth.user = me;
    }
  };
}

const currentAddress = ref(null);

function handleEditAddress(address: any) {
  currentAddress.value = address;
  addressChangeIsOpen.value = true;
}

function handleCreateAddress() {
  addressChangeIsOpen.value = true;
  currentAddress.value = {
    new: true,
  };
}

function handleDeleteAddress(address: any) {
  userStore.deleteAddress(address.id);
}
function selectAddress(addressId: any) {
  userStore.setDefaultAddress(addressId);
}
</script>

<style scoped></style>
