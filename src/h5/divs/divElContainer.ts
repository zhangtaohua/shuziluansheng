import { nanoid } from "@/utils/common/nanoid";
import {
  createCssHeightProp,
  createCssLeftProp,
  createCssRotateProp,
  createCssToptProp,
  createCssWidthProp,
  createCssZIndexProp,
} from "../cssProps/cssPixelProps";
import { createCssBackgroundColorProp, createCssColorProp } from "../cssProps/cssColorProps";

export class h5DivCesium {
  public id = "h5_cesium_" + nanoid(10);
  public parentId = "";
  public name = "cesium";
  public title = "cesium";

  public labelZh = "3D地图";
  public labelEn = "cesium";
  public description = "A cesium box";
  public descriptionZh = "";

  public type = "cesium";
  public componentType = "html";
  public componentProps = "h5#div";
  public tag = "CommonDivCesium";
  public h5Tag = "div";

  public children = undefined;

  public isEnable = true;
  public isUsed = true;
  public isShowUsed = true;
  public isExpand = true;
  public isLocked = false;
  public isUseRestrictRect = true;

  public classNames = [];
  public styles = {
    top: createCssToptProp(),
    left: createCssLeftProp(),
    width: createCssWidthProp(),
    height: createCssHeightProp(),
    rotate: createCssRotateProp(),
    zIndex: createCssZIndexProp(),
    backgroundColor: createCssBackgroundColorProp(),
  };
  public restrictRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
  // end styles

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "h5_cesium_" + options.name + "_" + nanoid(10);
    }

    if (options.parentId) {
      this.parentId = options.parentId;
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }

    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
    }

    if (options.type) {
      this.type = options.type;
    }

    if (options.componentType) {
      this.componentType = options.componentType;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.h5Tag) {
      this.h5Tag = options.h5Tag;
    }

    if (options.classNames) {
      this.classNames = options.classNames;
    }

    if (options.classNames) {
      this.classNames = options.classNames;
    }

    if (options.styles) {
      this.styles = options.styles;
    }

    if (options.restrictRect) {
      this.restrictRect = options.restrictRect;
    }

    if (options.width) {
      this.styles.width = createCssWidthProp({
        value: options.width,
      });
    }

    if (options.height) {
      this.styles.height = createCssHeightProp({
        value: options.height,
      });
    }

    if (options.zIndex) {
      this.styles.zIndex = createCssZIndexProp({
        value: options.zIndex,
        min: options.zIndexMin ?? options.zIndex ?? 1,
        max: options.zIndexMax ?? 0,
      });
    }

    if (options.backgroundColor) {
      this.styles.backgroundColor = createCssBackgroundColorProp({
        value: options.backgroundColor,
      });
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
    this.isLocked = options.isLocked ?? false;
    this.isUseRestrictRect = options.isUseRestrictRect ?? true;
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

export default h5DivCesium;
