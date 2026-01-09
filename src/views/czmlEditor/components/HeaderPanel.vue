<template>
  <div class="row_nw_sb_ce header_container">
    <div class="row_nw_fs_ce header_props_box">
      <div v-for="prop in czmlChildProps" :key="prop.id" class="row_nw_ce_ce header_props_title">
        <el-button plain size="small" :disabled="!isCanAddCzmlChildProp" @click="addCzmlChildProp(prop)">
          {{ prop.labelEn }}
        </el-button>
      </div>
    </div>
    <div class="row_nw_ce_ce header_czml_box">
      <el-tooltip class="item" effect="dark" content="添加czml" placement="bottom">
        <el-button type="primary" circle :icon="Coin" @click="addCzmlHd"></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { Coin } from "@element-plus/icons-vue";

  import CzmlDataMaker from "@/czml/schema/packets/maker.ts";
  import { czmlChildProps } from "@/stores/czmlMapDataConfig.ts";
  import { globalCzmlMapData, useCzmlStateStore } from "@/stores/czmlMapDataConfig.ts";
  import czmlBillboardEntity from "@/czml/schema/entities/billboard";
  const { czmlState, setCurrentCzmlData, setCurrentCzmlChildProp } = useCzmlStateStore();

  const isCanAddCzmlChildProp = computed(() => {
    return czmlState.currentCzmlDataId ? true : false;
  });

  function addCzmlHd() {
    const czmlOpt = new CzmlDataMaker({});
    setCurrentCzmlData(czmlOpt);
  }

  function addCzmlChildProp(prop: any) {
    if (isCanAddCzmlChildProp.value) {
      const { id, name } = prop;
      if (id === "billboard") {
        const billboardOpt = new czmlBillboardEntity({
          $ref: "Billboard.json",
          description:
            "A billboard, or viewport-aligned image, sometimes called a marker. The billboard is positioned in the scene by the `position` property.",
        });

        globalCzmlMapData.currentCzmlData.packets[1].properties.billboard = billboardOpt;
        setCurrentCzmlChildProp(billboardOpt);
        console.log(globalCzmlMapData.currentCzmlData);
      }
    }
  }
</script>

<style scoped>
  .header_container {
    width: 100vw;
    height: 3rem;
    background-color: rgba(26, 30, 39, 1);
  }

  .header_props_box {
    width: max-content;
    height: 3rem;
  }

  .header_props_title {
    width: max-content;
    height: 100%;
    margin-right: 0.5rem;
  }

  .header_czml_box {
    width: 3rem;
    height: 3rem;
  }
</style>
