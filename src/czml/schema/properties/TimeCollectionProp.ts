import { nanoid } from "@/utils/common/nanoid";
import dayjs from "dayjs";

import { defaultTimeFormatStr } from "./commondata";

export class czmlTimeCollectionProp {
  public id = "czml_prop_time_colleciton_" + nanoid(10);
  public name = "availability";
  public labelZh = "可见性";
  public labelEn = "availability";
  public description =
    "The set of time intervals over which data for an object is available. The property can be a single string specifying a single interval, or an array of strings representing intervals. A later CZML packet can update this availability if it changes or is found to be incorrect. For example, an SGP4 propagator may initially report availability for all time, but then later the propagator throws an exception and the availability can be adjusted to end at that time. If this optional property is not present, the object is assumed to be available for all time. Availability is scoped to a particular CZML stream, so two different streams can list different availability for a single object. Within a single stream, the last availability stated for an object is the one in effect and any availabilities in previous packets are ignored. If an object is not available at a time, the client will not draw that object.";
  public tag = "CzmlTimeCollectionPropInput";
  public _value = [
    {
      startTime: dayjs().format(defaultTimeFormatStr),
      endTime: dayjs().format(defaultTimeFormatStr),
    },
  ];

  public _valueType = "";
  public default = [
    {
      startTime: "0000-00-00T00:00:00Z",
      endTime: "9999-12-31T24:00:00Z",
    },
  ];
  public isEnable = true;
  public isEntity = false;

  // public availability = "";

  constructor(options: any) {
    this.id = options.id ? options.id : "czml_prop_time_colleciton_" + options.name + "_" + nanoid(10);
    if (options.name) {
      this.name = options.name;
    }
    this.labelZh = options.labelZh ? options.labelZh : options.name;
    this.labelEn = options.labelEn ? options.labelEn : options.name;
    if (options.description) {
      this.description = options.description;
    }

    this.tag = options.tag ? options.tag : "CzmlTimeCollectionPropInput";

    if (options.value) {
      this._value = options.value;
    }

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

export default czmlTimeCollectionProp;

export const czmlAvailabilityOptions = {
  name: "availability",
  vueName: "availability",
  labelZh: "可见性",
  labelEn: "availability",
  tag: "CzmlTimeCollectionPropInput",
  isEnable: true,
};
