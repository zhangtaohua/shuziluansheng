import { nanoid } from "@/utils/common/nanoid";

export default class CssNamePixel {
  public id = "css_px_" + nanoid(10);
  public tag = "NumberInputSlider";
  public _value = 200;
  public unit = "px";
  private _min = 0;
  private _max = 500;
  private _step = 1;

  // constructor(value: number = 1920, unit: "px" | "%" | "vw" | "vh" = "px", min = -1, max = -1, step = 1) {
  //   this._value = value;
  //   this.unit = unit;

  //   if (max > min) {
  //     this._max = max;
  //     this._min = min;
  //   } else {
  //     if (unit === "px") {
  //       this._max = 500;
  //     } else {
  //       this._max = 300;
  //     }
  //   }

  //   this.step = step;
  // }
  constructor(options: any) {
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

  getStyle(isPxToRem = false) {
    if (this.unit === "px" && isPxToRem) {
      return `${+this.value / 16}rem`;
    } else {
      return `${this.value}${this.unit}`;
    }
  }

  getStyleValue(isPxToRem = false) {
    return this.getStyle(isPxToRem);
  }

  getClass(isPxToRem = false) {
    return this.getStyle(isPxToRem);
  }
}
