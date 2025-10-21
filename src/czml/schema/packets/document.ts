import { nanoid } from "@/utils/common/nanoid";
import czmlStringProp from "../properties/StringProp";
import czmlTextProp from "../properties/TextProp";
import czmlClockProp from "../properties/ClockProp";
import { czmlTimeCollectionProp, czmlAvailabilityOptions } from "../properties/TimeCollectionProp";

export class czmlDocument {
  public id = "czml_entity_document_" + nanoid(10);
  public name = "document";
  public labelZh = "文本";
  public labelEn = "document";
  public title = "document";
  public description = "Describes a CZML document.";
  public type = "object";
  public componentType = "czml"; // 是 czml html three(3d)
  public flyTo = false;
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isExpand = true; // for UI

  constructor(options: any) {
    if (!options) {
      return;
    }
    if (options.id) {
      this.id = options.id;
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
    if (options.description) {
      this.description = options.description;
    }
  }

  public properties = {
    id: new czmlStringProp({
      name: "id",
      labelZh: "标示",
      labelEn: "id",
      value: "document",
      isEnable: false,
      isUsed: true,
      description: "Describes a CZML document.",
    }),
    name: new czmlStringProp({
      name: "name",
      labelZh: "名称",
      labelEn: "name",
      value: "billboard_name_init" + nanoid(10),
      isEnable: true,
      isUsed: true,
      description: "The name of the object. It does not have to be unique and is intended for user consumption.",
    }),
    version: new czmlStringProp({
      name: "version",
      labelZh: "版本号",
      labelEn: "version",
      value: "1.0",
      isEnable: true,
      isUsed: true,
      description: "The CZML version being written. Only valid on the document object.",
    }),
    description: new czmlTextProp({
      name: "description",
      labelZh: "描述",
      labelEn: "description",
      value: this.description,
      isEnable: true,
      isUsed: true,
      description: "Describes a CZML document.",
    }),
    title: new czmlStringProp({
      name: "title",
      labelZh: "标题",
      labelEn: "title",
      value: "Document",
      isEnable: false,
      isUsed: true,
      description: "Describes a CZML document.",
    }),
    clock: new czmlClockProp({
      $ref: "Clock.json",
      isUsed: true,
      description: "The clock settings for the entire data set. Only valid on the document object.",
    }),
    availability: new czmlTimeCollectionProp({
      ...czmlAvailabilityOptions,
      $ref: "Values/TimeIntervalCollectionValue.json",
      description:
        "The set of time intervals over which data for an object is available. The property can be a single string specifying a single interval, or an array of strings representing intervals. A later CZML packet can update this availability if it changes or is found to be incorrect. For example, an SGP4 propagator may initially report availability for all time, but then later the propagator throws an exception and the availability can be adjusted to end at that time. If this optional property is not present, the object is assumed to be available for all time. Availability is scoped to a particular CZML stream, so two different streams can list different availability for a single object. Within a single stream, the last availability stated for an object is the one in effect and any availabilities in previous packets are ignored. If an object is not available at a time, the client will not draw that object.",
      default: "0000-00-00T00:00:00Z/9999-12-31T24:00:00Z",
      isEnable: true,
      isUsed: false,
    }),
  };
}

export default czmlDocument;
