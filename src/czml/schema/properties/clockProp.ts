import { nanoid } from "@/utils/common/nanoid";
import { createClockMultiplierDoublePureProp } from "./doubleProp";
import { createClockRangeProp, createClockStepProp, createCurrentTimeProp, createTimeIntervalProp } from "./timeProp";
import czmlCombineProp from "../values/CombinePropert";

export function createClockProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_clock_" + nanoid(10),
    name: "clock",
    czmlName: "clock",
    labelZh: "时钟",
    labelEn: "clock",
    title: "Clock",
    tag: "CzmlCombinePropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description:
      "Initial settings for a simulated clock when a document is loaded. The start and stop time are configured using the interval property.",
    descriptionZh: "",
    ...options,
    properties: {
      interval: createTimeIntervalProp(),
      currentTime: createCurrentTimeProp(),
      multiplier: createClockMultiplierDoublePureProp(),
      range: createClockRangeProp(),
      step: createClockStepProp(),
    },
  });
}
