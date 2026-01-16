import { nanoid } from "@/utils/common/nanoid";

import czmlBillboardEntity from "../entities/billboard";
import czmlBoxEntity from "../entities/box.ts";
import czmlLabelEntity from "../entities/label.ts";
import { createDescriptionProp, createIdProp, createNameProp, createParentProp } from "../properties/stringTextProp.ts";
import { createDeleteProp } from "../properties/booleanProp.ts";
import { createAvailabilityProp } from "../properties/timeProp.ts";
import { createCustomPropertiesProp, createPackketPropertiesProp } from "../properties/customProperiesProp.ts";
import { createPositionProp } from "../properties/positionProp.ts";
import { createOrientationProp } from "../properties/orientationProp.ts";
import { createViewFromProp } from "../properties/viewFromProp.ts";
import czmlModelEntity from "../entities/model.ts";
import czmlPathEntity from "../entities/path.ts";
import czmlCorridorEntity from "../entities/corridor.ts";
import czmlCylinderEntity from "../entities/cylinder.ts";
import czmlEllipseEntity from "../entities/ellipse.ts";
import czmlEllipsoidEntity from "../entities/ellipsoid.ts";
import czmlPointEntity from "../entities/point.ts";
import czmlPolygonEntity from "../entities/polygon.ts";
import czmlPolylineEntity from "../entities/polyline.ts";
import czmlPolylineVolumeEntity from "../entities/polylineVolume.ts";
import czmlRectangleEntity from "../entities/rectangle.ts";
import czmlWallEntity from "../entities/wall.ts";
import czmlTilesetEntity from "../entities/tileset.ts";
import czmlAgiConicSensorEntity from "../entities/agi_conicSensor.ts";
import czmlAgiFanEntity from "../entities/agi_fan.ts";
import czmlAgiCustomPatternSensorEntity from "../entities/agi_customPatternSensor.ts";
import czmlAgiRectangularSensorEntity from "../entities/agi_rectangularSensor.ts";
import czmlAgiVectorEntity from "../entities/agi_vector.ts";

export class czmlPacket {
  public id = "czml_packet_" + nanoid(10);
  public name = "packet";
  public _czmlName = "packet";
  public labelZh = "包";
  public labelEn = "packet";
  public title = "Packet";
  public description = "Describes the graphical properties of a single object in a scene, such as a single aircraft.";
  public descriptionZh = "";

  public type = "czmlPacket";
  public componentType = "czml";
  public componentProps = "czml#packet";

