import { nanoid } from "@/utils/common/nanoid";
import czmlTimeCollectionProp from "../values/TimeCollection";
import czmlOptionsPureProp from "../values/OptionsPure";
import czmlTimePureProp from "../values/TimePure";
import czmlTimeIntervalProp from "../values/TimeInterval";

export const CzmlClockRangeOptions = {
  name: "clockRange",
  czmlName: "range",
  labelZh: "时钟范围",
  labelEn: "clock range",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,
  description: "The behavior of a clock when its current time reaches its start or end time.",
  type: "string",

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
  czmlName: "step",
  labelZh: "时钟步长",
  labelEn: "clock step",
  isEnable: true,
  description: "Defines how a clock advances each tick.",
  type: "string",

  // real default value is static
  value: "SYSTEM_CLOCK_MULTIPLIER",
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

export function createClockRangeProp(options = {}) {
  const opt = {
    ...CzmlClockRangeOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export function createClockStepProp(options = {}) {
  const opt = {
    ...CzmlClockStepOptions,
    ...options,
  };
  return new czmlOptionsPureProp(opt);
}

export function createAvailabilityProp(options = {}) {
  return new czmlTimeCollectionProp({
    id: "czml_prop_availability_" + nanoid(10),
    name: "availability",
    czmlName: "availability",
    labelZh: "可见性",
    labelEn: "availability",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "Values/TimeIntervalCollectionValue.json",
    description:
      "The set of time intervals over which data for an object is available. The property can be a single string specifying a single interval, or an array of strings representing intervals. A later CZML packet can update this availability if it changes or is found to be incorrect. For example, an SGP4 propagator may initially report availability for all time, but then later the propagator throws an exception and the availability can be adjusted to end at that time. If this optional property is not present, the object is assumed to be available for all time. Availability is scoped to a particular CZML stream, so two different streams can list different availability for a single object. Within a single stream, the last availability stated for an object is the one in effect and any availabilities in previous packets are ignored. If an object is not available at a time, the client will not draw that object.",
    default: "0000-00-00T00:00:00Z/9999-12-31T24:00:00Z",
    descriptionZh: "",
    ...options,
  });
}

export function createCurrentTimeProp(options = {}) {
  return new czmlTimePureProp({
    id: "czml_prop_currentTime_" + nanoid(10),
    name: "currentTime",
    czmlName: "currentTime",
    labelZh: "当前时间",
    labelEn: "current time",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createEpochimeProp(options = {}) {
  return new czmlTimePureProp({
    id: "czml_prop_epoch_" + nanoid(10),
    name: "epoch",
    czmlName: "epoch",
    labelZh: "时期",
    labelEn: "epoch",
    type: "string",
    format: "date-time",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "The epoch to use for times specified as seconds since an epoch.",
    descriptionZh: "",
    ...options,
  });
}

export function createTimeIntervalProp(options = {}) {
  return new czmlTimeIntervalProp({
    id: "czml_prop_interval_" + nanoid(10),
    name: "interval",
    czmlName: "interval",
    labelZh: "时间间隔",
    labelEn: "interval",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}
