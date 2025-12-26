import { nanoid } from "@/utils/common/nanoid";

import { createShowBackgroundProp, createShowProp } from "../properties/booleanProp";
import { createFontProp, createTextProp } from "../properties/stringTextProp";
import { createLabelStyleProp } from "../properties/styleProp";
import {
  createDisableDepthTestDistanceDoubleProp,
  createOutlineWidthDoubleProp,
  createScaleDoubleProp,
} from "../properties/doubleProp";
import { createBackgroundColorProp, createFillColorProp, createOutlineColorProp } from "../properties/colorProp";
import { createBackgroundPaddingProp } from "../properties/backgroundPaddingProp";
import { createPixelOffsetProp } from "../properties/pixelOffsetProp";
import { createEyeOffsetProp } from "../properties/eyeOffsetProp";
import { createHorizontalOriginProp } from "../properties/horizontalOriginProp";
import { createVerticalOriginProp } from "../properties/verticalOriginProp";
import { createHeightReferenceProp } from "../properties/heightReferenceProp";
import {
  createPixelOffsetScaleByDistanceProp,
  createScaleByDistanceProp,
  createTranslucencyByDistanceProp,
} from "../properties/nearFarDistanceProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";

export class czmlLabelEntity {
  public id = "czml_entity_label_" + nanoid(10);
  public name = "label";
  public _czmlName = "label";
  public labelZh = "标签";
  public labelEn = "label";
  public title = "label";
  public description = "A string of text. The label is positioned in the scene by the `position` property.";

  public descriptionZh = "";

  public type = "entity";
  public componentType = "czml#packet#entity";
  public tag = "CzmlEntityRender";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI
  public _isEntity = true;
  public isCombinedProperty = false;
  public isComplexProperty = false;

  constructor(options: any) {
    if (!options) {
      return;
    }

    if (options.id) {
      this.id = options.id;
    } else if (options.name) {
      this.id = "czml_entity_label_" + options.name + "_" + nanoid(10);
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

    if (options.title) {
      this.title = options.title;
    }

    if (options.description) {
      this.description = options.description;
    }

    if (options.descriptionZh) {
      this.descriptionZh = options.descriptionZh;
    }

    if (options.tag) {
      this.tag = options.tag;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  public properties = {
    show: createShowProp({
      $ref: "Boolean.json",
      description: "Whether or not the label is shown.",
      default: true,
    }),
    text: createTextProp({
      $ref: "String.json",
      description: "The text displayed by the label. The newline character (\\n) indicates line breaks.",
    }),
    font: createFontProp({
      $ref: "Font.json",
      description: "The font to use for the label.",
      default: "30px sans-serif",
    }),
    style: createLabelStyleProp({
      $ref: "LabelStyle.json",
      description: "The style of the label.",
      default: "FILL",
    }),
    scale: createScaleDoubleProp({
      $ref: "Double.json",
      description:
        "The scale of the label. The scale is multiplied with the pixel size of the label's text. For example, if the scale is 2.0, the label will be rendered with twice the number of pixels, in each direction, of the text.",
      default: 1.0,
    }),
    showBackground: createShowBackgroundProp({
      $ref: "Boolean.json",
      description: "Whether or not a background behind the label is shown.",
      default: false,
    }),
    backgroundColor: createBackgroundColorProp({
      $ref: "Color.json",
      description: "The color of the background behind the label.",
      default: "[0.165, 0.165, 0.165, 0.8]",
    }),
    backgroundPadding: createBackgroundPaddingProp({
      $ref: "BackgroundPadding.json",
      description: "The amount of padding between the text and the label's background.",
      default: [7, 5],
    }),
    pixelOffset: createPixelOffsetProp({
      $ref: "PixelOffset.json",
      description:
        "The offset, in viewport pixels, of the label origin from the `position`. A pixel offset is the number of pixels up and to the right to place the label, relative to the `position`.",
      default: [0.0, 0.0],
    }),
    eyeOffset: createEyeOffsetProp({
      $ref: "EyeOffset.json",
      description:
        "The eye offset of the label, which is the offset in eye coordinates at which to place the label relative to the `position` property. Eye coordinates are a left-handed coordinate system where the X-axis points toward the viewer's right, the Y-axis points up, and the Z-axis points into the screen.",
      default: [0.0, 0.0, 0.0],
    }),
    horizontalOrigin: createHorizontalOriginProp({
      $ref: "HorizontalOrigin.json",
      description:
        "The horizontal origin of the label. It controls whether the label is left-, center-, or right-aligned with the `position`.",
      default: "CENTER",
    }),
    verticalOrigin: createVerticalOriginProp({
      $ref: "VerticalOrigin.json",
      description:
        "The vertical origin of the label. It controls whether the label image is bottom-, center-, or top-aligned with the `position`.",
      default: "CENTER",
    }),
    heightReference: createHeightReferenceProp({
      $ref: "HeightReference.json",
      description: "The height reference of the label, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    fillColor: createFillColorProp({
      $ref: "Color.json",
      description: "The fill color of the label.",
      default: "white",
    }),
    outlineColor: createOutlineColorProp({
      $ref: "Color.json",
      description: "The outline color of the label.",
      default: "black",
    }),
    outlineWidth: createOutlineWidthDoubleProp({
      $ref: "Double.json",
      description: "The outline width of the label.",
      default: 1.0,
    }),
    translucencyByDistance: createTranslucencyByDistanceProp({
      $ref: "NearFarScalar.json",
      description:
        "How the label's translucency should change based on the label's distance from the camera. This scalar value should range from 0 to 1.",
    }),
    pixelOffsetScaleByDistance: createPixelOffsetScaleByDistanceProp({
      $ref: "NearFarScalar.json",
      description:
        "How the label's pixel offset should change based on the label's distance from the camera. This scalar value will be multiplied by `pixelOffset`.",
    }),
    scaleByDistance: createScaleByDistanceProp({
      $ref: "NearFarScalar.json",
      description:
        "How the label's scale should change based on the label's distance from the camera. This scalar value will be multiplied by `scale`.",
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this label will be displayed.",
    }),
    disableDepthTestDistance: createDisableDepthTestDistanceDoubleProp({
      $ref: "Double.json",
      description:
        "The distance from the camera at which to disable the depth test. This can be used to prevent clipping against terrain, for example. When set to zero, the depth test is always applied. When set to Infinity, the depth test is never applied.",
      default: 0.0,
    }),
  };
  // end properties

  get isEntity() {
    return this._isEntity;
  }

  set isEntity(newValue) {
    return;
  }

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
    // this._czmlName = newValue;
  }

  public getCzmlName() {
    if (this.isUsed) {
      return this.czmlName;
    } else {
      return null;
    }
  }

  public getCzmlValue() {
    if (this.isUsed) {
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
    } else {
      return null;
    }
  }

  public getCzmlData() {
    if (this.isUsed) {
      return {
        [this.czmlName]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlLabelEntity;