  public isRequired = true;
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
      value: "packet_id_init" + nanoid(10),
      isEnable: true,
      isUsed: true,
      description:
        "The ID of the object described by this packet. IDs do not need to be GUIDs, but they do need to uniquely identify a single object within a CZML source and any other CZML sources loaded into the same scope. If this property is not specified, the client will automatically generate a unique one. However, this prevents later packets from referring to this object in order to add more data to it.",
      type: "string",
    }),
    delete: createDeleteProp({
      isUsed: false,
      description:
        "Whether the client should delete all existing data for this object, identified by ID. If true, all other properties in this packet will be ignored.",
      type: "boolean",
    }),
    name: createNameProp({
      isUsed: true,
      value: "packet_" + nanoid(10),
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
      $ref: "String.json",
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
      isEnable: true,
      isUsed: false,
      isShowUsed: true,
      $ref: "Values/TimeIntervalCollectionValue.json",
      description:
        "The set of time intervals over which data for an object is available. The property can be a single string specifying a single interval, or an array of strings representing intervals. A later CZML packet can update this availability if it changes or is found to be incorrect. For example, an SGP4 propagator may initially report availability for all time, but then later the propagator throws an exception and the availability can be adjusted to end at that time. If this optional property is not present, the object is assumed to be available for all time. Availability is scoped to a particular CZML stream, so two different streams can list different availability for a single object. Within a single stream, the last availability stated for an object is the one in effect and any availabilities in previous packets are ignored. If an object is not available at a time, the client will not draw that object.",
      // default: "0000-00-00T00:00:00Z/9999-12-31T24:00:00Z",
    }),
    properties: createPackketPropertiesProp({
      isUsed: false,
      $ref: "CustomProperties.json",
      description: "czml official internal definition. A set of custom properties for this object. ",
    }),
    customProperties: createCustomPropertiesProp({
      isUsed: false,
      description: "User-defined properties with absolutely no restrictions",
    }),
    position: createPositionProp({
      isUsed: false,
      $ref: "Position.json",
      description:
        "The position of the object in the world. The position has no direct visual representation, but it is used to locate billboards, labels, and other graphical items attached to the object.",
      czmlExamples: ["Examples/SimplePosition.json", "Examples/TimeVaryingPosition.json"],
    }),
    orientation: createOrientationProp({
      isUsed: false,
      $ref: "Orientation.json",
      description:
        "The orientation of the object in the world. The orientation has no direct visual representation, but it is used to orient models, cones, pyramids, and other graphical items attached to the object.",
    }),
    viewFrom: createViewFromProp({
      isUsed: false,
      isShowUsed: true,
      $ref: "ViewFrom.json",
      description:
        "A suggested camera location when viewing this object. The property is specified as a Cartesian position in the East (x), North (y), Up (z) reference frame relative to the object's position.",
    }),
    billboard: new czmlBillboardEntity({
      isUsed: false,
      $ref: "Billboard.json",
      description:
        "A billboard, or viewport-aligned image, sometimes called a marker. The billboard is positioned in the scene by the `position` property.",
    }),
    box: new czmlBoxEntity({
      isUsed: false,
      $ref: "Box.json",
      description:
        "A box, which is a closed rectangular cuboid. The box is positioned and oriented using the `position` and `orientation` properties.",
    }),
    corridor: new czmlCorridorEntity({
      isUsed: false,
      $ref: "Corridor.json",
      description: "A corridor, which is a shape defined by a centerline and width.",
    }),
    cylinder: new czmlCylinderEntity({
      isUsed: false,
      $ref: "Cylinder.json",
      description:
        "A cylinder, truncated cone, or cone defined by a length, top radius, and bottom radius. The cylinder is positioned and oriented using the `position` and `orientation` properties.",
    }),
    ellipse: new czmlEllipseEntity({
      isUsed: false,
      $ref: "Ellipse.json",
      description:
        "An ellipse, which is a closed curve on the surface of the Earth. The ellipse is positioned using the `position` property.",
    }),
    ellipsoid: new czmlEllipsoidEntity({
      isUsed: false,
      $ref: "Ellipsoid.json",
      description:
        "An ellipsoid, which is a closed quadric surface that is a three-dimensional analogue of an ellipse. The ellipsoid is positioned and oriented using the `position` and `orientation` properties.",
    }),
    label: new czmlLabelEntity({
      isUsed: false,
      $ref: "Label.json",
      description: "A string of text. The label is positioned in the scene by the `position` property.",
    }),
    model: new czmlModelEntity({
      isUsed: false,
      $ref: "Model.json",
      description:
        "A 3D model. The model is positioned and oriented using the `position` and `orientation` properties.",
    }),
    path: new czmlPathEntity({
      isUsed: false,
      $ref: "Path.json",
      description:
        "A path, which is a polyline defined by the motion of an object over time. The possible vertices of the path are specified by the `position` property.",
    }),
    point: new czmlPointEntity({
      isUsed: false,
      $ref: "Point.json",
      description:
        "A point, or viewport-aligned circle. The point is positioned in the scene by the `position` property.",
    }),
    polygon: new czmlPolygonEntity({
      isUsed: false,
      $ref: "Polygon.json",
      description: "A polygon, which is a closed figure on the surface of the Earth.",
    }),
    polyline: new czmlPolylineEntity({
      isUsed: false,
      $ref: "Polyline.json",
      description: "A polyline, which is a line in the scene composed of multiple segments.",
    }),
    polylineVolume: new czmlPolylineVolumeEntity({
      isUsed: false,
      $ref: "PolylineVolume.json",
      description: "A polyline with a volume, defined as a 2D shape extruded along a polyline.",
    }),
    rectangle: new czmlRectangleEntity({
      isUsed: false,
      $ref: "Rectangle.json",
      description:
        "A cartographic rectangle, which conforms to the curvature of the globe and can be placed along the surface or at altitude.",
    }),
    tileset: new czmlTilesetEntity({
      isUsed: false,
      $ref: "Tileset.json",
      description: "A 3D Tiles tileset.",
    }),
    wall: new czmlWallEntity({
      isUsed: false,
      $ref: "Wall.json",
      description:
        "A two-dimensional wall which conforms to the curvature of the globe and can be placed along the surface or at altitude.",
    }),
    agi_conicSensor: new czmlAgiConicSensorEntity({
      isUsed: false,
      $ref: "Extensions/AGI/ConicSensor.json",
      description:
        "A conical sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
    }),
    agi_customPatternSensor: new czmlAgiCustomPatternSensorEntity({
      isUsed: false,
      $ref: "Extensions/AGI/CustomPatternSensor.json",
      description:
        "A custom sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
    }),
    agi_rectangularSensor: new czmlAgiRectangularSensorEntity({
      isUsed: false,
      $ref: "Extensions/AGI/RectangularSensor.json",
      description:
        "A rectangular pyramid sensor volume taking into account occlusion of an ellipsoid, i.e., the globe. The sensor is positioned and oriented using the `position` and `orientation` properties.",
    }),
    agi_fan: new czmlAgiFanEntity({
      isUsed: false,
      $ref: "Extensions/AGI/Fan.json",
      description:
        "Defines a fan, which starts at a point or apex and extends in a specified list of directions from the apex. Each pair of directions forms a face of the fan extending to the specified radius. The fan is positioned and oriented using the `position` and `orientation` properties.",
    }),
    agi_vector: new czmlAgiVectorEntity({
      isUsed: false,
      $ref: "Extensions/AGI/Vector.json",
      description:
        "Defines a graphical vector that originates at the `position` property and extends in the provided direction for the provided length. The vector is positioned using the `position` property.",
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
      if (prop.getCzmlName && prop.isUsed) {
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

export default czmlPacket;
