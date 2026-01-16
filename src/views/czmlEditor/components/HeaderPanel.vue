<template>
  <div class="row_nw_ce_ce header_container">
    <div class="col_nw_fs_fs header_options_panel">
      <div class="row_nw_fs_fs header_options_czmlpackbox">
        <div class="col_nw_fs_fs header_opt_czml_box">
          <div class="row_nw_sb_ce header_opt_czml_tbox">
            <div class="row_nw_ce_ce header_opt_czml_title">czmls</div>
            <div class="row_nw_fe_ce header_opt_czmlact">
              <el-tooltip class="item" effect="dark" content="添加czml" placement="bottom">
                <el-button type="primary" circle :icon="Coin" @click="addCzmlHd"></el-button>
              </el-tooltip>
            </div>
          </div>
          <div class="col_nw_fs_fs header_opt_czml_ctxbox">
            <div v-for="item in czmlDatasSelOptions" :key="item.value" class="row_nw_fs_ce header_opt_czml_ctxlabels">
              <el-button
                :type="currentCzmlDataShowId === item.value ? 'success' : 'default'"
                link
                @click="czmlDataChangeHd(item.value)"
              >
                {{ item.label }}
              </el-button>
            </div>
          </div>
        </div>

        <div class="col_nw_fs_fs header_opt_package_box">
          <div class="row_nw_sb_ce header_opt_package_tbox">
            <div class="row_nw_ce_ce header_opt_package_title">packages</div>
            <div class="row_nw_fe_ce header_opt_packageact">
              <el-tooltip class="item" effect="dark" content="添加package" placement="bottom">
                <el-button
                  type="primary"
                  circle
                  :icon="Notebook"
                  @click="addCzmlPackageHd"
                  :disabled="!czmlState.currentCzmlData"
                ></el-button>
              </el-tooltip>
            </div>
          </div>
          <div
            v-if="czmlState.currentCzmlData && czmlState.currentCzmlData.packets"
            class="col_nw_fs_fs header_opt_package_ctxbox"
          >
            <div
              v-for="pack in czmlState.currentCzmlData.packets"
              :key="pack.id"
              class="row_nw_fs_ce header_opt_package_ctxlabels"
            >
              <el-button
                :type="currentCzmlPackageShowId === pack.id ? 'success' : 'default'"
                link
                @click="czmlDataPackageChangeHd(pack)"
              >
                {{ pack.id }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <div class="row_nw_fs_fs header_opt_props_box">
        <div
          v-if="currentCzmlPackageShowId && czmlState.currentCzmlData && czmlState.currentCzmlData.packets"
          class="row_nw_fs_fs header_opt_props_ctxbox"
        >
          <div
            v-for="prop in czmlState.currentCzmlData.packets[currentCzmlPackageShowId].properties"
            :key="prop.id"
            class="row_nw_fs_ce header_opt_props_ctxlabels"
          >
            <el-tooltip placement="bottom" effect="dark">
              <template #content>
                <div class="col_nw_fs_ce header_title_tipbox">
                  <p v-if="prop.descriptionZh" class="header_ch_tiplabel">
                    {{ prop.descriptionZh }}
                  </p>
                  <p class="header_ogi_tiplabel">
                    {{ prop.description }}
                  </p>
                </div>
              </template>
              <el-button
                :type="prop.id === currentCzmlDataPackagePropShowId ? 'success' : 'default'"
                plain
                size="small"
                @click="czmlDataPackagePropChangeHd(prop)"
              >
                {{ prop.czmlName }}
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted, nextTick } from "vue";
  import { Coin, Notebook, Ticket } from "@element-plus/icons-vue";

  import CzmlDataMaker from "@/czml/schema/packets/maker.ts";
  import czmlPacket from "@/czml/schema/packets/packet.ts";
  import { globalCzmlMapData, useCzmlStateStore } from "@/stores/czmlMapDataConfig.ts";
  const { czmlState, setCzmlDatas, setCurrentCzmlData, setCurrentCzmlDataPackageId, setCurrentCzmlDataPackageProp } =
    useCzmlStateStore();

  const emit = defineEmits(["tabChange"]);

  const currentCzmlDataShowId = ref("");
  const currentCzmlPackageShowId = ref("");
  const currentCzmlDataPackagePropShowId = ref("");

  const czmlDatasSelOptions = computed(() => {
    if (czmlState.czmlDatasRefresh) {
      const opt = [];
      globalCzmlMapData.czmlDatas.forEach((item) => {
        console.log("czmlData", item);
        opt.push({
          value: item.id,
          label: item.id,
        });
      });
      return opt;
    } else {
      return [];
    }
  });

  function addCzmlHd() {
    const czmlOpt = new CzmlDataMaker(null);
    setCzmlDatas(czmlOpt);
    setCurrentCzmlData(czmlOpt);
    currentCzmlDataShowId.value = czmlOpt.id;
    const packageKeys = Object.keys(czmlOpt.packets);
    if (packageKeys.length > 0) {
      const packageOpt = czmlOpt.packets[packageKeys[0]];
      const id = packageOpt.id;
      currentCzmlPackageShowId.value = id;
      setCurrentCzmlDataPackageId(id);

      setCurrentCzmlDataPackagePropLocal(packageOpt);
    }
  }

  function czmlDataChangeHd(id: string) {
    currentCzmlDataShowId.value = id;
    const data = globalCzmlMapData.czmlDatas.get(currentCzmlDataShowId.value);
    setCurrentCzmlData(data);
    const packageKeys = Object.keys(data.packets);
    if (packageKeys.length > 0) {
      const packageOpt = data.packets[packageKeys[0]];
      const id = packageOpt.id;
      currentCzmlPackageShowId.value = id;
      setCurrentCzmlDataPackageId(id);

      setCurrentCzmlDataPackagePropLocal(packageOpt);
    }
  }

  function addCzmlPackageHd() {
    if (!czmlState.currentCzmlData) {
      return;
    }
    const packageOpt = new czmlPacket();
    czmlState.currentCzmlData.addPacket(packageOpt);
    currentCzmlPackageShowId.value = packageOpt.id;
    setCurrentCzmlDataPackageId(packageOpt.id);

    setCurrentCzmlDataPackagePropLocal(packageOpt);
  }

  function czmlDataPackageChangeHd(pack: any) {
    currentCzmlPackageShowId.value = pack.id;
    setCurrentCzmlDataPackageId(pack.id);

    setCurrentCzmlDataPackagePropLocal(pack);
  }

  function setCurrentCzmlDataPackagePropLocal(pack: any) {
    if (pack.properties) {
      const propKeys = Object.keys(pack.properties);
      if (propKeys.length > 0) {
        const prop = pack.properties[propKeys[0]];
        setCurrentCzmlDataPackageProp(null);
        nextTick(() => {
          setCurrentCzmlDataPackageProp(prop);
          currentCzmlDataPackagePropShowId.value = prop.id;
          emit("tabChange");
        });
      }
    }
  }

  function czmlDataPackagePropChangeHd(prop: any) {
    setCurrentCzmlDataPackageProp(null);
    nextTick(() => {
      setCurrentCzmlDataPackageProp(prop);
      currentCzmlDataPackagePropShowId.value = prop.id;
      emit("tabChange");
    });
  }
