import { nanoid } from "@/utils/common/nanoid";

import czmlBillboardEntity from "../entities/billboard";
import czmlBoxEntity from "../entities/box.ts";
import czmlLabelEntity from "../entities/label.ts";
import { createDescriptionProp, createIdProp, createNameProp, createParentProp } from "../properties/stringTextProp.ts";
import { createDeleteProp } from "../properties/booleanProp.ts";
import { createAvailabilityProp } from "../properties/timeProp.ts";
import { createCustomPropertiesProp } from "../properties/customProperiesProp.ts";
import { createPositionProp } from "../properties/positionProp.ts";
import { createOrientationProp } from "../properties/orientationProp.ts";
import { createViewFromProp } from "../properties/viewFromProp.ts";
import czmlModelEntity from "../entities/model.ts";
import czmlPathEntity from "../entities/path.ts";
import czmlCorridorEntity from "../entities/corridor.ts";
import czmlCylinderEntity from "../entities/cylinder.ts";

export class czmlPacketV2 {
  public id = "czml_packet_" + nanoid(10);
  public name = "packet";
  public _czmlName = "packet";
  public labelZh = "包";
  public labelEn = "packet";
  public title = "Packet";
  public description = "Describes the graphical properties of a single object in a scene, such as a single aircraft.";
  public descriptionZh = "";
  public type = "packet";
  public componentType = "czml#packet";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI

  public domMaxHeight = "fit-content";

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
    if (options.czmlName) {
      this._czmlName = options.czmlName;
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
  }

  public properties = {
    id: createIdProp({
      value: "billboard_id_init" + nanoid(10),
      isEnable: true,
      isUsed: true,
      description:
        "The ID of the object described by this packet. IDs do not need to be GUIDs, but they do need to uniquely identify a single object within a CZML source and any other CZML sources loaded into the same scope. If this property is not specified, the client will automatically generate a unique one. However, this prevents later packets from referring to this object in order to add more data to it.",
      type: "string",
    }),
    delete: createDeleteProp({
      description:
        "Whether the client should delete all existing data for this object, identified by ID. If true, all other properties in this packet will be ignored.",
      type: "boolean",
    }),
    name: createNameProp({
      value: "billboard_name_init" + nanoid(10),
      description: "The name of the object. It does not have to be unique and is intended for user consumption.",
      type: "string",
    }),
    parent: createParentProp({
      isEnable: true,
      isUsed: false,
      isShowUsed: true,
      description: "The ID of the parent object, if any.",
      type: "string",
    }),
    description: createDescriptionProp({
      value: this.description,
      isEnable: true,
      isUsed: true,
      description: "An HTML description of the object.",
    }),
    // clock: {
    //   $ref: "Clock.json",
    //   description: "The clock settings for the entire data set. Only valid on the document object.",
    // },
    // version: {
    //   description: "The CZML version being written. Only valid on the document object.",
    //   type: "string",
    // },
    availability: createAvailabilityProp({
      $ref: "Values/TimeIntervalCollectionValue.json",
      description:
        "The set of time intervals over which data for an object is available. The property can be a single string specifying a single interval, or an array of strings representing intervals. A later CZML packet can update this availability if it changes or is found to be incorrect. For example, an SGP4 propagator may initially report availability for all time, but then later the propagator throws an exception and the availability can be adjusted to end at that time. If this optional property is not present, the object is assumed to be available for all time. Availability is scoped to a particular CZML stream, so two different streams can list different availability for a single object. Within a single stream, the last availability stated for an object is the one in effect and any availabilities in previous packets are ignored. If an object is not available at a time, the client will not draw that object.",
      default: "0000-00-00T00:00:00Z/9999-12-31T24:00:00Z",
      isEnable: true,
      isUsed: false,
      isShowUsed: true,
    }),
    properties: createCustomPropertiesProp({
      $ref: "CustomProperties.json",
      description: "A set of custom properties for this object.",
    }),
    position: createPositionProp({
      $ref: "Position.json",
      description:
        "The position of the object in the world. The position has no direct visual representation, but it is used to locate billboards, labels, and other graphical items attached to the object.",
      czmlExamples: ["Examples/SimplePosition.json", "Examples/TimeVaryingPosition.json"],
      default: null,
    }),
    orientation: createOrientationProp({
      $ref: "Orientation.json",
      isUsed: false,
      description:
        "The orientation of the object in the world. The orientation has no direct visual representation, but it is used to orient models, cones, pyramids, and other graphical items attached to the object.",
    }),
    viewFrom: createViewFromProp({
      $ref: "ViewFrom.json",
      isUsed: false,
      isShowUsed: true,
      description:
        "A suggested camera location when viewing this object. The property is specified as a Cartesian position in the East (x), North (y), Up (z) reference frame relative to the object's position.",
    }),
  };
  // end properties

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  public getCzmlData() {
    const czmlData = {};
    const keys = Object.keys(this.properties);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const prop = this.properties[key];
      if (prop.getCzmlName) {
        const propKey = prop.getCzmlName();
        const propValue = prop.getCzmlValue();
        if (propKey && propValue) {
          czmlData[propKey] = propValue;
        }
      }
    }

    return czmlData;
  }
}

export default czmlPacketV2;
