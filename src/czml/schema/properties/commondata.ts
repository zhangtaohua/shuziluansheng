export const CZMLPUREVALUE = "PureValue";
export const CZMLINTERVALSVALUE = "Intervals";
export const CZMLCOMPOSITEVALUE = "CompositeValues";
export const CZMLSAMPLEDVALUE = "SampledPropertyValues";
export const defaultTimeFormatStr = "YYYY-MM-DD HH:mm:ss";
export const CZMLTIMESTRING = "timestring";
export const CZMLTIMESECONDS = "seconds";
export const CZMLVALUESNOTINTERPOLATE = "not_interpolate";
export const CZMLVALUESWITHINTERPOLATE = "with_interpolate";

export const CZMLCARTESIAN3TYPE = "cartesian3";
export const CZMLCARTESIAN3DEGREESTYPE = "cartesian3Degrees";
export const CZMLCARTESIAN3RADIANSTYPE = "cartesian3Radians";

export const propValueTypesOptions = [
  {
    id: CZMLPUREVALUE,
    value: CZMLPUREVALUE,
    label: "纯数值",
    labelZh: "纯数值",
    labelEn: "pure",
    note: "pure value",
  },
  {
    id: CZMLINTERVALSVALUE,
    value: CZMLINTERVALSVALUE,
    label: "间隔值",
    labelZh: "间隔值",
    labelEn: "intervals",
    note: "intervals",
  },
  {
    id: CZMLCOMPOSITEVALUE,
    value: CZMLCOMPOSITEVALUE,
    label: "复合值",
    labelZh: "复合值",
    labelEn: "composite",
    note: "composite values",
  },
  {
    id: CZMLSAMPLEDVALUE,
    value: CZMLSAMPLEDVALUE,
    label: "采样值",
    labelZh: "采样值",
    labelEn: "sampled",
    note: "sampled property values",
  },
];

export const propPureValueOption = {
  id: CZMLPUREVALUE,
  value: CZMLPUREVALUE,
  label: "纯数值",
  labelZh: "纯数值",
  labelEn: "pure",
  note: "pure value",
};

export const propIntervalsOption = {
  id: CZMLINTERVALSVALUE,
  value: CZMLINTERVALSVALUE,
  label: "间隔值",
  labelZh: "间隔值",
  labelEn: "intervals",
  note: "intervals",
};

export const propCompositeValuesOption = {
  id: CZMLCOMPOSITEVALUE,
  value: CZMLCOMPOSITEVALUE,
  label: "复合值",
  labelZh: "复合值",
  labelEn: "composite",
  note: "composite values",
};

export const propSampledPropertyValuesOption = {
  id: CZMLSAMPLEDVALUE,
  value: CZMLSAMPLEDVALUE,
  label: "采样值",
  labelZh: "采样值",
  labelEn: "sampled",
  note: "sampled property values",
};

export const propValuesInterpolateOptions = [
  {
    id: CZMLVALUESNOTINTERPOLATE,
    value: CZMLVALUESNOTINTERPOLATE,
    label: "纯数值",
    labelZh: "纯数值",
    labelEn: "pure value",
    note: "pure value",
  },
  {
    id: CZMLVALUESWITHINTERPOLATE,
    value: CZMLVALUESWITHINTERPOLATE,
    label: "插值",
    labelZh: "插值",
    labelEn: "interpolation",
    note: "interpolation",
  },
];

export const propValuesTimeTypeOptions = [
  {
    id: CZMLPUREVALUE,
    value: CZMLPUREVALUE,
    label: "纯数值",
    labelZh: "纯数值",
    labelEn: "pure value",
    note: "pure value.",
  },
  {
    id: CZMLTIMESECONDS,
    value: CZMLTIMESECONDS,
    label: "秒数",
    labelZh: "秒数",
    labelEn: "seconds",
    note: "seconds since epoch.",
  },
  {
    id: CZMLTIMESTRING,
    value: CZMLTIMESTRING,
    label: "时间串",
    labelZh: "时间串",
    labelEn: "timestring(ISO8601)",
    note: "Time is an ISO 8601 date and time string.",
  },
];
