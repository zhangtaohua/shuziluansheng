import { nanoid } from "@/utils/common/nanoid";

export class czmlOptionsPureProp {
  public id = "czml_prop_pure_options_" + nanoid(10);
  public name = "pure_options";
  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public title = "Pure Options";
  public description = "The pure options select.";
  public type = "property";
  public componentType = "czml#packet#property";
  public tag = "CzmlOptionsPurePropInput";
  public _value = "";
  public _valueType = "string";
  public default = "";
  public options = [];
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI
  public _isEntity = false;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_prop_pure_options_" + options.name + "_" + nanoid(10);
    }

    if (options.name) {
      this.name = options.name;
    }

    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }

    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }

    if (options.title) {
      this.title = options.title;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    if (options.value) {
      this._value = options.value;
    }

    if (options.default) {
      this.default = options.default;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isExpand = options.isExpand ?? true;

    this.options = options.options;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get valueType() {
    return this._valueType;
  }

  set valueType(newValue) {
    return;
  }

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
  }

  getCzmlName() {
    return this.name;
  }

  getCzmlValue() {
    return this._value;
  }

  getCzmlData() {
    return {
      [this.name]: this._value,
    };
  }
}

export default czmlOptionsPureProp;

export const CzmlReferenceFrameOptions = {
  name: "referenceFrame",
  vueName: "referenceFrame",
  labelZh: "参考帧",
  labelEn: "referenceFrame",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "FIXED",
  options: [
    {
      id: "FIXED",
      value: "FIXED",
      label: "固定值",
      labelZh: "固定值",
      labelEn: "FIXED",
      note: "FIXED",
      default: true,
    },
    {
      id: "INERTIAL",
      value: "INERTIAL",
      label: "惯性值",
      labelZh: "惯性值",
      labelEn: "INERTIAL",
      note: "INERTIAL",
      default: false,
    },
  ],
};

export const CzmlArcTypeOptions = {
  name: "arcType",
  vueName: "arcType",
  labelZh: "弧型",
  labelEn: "arcType",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "The arc is a straight line that does not conform to the surface of an ellipsoid.",
    },
    {
      id: "GEODESIC",
      value: "GEODESIC",
      label: "测地线",
      labelZh: "测地线",
      labelEn: "GEODESIC",
      note: "GEODESIC",
      default: false,
      description: "The arc is a geodesic, which is the shortest path conforming to the surface of an ellipsoid.",
    },
    {
      id: "RHUMB",
      value: "RHUMB",
      label: "测地线",
      labelZh: "测地线",
      labelEn: "RHUMB",
      note: "RHUMB",
      default: false,
      description:
        "The arc is a rhumb line, or loxodrome, which is the path of constant heading conforming to the surface of an ellipsoid.",
    },
  ],
};

export const CzmlSensorVolumePortionToDisplayOptions = {
  name: "SensorVolumePortionToDisplay",
  vueName: "SensorVolumePortionToDisplay",
  labelZh: "弧型",
  labelEn: "SensorVolumePortionToDisplay",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "COMPLETE",
      value: "COMPLETE",
      label: "完全的",
      labelZh: "完全的",
      labelEn: "COMPLETE",
      note: "COMPLETE",
      default: true,
      description: "Display the complete sensor volume.",
    },
    {
      id: "BELOW_ELLIPSOID_HORIZON",
      value: "BELOW_ELLIPSOID_HORIZON",
      label: "低于椭球面地平线",
      labelZh: "低于椭球面地平线",
      labelEn: "BELOW_ELLIPSOID_HORIZON",
      note: "BELOW_ELLIPSOID_HORIZON",
      default: true,
      description: "Display the portion of the sensor volume that lies below the true horizon of the ellipsoid.",
    },
    {
      id: "ABOVE_ELLIPSOID_HORIZON",
      value: "ABOVE_ELLIPSOID_HORIZON",
      label: "高于椭球面地平线",
      labelZh: "高于椭球面地平线",
      labelEn: "ABOVE_ELLIPSOID_HORIZON",
      note: "ABOVE_ELLIPSOID_HORIZON",
      default: true,
      description: "Display the portion of the sensor volume that lies above the true horizon of the ellipsoid.",
    },
  ],
};

export const CzmlClockRangeOptions = {
  name: "clockRange",
  vueName: "clockRange",
  labelZh: "时钟范围",
  labelEn: "clock range",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "LOOP_STOP",
  options: [
    {
      id: "LOOP_STOP",
      value: "LOOP_STOP",
      label: "循环停止",
      labelZh: "循环停止",
      labelEn: "LOOP_STOP",
      note: "LOOP_STOP",
      default: true,
      description:
        "When the end time is reached while advancing forward, the clock will jump to the start time, and when the start time is reached while advancing backward, the clock will stop.",
    },
    {
      id: "UNBOUNDED",
      value: "UNBOUNDED",
      label: "无界",
      labelZh: "无界",
      labelEn: "UNBOUNDED",
      note: "UNBOUNDED",
      default: false,
      description: "The clock will continue advancing in the current direction.",
    },
    {
      id: "CLAMPED",
      value: "CLAMPED",
      label: "有界",
      labelZh: "有界",
      labelEn: "CLAMPED",
      note: "CLAMPED",
      default: false,
      description: "The clock will stop.",
    },
  ],
};

