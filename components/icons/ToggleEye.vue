<template>
  <svg
    v-if="modelValue"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12.0946 12.4141C10.7629 12.4141 9.68359 13.4931 9.68359 14.8261C9.68359 16.1578 10.7628 17.2371 12.0946 17.2371C13.4267 17.2371 14.5066 16.1575 14.5066 14.8261C14.5066 13.4934 13.4265 12.4141 12.0946 12.4141ZM8.18359 14.8261C8.18359 12.665 9.93422 10.9141 12.0946 10.9141C14.2546 10.9141 16.0066 12.6647 16.0066 14.8261C16.0066 16.9866 14.2545 18.7371 12.0946 18.7371C9.93438 18.7371 8.18359 16.9863 8.18359 14.8261Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.16948 14.5035C4.2245 10.1775 7.93595 7.47244 12.0949 7.4707C12.0962 7.4707 12.0975 7.4707 12.0989 7.4707V8.9707C12.0982 8.9707 12.0975 8.9707 12.0969 8.9707C12.0962 8.9707 12.0955 8.9707 12.0949 8.9707M12.0969 8.9707C15.5515 8.97157 18.8035 11.2191 20.6694 15.1471L20.9912 15.8245L22.3461 15.1809L22.0243 14.5035C19.9693 10.1775 16.2578 7.47244 12.0989 7.4707M12.0969 8.9707C8.64226 8.97157 5.39033 11.2191 3.52437 15.1471L3.20256 15.8245L1.84766 15.1809L2.16948 14.5035"
      fill="currentColor"
    />
  </svg>

  <svg
    v-else
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="https://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.32182 8.83255C4.37684 13.1585 8.08829 15.8636 12.2473 15.8653C12.2486 15.8653 12.25 15.8653 12.2513 15.8653V14.3653C12.2506 14.3653 12.25 14.3653 12.2493 14.3653C12.2486 14.3653 12.248 14.3653 12.2473 14.3653M12.2493 14.3653C15.704 14.3644 18.9559 12.1169 20.8218 8.18892L21.1437 7.51147L22.4986 8.1551L22.1767 8.83255C20.1217 13.1585 16.4103 15.8636 12.2513 15.8653M12.2493 14.3653C8.7946 14.3644 5.54267 12.1169 3.67671 8.18892L3.3549 7.51147L2 8.1551L2.32182 8.83255"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18.8379 11.3188L22.0097 14.4906L20.949 15.5512L17.7773 12.3794L18.8379 11.3188Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.58193 11.3188L2.41016 14.4906L3.47082 15.5512L6.64259 12.3794L5.58193 11.3188Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.0929 13.8579L16.3555 18.208L14.915 18.6262L13.6523 14.2761L15.0929 13.8579Z"
      fill="currentColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.32514 13.8584L8.0625 18.2085L9.50305 18.6266L10.7657 14.2765L9.32514 13.8584Z"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();
</script>

<style scoped></style>
