<template>
  <el-dialog v-model="createWorkSpaceDialogVisible" title="创建工作区" width="500">
    <el-form :model="workSpaceForm">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="workSpaceForm.name" autocomplete="off" />
      </el-form-item>

      <el-form-item label="宽度" :label-width="formLabelWidth">
        <el-input v-model="workSpaceForm.width" autocomplete="off" type="number" />
      </el-form-item>

      <el-form-item label="高度" :label-width="formLabelWidth">
        <el-input v-model="workSpaceForm.height" autocomplete="off" type="number" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelCreateWsHd">取消</el-button>
        <el-button type="primary" @click="confirmCreateWsHd">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
  import { ref, reactive } from "vue";

  import { nanoid } from "@/utils/common/nanoid";
  import { gerRandomRgbaColor } from "@/utils/common/colors";

  import { useEditorComponentstore, globalEditor, SMC } from "@/stores/editorConfig";

  import h5DivContainer from "@/h5/divs/divContainer";
  import h5DivText from "@/h5/divs/divText";
  import workspaceContainer from "@/h5/divs/workSpackeContainer";

  const { editorComponents, setEditorCurrentComp, setEditorWorkSpace, addEditorComponents } = useEditorComponentstore();

  const formLabelWidth = "140px";

  const workSpaceForm = reactive({
    name: "test",
    width: 1920,
    height: 1080,
  });

  const createWorkSpaceDialogVisible = ref(true);

  const cancelCreateWsHd = () => {
    createWorkSpaceDialogVisible.value = false;
  };

  const confirmCreateWsHd = () => {
    console.log("create workspace", workSpaceForm);
    const ws = new workspaceContainer({
      width: +workSpaceForm.width,
      height: +workSpaceForm.height,
    });
    setEditorWorkSpace(ws);
    setEditorCurrentComp(ws);
    createWorkSpaceDialogVisible.value = false;
  };

  const workSpaceOptions = {
    id: "workSpace",
    labelZh: "工作区",
    labelEn: "work space",
    icon: "",
    isOnlyShowIcon: false,
    action: () => {
      createWorkSpaceDialogVisible.value = true;
    },
  };

  const divOptions = {
    id: "div",
    labelZh: "空盒子",
    labelEn: "div",
    icon: "",
    isOnlyShowIcon: false,
    action: () => {
      console.log("adddiv", editorComponents.currentComp);
      const restrictRect = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      };
      let zIndex = 2;
      let zIndexMin = 2;
      // const zIndexMax = -999;
      const zIndexMax = 300;
      let parentId = "";
      let id = "";
      let width = 0;
      let height = 0;
      if (editorComponents.currentComp) {
        const cc = editorComponents.currentComp;
        const workSpace = globalEditor.workSpace;
        restrictRect.top = cc.styles.top.value;
        restrictRect.left = cc.styles.left.value;
        restrictRect.right = cc.styles.left.value + cc.styles.width.value;
        restrictRect.bottom = cc.styles.top.value + cc.styles.height.value;

        zIndex = +cc.styles.zIndex.value + 1;
        zIndexMin = zIndex;

        // RJTODO
        // 以下是想获得最大值 ,但好像是没有必要的
        // const childComps = cc.children;
        // if (childComps) {
        //   const keys = Object.keys(childComps);
        //   for (let i = 0; i < keys.length; i++) {
        //     const childKey = keys[i];
        //     const child = childComps[childKey];
        //     const czIndex = child.styles.zIndex;
        //     if (czIndex) {
        //       if (zIndexMax < czIndex.value) {
        //         zIndexMax = czIndex.value;
        //       }
        //     }
        //   }
        // }

        // if (zIndexMax < 0) {
        //   zIndexMax = 0;
        // } else {
        //   zIndexMax = zIndexMax + 20;
        // }

        width = cc.styles.width.value * 0.25;
        height = cc.styles.height.value * 0.25;
        if (cc.type == "h5") {
          restrictRect.top = restrictRect.top + workSpace.top;
          restrictRect.left = restrictRect.left + workSpace.left;
          restrictRect.right = restrictRect.right + workSpace.left;
          restrictRect.bottom = restrictRect.bottom + workSpace.top;

          parentId = cc.id;
          id = parentId + SMC + `h5_div_` + nanoid(10);
        }
      }

      console.log("addID", parentId, id);

      const newDivComp = new h5DivContainer({
        id,
        parentId,
        width,
        height,
        zIndex,
        zIndexMin,
        zIndexMax,
        restrictRect,
        backgroundColor: gerRandomRgbaColor(),
      });
      addEditorComponents(newDivComp);
      setEditorCurrentComp(newDivComp);
    },
  };

  const divTextOptions = {
    id: "divText",
    labelZh: "文本",
    labelEn: "Text",
    icon: "",
    isOnlyShowIcon: false,
    action: () => {
      console.log("add text", editorComponents.currentComp);
      const restrictRect = {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      };
      let zIndex = 2;
      let zIndexMin = 2;
      // const zIndexMax = -999;
      const zIndexMax = 300;
      let parentId = "";
      let id = "";
      let width = 0;
      let height = 0;
      if (editorComponents.currentComp) {
        const cc = editorComponents.currentComp;
        const workSpace = globalEditor.workSpace;
        restrictRect.top = cc.styles.top.value;
        restrictRect.left = cc.styles.left.value;
        restrictRect.right = cc.styles.left.value + cc.styles.width.value;
        restrictRect.bottom = cc.styles.top.value + cc.styles.height.value;

        zIndex = +cc.styles.zIndex.value + 1;
        zIndexMin = zIndex;

        width = cc.styles.width.value * 0.25;
        height = cc.styles.height.value * 0.25;
        if (cc.type == "h5") {
          restrictRect.top = restrictRect.top + workSpace.top;
          restrictRect.left = restrictRect.left + workSpace.left;
          restrictRect.right = restrictRect.right + workSpace.left;
          restrictRect.bottom = restrictRect.bottom + workSpace.top;

          parentId = cc.id;
          id = parentId + SMC + `h5_text_` + nanoid(10);
        }
      }

      const newDivComp = new h5DivText({
        id,
        parentId,
        width,
        height,
        zIndex,
        zIndexMin,
        zIndexMax,
        restrictRect,
        backgroundColor: gerRandomRgbaColor(),
      });
      addEditorComponents(newDivComp);
      setEditorCurrentComp(newDivComp);
    },
  };

  defineExpose({
    workSpaceOptions,
    divOptions,
    divTextOptions,
  });
</script>

<style scoped></style>
