<template>
  <div class="row_nw_ce_ce ld_act_pop_container" @click.stop.prevent>
    <div class="row_nw_ce_ce ld_act_image_box">
      <div class="row_nw_ce_ce ld_act_cancel_btn" @click.stop.prevent="cancelLabel">
        <img src="@/assets/images/icons/cha@2x.png" alt="cancel" class="ld_act_cancel_bimg" />
      </div>
      <div
        class="row_nw_ce_ce ld_act_confirm_btn"
        :class="{ ld_act_confirm_actbtn: isCanSubmit }"
        @click="confirmLabel"
      >
        <img src="@/assets/images/icons/gou@2x.png" alt="confirm" class="ld_act_confirm_bimg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue";
  import { useCzmlMapDataConfigStore, globalCzmlMapData, MapDrawPointAction } from "@/stores/czmlMapDataConfig";

  const { setCzmlMapIsConfirmDrawData } = useCzmlMapDataConfigStore();

  const isCanSubmit = computed(() => {
    return true;
  });

  const cancelLabel = () => {
    setCzmlMapIsConfirmDrawData(false);
  };

  const confirmLabel = () => {
    if (isCanSubmit.value) {
      setCzmlMapIsConfirmDrawData(true);
    }
  };
</script>

<style scoped lang="scss">
  .ld_act_pop_container {
    position: fixed;
    width: 5rem;
    height: 2rem;
    z-index: 1000;
  }

  .ld_act_image_box {
    width: 100%;
    height: 2rem;
  }

  .ld_act_cancel_btn {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
    cursor: pointer;
  }

  .ld_act_cancel_bimg {
    width: 100%;
    height: 100%;
  }

  .ld_act_confirm_btn {
    width: 2rem;
    height: 2rem;
    cursor: not-allowed;
  }

  .ld_act_confirm_actbtn {
    cursor: pointer;
  }

  .ld_act_confirm_bimg {
    width: 100%;
    height: 100%;
  }
</style>
