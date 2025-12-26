import { nanoid } from "@/utils/common/nanoid";
import {
  createCssHeightProp,
  createCssLeftProp,
  createCssRotateProp,
  createCssToptProp,
  createCssWidthProp,
  createCssZIndexProp,
} from "../cssProps/cssPixelProps";
import { createCssBackgroundColorProp } from "../cssProps/cssColorProps";

import { globalEditor } from "@/stores/editorConfig";

export class workspaceContainer {
  public id = "workspace_" + nanoid(10);
  public parentId = "";
  public name = "workspace";
  public title = "workspace";

  public labelZh = "工作区";
  public labelEn = "work space";
  public description = "A work space";
  public descriptionZh = "工作区";

  public type = "workspace"; // "workspace", "h5", "cesium", "three"
  public componentType = "html";
  public componentProps = "h5#div";
  public tag = "CommonWorkspace";
  public h5Tag = "div";

  public isEnable = true;
  public isUsed = true;
  public isShowUsed = true;
  public isExpand = true;
  public isLocked = true;
  public isUseRestrictRect = true;

  public classNames = [];
  public styles = null;
  public restrictRect = null;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "workspace_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    const workSpace = globalEditor.workSpace;
    this.styles = {
      top: createCssToptProp({
        value: workSpace.top,
      }),
      left: createCssLeftProp({
        value: workSpace.left,
      }),
      width: createCssWidthProp({
        value: workSpace.width,
      }),
      height: createCssHeightProp({
        value: workSpace.height,
      }),
      rotate: createCssRotateProp(),
      zIndex: createCssZIndexProp({
        value: workSpace.zIndex,
      }),
      backgroundColor: createCssBackgroundColorProp({
        value: workSpace.backgroundColor,
      }),
    };

    this.restrictRect = {
      top: workSpace.top,
      left: workSpace.left,
      bottom: workSpace.bottom,
      right: workSpace.right,
    };

    if (options.width) {
      this.styles.width = createCssWidthProp({
        value: options.width,
      });
      this.restrictRect.right = this.restrictRect.left + options.width;
    }

    if (options.height) {
      this.styles.height = createCssHeightProp({
        value: options.height,
      });
      this.restrictRect.bottom = this.restrictRect.top + options.height;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
    this.isLocked = options.isLocked ?? true;
  }

  public getName() {
    if (this.isUsed) {
      return this.name;
    } else {
      return null;
    }
  }

  public getValue() {
    if (this.isUsed) {
      const data = {};

      return data;
    } else {
      return null;
    }
  }

  public getData() {
    if (this.isUsed) {
      return {
        [this.name]: this.getValue(),
      };
    } else {
      return null;
    }
  }
}

export default workspaceContainer;
