<template>
  <el-config-provider>
    <div class="app_container">
      <!-- <VantaBackEffect></VantaBackEffect> -->
      <!-- <BackEarth></BackEarth>  -->
      <router-view v-if="refreshRouter" />
    </div>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ref, nextTick, provide } from "vue";
  import { useWindowResize } from "@/hooks/useWindowSize";

  import { ElConfigProvider } from "element-plus";

  // import VantaBackEffect from "@/components/common/VantaBackEffect.vue";
  // import BackEarth from "@/components/common/BackEarth.vue";

  useWindowResize();

  const refreshRouter = ref(true);
  function reloadApp() {
    refreshRouter.value = false;
    nextTick(() => {
      refreshRouter.value = true;
    });
  }

  provide("reloadApp", reloadApp);
</script>

<style scoped>
  .app_container {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: scroll;
  }

  .app_container::-webkit-scrollbar {
    display: none;
  }
</style>