export const CzmlClockStepOptions = {
  name: "clockStep",
  vueName: "clockStep",
  labelZh: "时钟步长",
  labelEn: "clock step",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "TICK_DEPENDENT",
  options: [
    {
      id: "SYSTEM_CLOCK_MULTIPLIER",
      value: "SYSTEM_CLOCK_MULTIPLIER",
      label: "系统时钟乘法器",
      labelZh: "系统时钟乘法器",
      labelEn: "SYSTEM_CLOCK_MULTIPLIER",
      note: "SYSTEM_CLOCK_MULTIPLIER",
      default: true,
      description:
        "The current time is advanced by the amount of system time since the last tick, multiplied by `multiplier`.",
    },
    {
      id: "SYSTEM_CLOCK",
      value: "SYSTEM_CLOCK",
      label: "系统时钟",
      labelZh: "系统时钟",
      labelEn: "SYSTEM_CLOCK",
      note: "SYSTEM_CLOCK",
      default: false,
      description: "The clock is always set to the current system time.",
    },
    {
      id: "TICK_DEPENDENT",
      value: "TICK_DEPENDENT",
      label: "滴答依赖",
      labelZh: "滴答依赖",
      labelEn: "TICK_DEPENDENT",
      note: "TICK_DEPENDENT",
      default: false,
      description: "The current time is advanced by `multiplier` seconds each tick.",
    },
  ],
};

export const CzmlInterpolationAlgorithmOptions = {
  name: "interpolationAlgorithm",
  vueName: "interpolationAlgorithm",
  labelZh: "插值算法",
  labelEn: "interpolation algorithm",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,
  description:
    'The interpolation algorithm to use when interpolating. Valid values are "LINEAR", "LAGRANGE", and "HERMITE".',
  type: "string",
  default: "LINEAR",

  // real default value is static
  value: "LINEAR",
  options: [
    {
      id: "LINEAR",
      value: "LINEAR",
      label: "线性",
      labelZh: "线性",
      labelEn: "LINEAR",
      note: "LINEAR",
      default: true,
      description: "",
    },
    {
      id: "LAGRANGE",
      value: "LAGRANGE",
      label: "拉格朗日",
      labelZh: "拉格朗日",
      labelEn: "LAGRANGE",
      note: "LAGRANGE",
      default: false,
      description: "",
    },
    {
      id: "HERMITE",
      value: "HERMITE",
      label: "埃尔米特",
      labelZh: "埃尔米特",
      labelEn: "HERMITE",
      note: "HERMITE",
      default: false,
      description: "",
    },
  ],
};

export const CzmlForwardExtrapolationTypeOptions = {
  name: "forwardExtrapolationType",
  vueName: "forwardExtrapolationType",
  labelZh: "前向推导类型",
  labelEn: "forward extrapolation type",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,
  description:
    'The type of extrapolation to perform when a value is requested at a time after any available samples. Valid values are "NONE", "HOLD", and "EXTRAPOLATE".',
  type: "string",
  default: "NONE",

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "",
    },
    {
      id: "HOLD",
      value: "HOLD",
      label: "保持",
      labelZh: "保持",
      labelEn: "HOLD",
      note: "HOLD",
      default: false,
      description: "",
    },
    {
      id: "EXTRAPOLATE",
      value: "EXTRAPOLATE",
      label: "推断",
      labelZh: "推断",
      labelEn: "EXTRAPOLATE",
      note: "EXTRAPOLATE",
      default: false,
      description: "",
    },
  ],
};

export const CzmlBackwardExtrapolationTypeOptions = {
  name: "backwardExtrapolationType",
  vueName: "backwardExtrapolationType",
  labelZh: "后向推导类型",
  labelEn: "backward extrapolation type",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,
  description:
    'The type of extrapolation to perform when a value is requested at a time before any available samples. Valid values are "NONE", "HOLD", and "EXTRAPOLATE".',
  type: "string",
  default: "NONE",

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "",
    },
    {
      id: "HOLD",
      value: "HOLD",
      label: "保持",
      labelZh: "保持",
      labelEn: "HOLD",
      note: "HOLD",
      default: false,
      description: "",
    },
    {
      id: "EXTRAPOLATE",
      value: "EXTRAPOLATE",
      label: "推断",
      labelZh: "推断",
      labelEn: "EXTRAPOLATE",
      note: "EXTRAPOLATE",
      default: false,
      description: "",
    },
  ],
};

export const CzmlSampleOptions = {
  name: "arcType",
  vueName: "arcType",
  labelZh: "弧型",
  labelEn: "arcType",
  tag: "CzmlOptionsPurePropInput",
  isEnable: true,

  // real default value is static
  value: "NONE",
  options: [
    {
      id: "NONE",
      value: "NONE",
      label: "无",
      labelZh: "无",
      labelEn: "NONE",
      note: "NONE",
      default: true,
      description: "",
    },
  ],
};
