<template>
  <form
    @submit.prevent="handleLogin"
    class="flex flex-col gap-10 h-full w-full"
  >
    <div class="text-[28px] !leading-[120%]">Authorization</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.email"
        placeholder="Enter your email"
        type="email"
        title="Email"
        :error-message="errors.email"
      />

      <div class="flex flex-col gap-2">
        <AppInput
          v-model="form.password"
          placeholder="Enter your password"
          type="password"
          title="Password"
          :error-message="errors.password"
        />
        <div
          class="text-gray-text text-right cursor-pointer"
          @click="emit('recovery')"
        >
          Forgot Password?
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col gap-6">
      <AppButton size="lg" type="submit" class="w-full !max-w-full"
        >Sign In</AppButton
      >
      <div
        class="flex items-center gap-1 justify-center text-gray-text text-base !leading-[150%]"
      >
        <div>Don't have an account?</div>
        <div @click="emit('register')" class="text-primary cursor-pointer">
          Register now
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from "./ui/AppInput.vue";

const form = ref<{
  email: string;
  password: string;
}>({
  email: "",
  password: "",
});
const errors = ref<{
  email: string | null;
  password: string | null;
}>({
  email: null,
  password: null,
});

const emit = defineEmits<{
  recovery: [];
  register: [];
  close: [];
  apply: [value: { email: string; password: string }];
}>();

const auth = useAuthStore();
async function handleLogin() {
  errors.value = {
    email: null,
    login: null,
  };

  const { data, error } = await auth.login(form.value);

  if (error?.value?.statusCode === 400) {
    error.value?.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }

  if (data?.value?.data?.me.id > 0) {
    emit("close");
  }
}
</script>

<style scoped></style>
