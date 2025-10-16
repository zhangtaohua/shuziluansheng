import { nanoid } from "@/utils/common/nanoid";

export class czmlPureOptionsProp {
  public id = "czml_pure_options_prop_" + nanoid(10);
  public name = "pure_options";
  public vueName = "pureOptions";
  public labelZh = "纯选择式";
  public labelEn = "pure options";
  public description = "The pure options select.";
  public tag = "CzmlPureOptionsInput";
  public _value = true;
  public _valueType = "string";
  public default = "";
  public options = [];
  public isEnable = true;
  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_pure_options_prop_" + options.name + "_" + nanoid(10);
    this.name = options.name;
    this.vueName = options.vueName ? options.vueName : options.name;
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    this.description = options.description ? options.description : "The pure options select.";

    if (options.description) {
      this.description = options.description;
    }

    this._value = options.value;
    this.options = options.options;
    this.default = options.default ? options.default : "";
    this.isEnable = options.isEnable ?? true;
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
    this._valueType = newValue;
  }
}

export default czmlPureOptionsProp;

export const CzmlReferenceFrameOptions = {
  name: "referenceFrame",
  vueName: "referenceFrame",
  labelZh: "参考帧",
  labelEn: "referenceFrame",
  tag: "CzmlPureOptionsInput",
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
  tag: "CzmlPureOptionsInput",
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
  tag: "CzmlPureOptionsInput",
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

export const CzmlSampleOptions = {
  name: "arcType",
  vueName: "arcType",
  labelZh: "弧型",
  labelEn: "arcType",
  tag: "CzmlPureOptionsInput",
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