</script>

<style scoped>
  .header_container {
    width: 100%;
    height: auto;
    margin-bottom: 0.75rem;
  }

  .header_options_panel {
    width: 100%;
    height: auto;
  }

  .header_options_czmlpackbox {
    width: 100%;
    height: auto;
    margin-bottom: 0.5rem;
  }

  .header_opt_czml_box {
    width: max-content;
    min-width: 10rem;
    height: 100%;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 1.25rem;
  }

  .header_opt_czml_tbox {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .header_opt_czml_title {
    width: max-content;
    height: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }

  .header_opt_czmlact {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
  }

  .header_opt_czml_ctxbox {
    width: max-content;
    height: auto;
  }

  .header_opt_czml_ctxlabels {
    width: max-content;
    height: 2rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 1);
    padding-right: 0.75rem;
  }

  .header_opt_package_box {
    width: max-content;
    min-width: 10rem;
    height: 100%;
  }

  .header_opt_package_tbox {
    width: 100%;
    height: 2rem;
    margin-bottom: 0.5rem;
  }

  .header_opt_package_title {
    width: max-content;
    height: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }

  .header_opt_packageact {
    width: 2rem;
    height: 2rem;
    margin-right: 0.75rem;
  }

  .header_opt_package_ctxbox {
    width: max-content;
    height: auto;
  }

  .header_opt_package_ctxlabels {
    width: max-content;
    height: 2rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 1);
    padding-right: 0.75rem;
  }

  .header_opt_props_box {
    width: 100%;
    min-width: 10rem;
    height: auto;
  }

  .header_opt_props_tbox {
    width: 100%;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .header_opt_props_title {
    width: max-content;
    height: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
  }

  .header_opt_props_ctxbox {
    width: 100%;
    height: auto;
    flex-wrap: wrap;
  }

  .header_opt_props_ctxlabels {
    width: max-content;
    height: 1.5rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 1);
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .header_title_tipbox {
    width: auto;
    max-width: 30rem;
    height: auto;
  }

  .header_ch_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 500;
    margin-bottom: 0.25rem;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }

  .header_ogi_tiplabel {
    width: 100%;
    height: 100%;
    color: rgba(0, 0, 0, 1);
    font-size: var(--czml-fs-tipvalue);
    font-weight: 400;
    line-height: 1rem;
    word-wrap: break-word;
    word-break: break-all;
  }
</style>
