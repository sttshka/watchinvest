<template>
  <form
    @submit.prevent="handleRecovery"
    class="flex flex-col gap-10 h-full w-full"
  >
    <div class="text-[28px] !leading-[120%]">Password Recovery</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.email"
        placeholder="Enter your email"
        type="email"
        title="Email"
      />
    </div>
    <div class="w-full flex flex-col gap-6">
      <AppButton size="lg" class="w-full !max-w-full"
        >Recover Password
      </AppButton>
      <div
        class="flex items-center gap-1 justify-center text-gray-text text-base !leading-[150%]"
      >
        <div>Remember your password now?</div>
        <div @click="emit('login')" class="text-primary cursor-pointer">
          Log in
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import AppInput from "./ui/AppInput.vue";

const emit = defineEmits<{
  login: [];
  confirm: [];
  close: [];
}>();

const form = ref<{ email: string }>({
  email: "",
});

const auth = useAuthStore();
async function handleRecovery() {
  const { data, error } = await auth.recover(form.value);

  if (data.value?.success === true) {
    auth.confirmEmail = form.value.email;
    emit("confirm");
  }
}
</script>

<style scoped></style>
