<template>
  <form
    @submit.prevent="handleRegister"
    class="flex flex-col gap-10 h-full w-full"
  >
    <div
      class="text-[28px] !leading-[120%]"
      :class="{ 'text-red': errorTitle }"
    >
      {{ errorTitle ?? "Registration" }}
    </div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.email"
        placeholder="Enter your email"
        type="email"
        title="Email"
        :error-message="errors.email"
      />

      <AppInput
        v-model="form.login"
        placeholder="Enter your login"
        type="text"
        title="Login"
        :error-message="errors.login"
      />
    </div>
    <div class="w-full flex flex-col gap-6">
      <AppButton size="lg" class="w-full !max-w-full">Sign Up</AppButton>
      <div
        class="flex items-center gap-1 justify-center text-gray-text text-base !leading-[150%]"
      >
        <div>Already have an account?</div>
        <div @click="emit('login')" class="text-primary cursor-pointer">
          Log in
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from "./ui/AppInput.vue";
import { getLocalizedValue } from "~/utils";

const errorTitle = ref(null);
const form = ref<{
  email: string;
  login: string;
}>({
  email: "",
  login: "",
});
const errors = ref<{
  email: string | null;
  login: string | null;
}>({
  email: null,
  login: null,
});

const emit = defineEmits<{
  login: [];
  confirm: [];
}>();

const auth = useAuthStore();

async function handleRegister() {
  errorTitle.value = null;
  errors.value = {
    email: null,
    login: null,
  };

  const { data, error } = await auth.register(form.value);
  if (error.value) {
  }

  if (error?.value?.statusCode === 400) {
    if (error.value.data.error) {
      errorTitle.value = getLocalizedValue(error.value.data.error);
    }

    error.value?.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }

  if (data.value?.success === true) {
    auth.confirmEmail = form.value.email;
    emit("confirm");
  }
}
</script>

<style scoped></style>
