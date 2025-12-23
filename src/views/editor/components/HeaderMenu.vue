<template>
  <div class="row_nw_fs_ce header_menu_container">
    <el-menu class="header_menu_box" mode="horizontal" :ellipsis="false" @select="handleSelect">
      <el-sub-menu class="header_submenu_box" index="menu_actions">
        <template #title>
          <el-icon class="header_menu_micon"><Menu /></el-icon>
        </template>
        <el-menu-item index="ma_import_json">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <FileBraces class="header_menu_itemiconlucide" />
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">导入 JSON</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_export_json">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">导出 JSON</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_export_project">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">导出 PROJECT</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_export_image">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">生成图片</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_preview">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">预览</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_clear_component">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">清空</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_save">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">保存</div>
          </div>
        </el-menu-item>
        <el-menu-item index="ma_setting">
          <div class="row_nw_fs_ce header_menu_itembox">
            <div class="row_nw_ce_ce header_menu_itemiconbox">
              <el-icon class="header_menu_itemicon"><Menu /></el-icon>
            </div>
            <div class="row_nw_ce_ce header_menu_itemlabel">设置</div>
          </div>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, watch, onUnmounted } from "vue";
  import { useSystemConfigStore } from "@/stores/systemConfig";
  import { useEditorConfigStore, globalEditor } from "@/stores/editorConfig";

  import { FileBraces } from "lucide-vue-next";

  const activeIndex = ref("");

  const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath);
  };
</script>

<style scoped>
  .header_menu_container {
    width: max-content;
    height: 100%;
    margin-right: 0.25rem;
  }

  .header_menu_micon {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }

  .header_menu_itembox {
    width: auto;
    height: auto;
  }

  .header_menu_itemiconbox {
    width: auto;
    height: auto;
    margin-right: 0.5rem;
  }

  .header_menu_itemicon {
    font-size: 1rem;
  }

  .header_menu_itemiconlucide {
    width: 1rem;
    height: 1rem;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    outline: none;
    border: none;
  }

  :deep(.header_menu_box .el-menu-item:hover .header_menu_itemiconlucide) {
    color: var(--el-color-primary);
  }

  :deep(.header_menu_box .el-sub-menu .el-sub-menu__icon-arrow) {
    font-size: 1rem;
    color: rgba(255, 255, 255, 1);
  }

  :deep(.header_menu_box:hover .el-sub-menu .el-sub-menu__icon-arrow) {
    font-size: 1rem;
    color: rgba(255, 255, 255, 1) !important;
  }

  :deep(.header_submenu_box .el-menu--horizontal .el-menu--popup-container) {
    border: none;
    outline: none;
  }

  :deep(.header_submenu_box .el-popper) {
    border: none;
    outline: none;
  }

  :deep(.header_submenu_box .el-menu--popup) {
    border: none;
    outline: none;
    box-shadow: none;
  }
</style>
