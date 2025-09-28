import { nanoid } from "@/utils/common/nanoid";

// width
// height
// max-width
// min-width
// max-height
// min-height
// font-size
// margin
// padding
// border-width
// top
// bottom
// left
// right
// line-height (行高，如果设置为具体值，可以使用 px)
// border-radius (边框圆角半径)
// box-shadow (盒子阴影的偏移量和模糊半径)
// background-position (背景图片的定位)

export const CssWidthOptions = {
  name: "width",
  vueName: "width",
  labelZh: "宽度",
  labelEn: "width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssMaxWidthOptions = {
  name: "max-width",
  vueName: "maxWidth",
  labelZh: "最大宽度",
  labelEn: "max width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssMinWidthOptions = {
  name: "min-width",
  vueName: "minWidth",
  labelZh: "最小宽度",
  labelEn: "min width",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssHeightOptions = {
  name: "height",
  vueName: "height",
  labelZh: "高度",
  labelEn: "height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssMaxHeightOptions = {
  name: "max-height",
  vueName: "maxHeight",
  labelZh: "最大高度",
  labelEn: "max height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssMinHeightOptions = {
  name: "min-height",
  vueName: "minHeight",
  labelZh: "最小高度",
  labelEn: "min height",
  tag: "NumberInputSlider",
  value: 200,
  unit: "px",
};

export const CssFontSizeOptions = {
  name: "font-size",
  vueName: "fontSize",
  labelZh: "文字大小",
  labelEn: "font-size",
  tag: "NumberInputSlider",
  value: 16,
  unit: "px",
  max: 300,
  min: 8,
};

export const CssTopOptions = {
  name: "top",
  vueName: "top",
  labelZh: "顶部",
  labelEn: "top",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
};

export const CssLeftOptions = {
  name: "left",
  vueName: "left",
  labelZh: "左侧",
  labelEn: "left",
  tag: "NumberInputSlider",
  value: 10,
  unit: "px",
  max: 2000,
  min: -1000,
};

export class CssNamePixel {
  public id = "css_name_px_" + nanoid(10);
  public name = "name";
  public vueName = "name";
  public labelZh = "名称";
  public labelEn = "name";
  public tag = "NumberInputSlider";
  public _value = 200;
  public unit = "px";
  public description = "";
  private _min = 0;
  private _max = 5000;
  private _step = 1;

  constructor(options: any) {
    this.id = options.id ? options.id : "css_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.tag = options.tag ? options.tag : "NumberInputSlider";

    this._value = options.value;
    this.unit = options.unit;

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

  getStyle(model = "vue", isPxToRem = false) {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
    }
    if (this.unit === "px" && isPxToRem) {
      // return `${name}: ${(+this.value / 16).toFixed(6) }rem`
      return `"${name}": "${+this.value / 16}rem"`;
    } else {
      return `"${name}": "${this.value}${this.unit}"`;
    }
  }

  getStyleName(model = "vue") {
    let name = this.name;
    if (model === "vue") {
      name = this.vueName;
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
      return `${this.name}: ${this.value}rem`;
    } else {
      return `${this.name}: ${this.value}${this.unit}`;
    }
  }

  getClassName() {
    return this.name;
  }
}

export default CssNamePixel;
