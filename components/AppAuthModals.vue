<template>
  <Teleport to="body">
    <AppModal
      v-model="pageStore.modal.authorization"
      @close="pageStore.toggleModal('authorization', false)"
    >
      <AppLogin
        @recovery="openRecovery"
        @register="openRegister"
        @close="pageStore.toggleModal('authorization', false)"
      />
    </AppModal>

    <AppModal
      v-model="pageStore.modal.registration"
      @close="pageStore.toggleModal('registration', false)"
    >
      <AppRegistration @login="openLogin" @confirm="openConfirm" />
    </AppModal>

    <AppModal
      v-model="pageStore.modal.passwordConfirm"
      @close="pageStore.toggleModal('passwordConfirm', false)"
    >
      <AppConfirm @close="pageStore.toggleModal('passwordConfirm', false)" />
    </AppModal>

    <AppModal
      v-model="pageStore.modal.recovery"
      @close="pageStore.toggleModal('recovery', false)"
    >
      <AppRecovery @login="openLogin" @confirm="openConfirm" />
    </AppModal>
  </Teleport>
</template>

<script setup lang="ts">
import AppModal from "~/components/AppModal.vue";
import AppLogin from "./AppLogin.vue";
import AppRegistration from "./AppRegistration.vue";
import AppRecovery from "./AppRecovery.vue";
import AppConfirm from "./AppConfirm.vue";

const pageStore = usePageStore();

function openRecovery() {
  pageStore.closeModals();
  pageStore.toggleModal("recovery", true);
}
function openRegister() {
  pageStore.closeModals();
  pageStore.toggleModal("registration", true);
}

function openConfirm() {
  pageStore.closeModals();
  pageStore.toggleModal("passwordConfirm", true);
}

function openLogin() {
  pageStore.closeModals();
  pageStore.toggleModal("authorization", true);
}

function openRecoveryDone() {
  pageStore.closeModals();
  pageStore.toggleModal("recoveryDone", true);
}
</script>

<style scoped></style>
