import { reactive } from "vue";
import { defineStore } from "pinia";
import Storage from "@/utils/storage/storage";

const EDITOR_CONFIG_KEY = "EDITOR_CONFIG_KEY";

export const globalEditor = {
  editor: null,
  stage: null,
  layer: null,
  components: null,
};

export const editorConfigurations = {
  grid: {
    isShow: false,
    gapX: 10,
    gapY: 10,
  },
};

// Splicing magic characters
export const SMC = "###";

export function getComponentPath(id: string) {
  // const ckeys = Object.keys(components);
  // for (let i = 0; i < ckeys.length; i++) {
  //   const key = ckeys[i];
  //   const ctemp = components[key];
  // }
  return id.split(SMC);
}

export function getParentComponentTransforms(components: any, parentId: string, skipLeaf = false) {
  const parentPath = parentId.split(SMC);
  const trans = [];
  if (parentPath.length) {
    let comp = components;
    const length = skipLeaf ? parentPath.length - 1 : parentPath.length;
    let key = "";
    for (let i = 0; i < length; i++) {
      if (i == 0) {
        key = parentPath[i];
        comp = comp[key];
        if (comp) {
          trans.push({
            ...comp.transform,
          });
        }
      } else {
        if (comp.children) {
          key = key + SMC + parentPath[i];
          comp = comp.children[key];
          if (comp) {
            trans.push({
              ...comp.transform,
            });
          }
        } else {
          break;
        }
      }
    }
  }
  return trans;
}

export function getParentComponent(components: any, parentId: string, skipLeaf = false) {
  const parentPath = parentId.split(SMC);
  console.log("parentPath", parentPath);
  if (parentPath.length) {
    let comp = components;
    const length = skipLeaf ? parentPath.length - 1 : parentPath.length;
    let key = "";
    for (let i = 0; i < length; i++) {
      if (i == 0) {
        key = parentPath[i];
        comp = comp[key];
      } else {
        if (comp.children) {
          key = key + SMC + parentPath[i];
          comp = comp.children[key];
        } else {
          break;
        }
      }

      console.log("parentPath key", key, comp);
    }
    return comp;
  }
  return null;
}

export const getEditorStore = () => {
  let initEditorConfig = Storage.get(EDITOR_CONFIG_KEY);
  if (!initEditorConfig) {
    initEditorConfig = editorConfigurations;
    Storage.set(EDITOR_CONFIG_KEY, initEditorConfig);
  }
  if (typeof initEditorConfig === "string") {
    try {
      initEditorConfig = JSON.parse(initEditorConfig);
    } catch (error) {
      initEditorConfig = editorConfigurations;
    }
  }

  return initEditorConfig;
};

export const useEditorConfigStore = defineStore("useEditorConfigStore", () => {
  const initEditorConfig = getEditorStore();

  const editorConfig = reactive({
    grid: {
      ...initEditorConfig.grid,
    },
    currentParentComp: null,
    currentShapeOptions: null,
    refreshCompToShapeFlag: 0,
    refreshShapeToCompFlag: 0,
    components: {},
  });

  function setEditorIsShowGrid(isShow: boolean) {
    editorConfig.grid.isShow = isShow;

    initEditorConfig.grid.isShow = isShow;
    Storage.set(EDITOR_CONFIG_KEY, initEditorConfig);
  }

  function setEditorGridGapX(x: number) {
    editorConfig.grid.gapX = x;

    initEditorConfig.grid.gapX = x;
    Storage.set(EDITOR_CONFIG_KEY, initEditorConfig);
  }

  function setEditorGridGapY(y: number) {
    editorConfig.grid.gapY = y;

    initEditorConfig.grid.gapY = y;
    Storage.set(EDITOR_CONFIG_KEY, initEditorConfig);
  }

  function setEditorGridGap(gap: number[] | { x: 0; y: 0 }) {
    if (Array.isArray(gap)) {
      editorConfig.grid.gapX = gap[0];
      editorConfig.grid.gapY = gap[1];

      initEditorConfig.grid.gapX = gap[0];
      initEditorConfig.grid.gapY = gap[1];
    } else {
      editorConfig.grid.gapX = gap.x;
      editorConfig.grid.gapY = gap.y;

      initEditorConfig.grid.gapX = gap.x;
      initEditorConfig.grid.gapY = gap.y;
    }
    Storage.set(EDITOR_CONFIG_KEY, initEditorConfig);
  }

  function setEditorCurrentShape(options: any) {
    editorConfig.currentShapeOptions = options;
  }

  function setEditorRefreshComp() {
    editorConfig.refreshShapeToCompFlag++;
  }

  function setEditorRefreshShape() {
    editorConfig.refreshCompToShapeFlag++;
  }

  function setEditorCurrentParentComp(options: any) {
    editorConfig.currentParentComp = options;
  }

  function addEditorComponents(options: any) {
    if (editorConfig.currentParentComp) {
      const parentId = editorConfig.currentParentComp.id;
      console.log("增加 寻找父组件ID", parentId);
      const parentComp = getParentComponent(editorConfig.components, parentId);
      if (parentComp) {
        console.log("增加 找到父组件", parentComp);
        let id = options.id;
        id = parentId + SMC + id;
        options.id = id;

        if (parentComp.children) {
          parentComp.children[id] = options;
        } else {
          parentComp.children = {};
          parentComp.children[id] = options;
        }
      } else {
        console.log("增加 未找到父组件，增加到根目录下");
        const id = options.id;
        editorConfig.components[id] = options;
      }
    } else {
      // 无父组件，直接增加
      const id = options.id;
      editorConfig.components[id] = options;
    }

    // 全局记录的直接增加
    const id = options.id;
    if (globalEditor.components) {
      globalEditor.components[id] = options;
    } else {
      globalEditor.components = {};
      globalEditor.components[id] = options;
    }
  }

  function removeEditorComponents(options: any) {
    const id = options.id;
    const parentComp = getParentComponent(editorConfig.components, id, true);
    if (parentComp) {
      console.log("删除 找到父组件", parentComp);
      parentComp[id] = null;
      delete parentComp[id];
    } else {
      console.log("删除 未找到父组件");
      editorConfig.components[id] = null;
      delete editorConfig.components[id];
    }

    // 全局记录的直接删除
    globalEditor.components[id] = null;
    delete globalEditor.components[id];
  }

  function clearEditorComponents() {
    editorConfig.components = {};
    globalEditor.components = {};
  }

  return {
    editorConfig,
    setEditorIsShowGrid,
    setEditorGridGapX,
    setEditorGridGapY,
    setEditorGridGap,
    setEditorCurrentShape,
    setEditorRefreshComp,
    setEditorRefreshShape,
    setEditorCurrentParentComp,
    addEditorComponents,
    removeEditorComponents,
    clearEditorComponents,
  };
});
