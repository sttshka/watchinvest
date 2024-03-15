<template>
  <div class="range w-full flex flex-1">
    <input
      ref="range"
      class="outline-none text-primary cursor-pointer"
      type="range"
    />
  </div>
</template>

<script lang="ts" setup></script>

<style>
.range input[type="range"] {
  color: #bd9542;
  --thumb-height: 40px;
  --track-height: 2px;
  --track-color: #f0f0f0;
  --thumb-color: #ffffff;
  --brightness-hover: 90%;
  --brightness-down: 80%;
  --clip-edges: 1px;

  position: relative;
  background: #fff0;
  width: 100%;
  overflow: hidden;
}

.range input[type="range"]:active {
  cursor: grabbing;
}

.range input[type="range"]:disabled {
  filter: grayscale(1);
  opacity: 0.3;
  cursor: not-allowed;
}

.range input[type="range"],
.range input[type="range"]::-webkit-slider-runnable-track,
.range input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

.range input[type="range"]::-webkit-slider-runnable-track,
.range input[type="range"]::-webkit-slider-thumb {
  position: relative;
}

.range input[type="range"]::-webkit-slider-thumb {
  --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
  --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
  --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
  --clip-further: calc(100% + 1px);
  --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
    100vmax currentColor;

  width: var(--thumb-width, var(--thumb-height));
  background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
    50% calc(var(--track-height) + 1px);
  background-color: var(--thumb-color);
  border: 1px solid var(--track-color);
  box-shadow: var(--box-fill);
  border-radius: var(--thumb-width, var(--thumb-height));

  filter: brightness(100%);
  clip-path: polygon(
    100% -1px,
    var(--clip-edges) -1px,
    0 var(--clip-top),
    -100vmax var(--clip-top),
    -100vmax var(--clip-bottom),
    0 var(--clip-bottom),
    var(--clip-edges) 100%,
    var(--clip-further) var(--clip-further)
  );

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='https://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_296_29708)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.13006 10.6705L7.17106 7.65453L5.76006 6.23653L0.289062 11.6705L5.76006 17.1035L7.17106 15.6855L4.13006 12.6705L9.28907 12.6705L14.707 12.6705L19.8661 12.6705L16.8251 15.6855L18.2361 17.1035L23.7071 11.6705L18.2361 6.23653L16.8251 7.65452L19.8661 10.6705L14.707 10.6705L14.707 12.6705L9.28907 12.6705L9.28907 10.6705L4.13006 10.6705Z' fill='%2317171B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_296_29708'%3E%3Crect width='22.867' height='24' fill='white' transform='translate(0 23.1035) rotate(-90)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
}

.range input[type="range"]:hover::-webkit-slider-thumb {
  filter: brightness(var(--brightness-hover));
  cursor: grab;
}

.range input[type="range"]:active::-webkit-slider-thumb {
  filter: brightness(var(--brightness-down));
  cursor: grabbing;
}

.range input[type="range"]::-webkit-slider-runnable-track {
  background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
    100% calc(var(--track-height) + 1px);
}

.range input[type="range"]:disabled::-webkit-slider-thumb {
  cursor: not-allowed;
}

/* Firefox */

.range input[type="range"],
.range input[type="range"]::-moz-range-track,
.range input[type="range"]::-moz-range-thumb {
  appearance: none;
  transition: all ease 100ms;
  height: var(--thumb-height);
}

.range input[type="range"]::-moz-range-track,
.range input[type="range"]::-moz-range-thumb,
.range input[type="range"]::-moz-range-progress {
  background: #fff0;
}

.range input[type="range"]::-moz-range-thumb {
  background: var(--thumb-color);
  border: 1px solid var(--track-color);
  width: var(--thumb-width, var(--thumb-height));
  border-radius: var(--thumb-width, var(--thumb-height));
  cursor: grab;

  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='https://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_296_29708)'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.13006 10.6705L7.17106 7.65453L5.76006 6.23653L0.289062 11.6705L5.76006 17.1035L7.17106 15.6855L4.13006 12.6705L9.28907 12.6705L14.707 12.6705L19.8661 12.6705L16.8251 15.6855L18.2361 17.1035L23.7071 11.6705L18.2361 6.23653L16.8251 7.65452L19.8661 10.6705L14.707 10.6705L14.707 12.6705L9.28907 12.6705L9.28907 10.6705L4.13006 10.6705Z' fill='%2317171B'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_296_29708'%3E%3Crect width='22.867' height='24' fill='white' transform='translate(0 23.1035) rotate(-90)'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A");
  background-size: auto;
  background-position: center center;
  background-repeat: no-repeat;
}

.range input[type="range"]:active::-moz-range-thumb {
  cursor: grabbing;
}

.range input[type="range"]::-moz-range-track {
  width: 100%;
  background: var(--track-color);
}

.range input[type="range"]::-moz-range-progress {
  appearance: none;
  background: currentColor;
  transition-delay: 30ms;
}

.range input[type="range"]::-moz-range-track,
.range input[type="range"]::-moz-range-progress {
  height: calc(var(--track-height) + 1px);
  border-radius: var(--track-height);
}

.range input[type="range"]::-moz-range-thumb,
.range input[type="range"]::-moz-range-progress {
  filter: brightness(100%);
}

.range input[type="range"]:hover::-moz-range-thumb,
.range input[type="range"]:hover::-moz-range-progress {
  filter: brightness(var(--brightness-hover));
}

.range input[type="range"]:active::-moz-range-thumb,
.range input[type="range"]:active::-moz-range-progress {
  filter: brightness(var(--brightness-down));
}

.range input[type="range"]:disabled::-moz-range-thumb {
  cursor: not-allowed;
}
</style>
