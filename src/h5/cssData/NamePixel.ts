import { nanoid } from "@/utils/common/nanoid";
import { cssDataType } from "./globalCss";

export class CssNamePixel {
  public id = "css_name_px_" + nanoid(10);
  public name = "px";
  public title = "px";

  public vueStyleName = "name";
  public cssStyleName = "name";

  public labelZh = "名称";
  public labelEn = "name";
  public description = "";
  public descriptionZh = "";

  public type = cssDataType.pureValue;

  public tag = "NumberInputSlider";
  public _value = 0;

  public properties = undefined;

  public unit = "px";
  public unitOptions = null;

  private _min = 0;
  private _max = 5000;
  private _step = 1;
  private _retainDecimalPlaces = 0;

  public isEnable = true;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "css_name_px_" + options.name + "_" + nanoid(10);
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

    if (options.unitOptions) {
      this.unitOptions = options.unitOptions;
    }

    this._value = options.value ?? 0;
    this.unit = options.unit ?? "px";

    if (options.max != undefined && options.min != undefined && options.max > options.min) {
      this._max = options.max;
      this._min = options.min;
    } else {
      if (options.unit === "px") {
        this._max = 5000;
      } else {
        this._max = 300;
      }
    }

    if (options.step) {
      this._step = +options.step;
    }

    if (options.retainDecimalPlaces) {
      this._retainDecimalPlaces = +options.retainDecimalPlaces;
    }

    this.isEnable = options.isEnable ?? true;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = +newValue;
  }

  get min() {
    return this._min;
  }

  set min(newMin) {
    if (newMin < this._max) {
      this._min = newMin;
    } else {
      console.error("min must be less than max.");
    }
  }

  get max() {
    return this._max;
  }

  set max(newMax) {
    if (newMax > this._min) {
      this._max = newMax;
    } else {
      console.error("max must be greater than min.");
    }
  }

  get step() {
    return this._step;
  }

  set step(newStep) {
    this._step = newStep;
  }

  get retainDecimalPlaces() {
    return this._retainDecimalPlaces;
  }

  set retainDecimalPlaces(newPlc) {
    this._retainDecimalPlaces = newPlc;
  }

  getStyle(model = "vue", isPxToRem = false) {
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    if (this.unit === "px" && isPxToRem) {
      // return `${name}: ${(+this.value / 16).toFixed(6) }rem`
      return `"${name}": "${+this.value / 16}rem"`;
    } else {
      return `"${name}": "${this.value}${this.unit}"`;
    }
  }

  getStyleName(model = "vue") {
    let name = this.cssStyleName;
    if (model === "vue") {
      name = this.vueStyleName;
    }
    return name;
  }

  getStyleValue(isPxToRem = false) {
    if (this.unit === "px" && isPxToRem) {
      return `${+this.value / 16}rem`;
    } else {
      return `${this.value}${this.unit}`;
    }
  }

  getClass(isPxToRem = false) {
    if (this.unit === "px" && isPxToRem) {
      return `${this.cssStyleName}: ${this.value}rem`;
    } else {
      return `${this.cssStyleName}: ${this.value}${this.unit}`;
    }
  }

  getClassName() {
    return this.cssStyleName;
  }
}

export default CssNamePixel;
