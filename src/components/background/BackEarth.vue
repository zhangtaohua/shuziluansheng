<template>
  <div class="bg_container">
    <div class="bg_wrapper"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
  .bg_container {
    position: fixed;
    width: 100vw;
    height: 100vh;
    color: transparent;
    z-index: -1;
    background-image: url("@/assets/images/bg.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }

  .bg_wrapper {
    width: 100vw;
    height: 100vh;
    color: transparent;
    background-image: url("@/assets/images/bg_top.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
</style>
