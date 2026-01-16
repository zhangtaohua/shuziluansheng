import { nanoid } from "@/utils/common/nanoid";
import { cssDataType } from "./globalCss";

export class CssPureOptionsInput {
  public id = "css_pure_options_" + nanoid(10);
  public name = "pure-options";
  public title = "pure-options";

  public vueStyleName = "pureOptions";
  public cssStyleName = "pure-options";

  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public description = "";
  public descriptionZh = "";

  public type = cssDataType.pureValue;

  public tag = "OptionsInput";
  public _value = "";

  public properties = undefined;

  public options = [];
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

    if (options.cssStyleName) {
      this.cssStyleName = options.cssStyleName;
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

    if (options.options) {
      this.options = options.options;
    }

    this._value = options.value ?? "";

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  getStyle(model = "vue") {
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    return `"${name}": "${this.value}"`;
  }

  getStyleName(model = "vue") {
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    return name;
  }

  getStyleValue() {
    return this.value;
  }

  getClass() {
    return `${this.cssStyleName}: ${this.value}`;
  }

  getClassName() {
    return this.cssStyleName;
  }
}

export default CssPureOptionsInput;
