import { nanoid } from "@/utils/common/nanoid";
import CssNamePixel from "./NamePixel";

export class CssBasicCombineInput {
  public id = "css_basic_combine_" + nanoid(10);
  public name = "basic";
  public title = "basic";

  public vueStyleName = "";

  public labelZh = "基础样式";
  public labelEn = "basic";
  public description = "";
  public descriptionZh = "";

  public type = "cssCombineValues";

  public tag = "";
  public _value = "";

  public properties = undefined;

  public isRequired = false;
  public isEnable = true;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "css_checked_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.vueStyleName) {
      this.vueStyleName = options.vueStyleName;
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

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.properties) {
      this.properties = options.properties;
    }

    this._value = options.value ?? false;

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
  }

  getStyle(model = "vue", isPxToRem = false) {
    if (this.properties) {
      const keys = Object.keys(this.properties);
      let styleRes = "";
      if (keys && keys.length) {
        for (let i = 0; i < keys.length; i++) {
          const prop = this.properties[keys[i]];
          let style = "";
          if (prop instanceof CssNamePixel) {
            style = prop.getStyle(model, isPxToRem);
          } else {
            style = prop.getStyle(model);
          }

          if (style) {
            styleRes = styleRes + style + "; ";
          }
        }
      }

      return styleRes;
    }

    return "";
  }

  getStyleName(model = "vue") {
    return "";
  }

  getStyleValue() {
    return "";
  }

  getClass(isPxToRem = false) {
    if (this.properties) {
      const keys = Object.keys(this.properties);
      const styleRes = [];
      if (keys && keys.length) {
        for (let i = 0; i < keys.length; i++) {
          const prop = this.properties[keys[i]];
          let style = "";
          if (prop instanceof CssNamePixel) {
            style = prop.getClass(isPxToRem);
          } else {
            style = prop.getClass();
          }

          if (style) {
            styleRes.push(style);
          }
        }
      }

      return styleRes;
    }

    return "";
  }

  getClassName() {
    return "";
  }
}

export class CssBorderCombineInput {
  public id = "css_Border_combine_" + nanoid(10);
  public name = "Border";
  public title = "Border";

  public vueStyleName = "";

  public labelZh = "边框";
  public labelEn = "border";
  public description = "";
  public descriptionZh = "";

  public type = "";
  public componentType = "";
  public componentProps = "";
  public tag = "";
  public h5Tag = "";

  public properties = undefined;

  public isRequired = false;
  public isEnable = true;

  public isUsed = true;
  public isShowUsed = true;
  public isExpand = true;
  public isLocked = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "css_Border_combine_" + options.name + "_" + nanoid(10);
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

    if (options.properties) {
      this.properties = options.properties;
    }

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
    this.isLocked = options.isLocked ?? false;
  }

  getStyle(model = "vue", isPxToRem = false) {}

  getStyleName(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    return name;
  }

  getStyleValue() {}

  getClass(isPxToRem = false) {}

  getClassName() {
    return this.name;
  }
}
