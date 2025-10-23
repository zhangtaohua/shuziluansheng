import { nanoid } from "@/utils/common/nanoid";
import { czmlBooleanIntervalProp, czmlShowOptions } from "../properties/BooleanIntervalProp";
import czmlUriProp from "../properties/UriProp";
import czmlStringProp from "../properties/StringProp";
import czmlTextProp from "../properties/TextProp";
import czmlPositionProp from "../properties/PositionProp";

export class czmlBillboard {
  public id = "czml_entity_billboard_" + nanoid(10);
  public name = "billboard";
  public _czmlName = "billboard";
  public labelZh = "广告牌";
  public labelEn = "billboard";
  public title = "Billboard";
  public description =
    "A billboard, or viewport-aligned image. The billboard is positioned in the scene by the `position` property. A billboard is sometimes called a marker.";
  public type = "entity";
  public componentType = "czml#packet#entity";
  public tag = "CzmlEntityRender";
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
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
      this.id = "czml_entity_billboard_" + options.name + "_" + nanoid(10);
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

    if (options.tag) {
      this.tag = options.tag;
    }

    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  public properties = {
    show: new czmlBooleanIntervalProp({
      $ref: "Boolean.json",
      default: true,
      ...czmlShowOptions,
    }),
    image: new czmlUriProp({
      $ref: "Uri.json",
      name: "image",
      description:
        'The URI of the image displayed on the billboard. For broadest client compatibility, the URI should be accessible via Cross-Origin Resource Sharing (CORS). The URI may also be a <a href="https://developer.mozilla.org/en/data_URIs">data URI</a>.',
      czmlRequiredForDisplay: true,
    }),
    scale: {
      $ref: "Double.json",
      description:
        "The scale of the billboard. The scale is multiplied with the pixel size of the billboard's `image`. For example, if the scale is 2.0, the billboard will be rendered with twice the number of pixels, in each direction, of the `image`.",
      default: 1.0,
    },
    pixelOffset: {
      $ref: "PixelOffset.json",
      description:
        "The offset, in viewport pixels, of the billboard origin from the `position`. A pixel offset is the number of pixels up and to the right to place the billboard, relative to the `position`.",
      default: "[0.0, 0.0]",
    },
    eyeOffset: {
      $ref: "EyeOffset.json",
      description:
        "The eye offset of the billboard, which is the offset in eye coordinates at which to place the billboard relative to the `position` property. Eye coordinates are a left-handed coordinate system where the X-axis points toward the viewer's right, the Y-axis points up, and the Z-axis points into the screen.",
      default: "[0.0, 0.0, 0.0]",
    },
    horizontalOrigin: {
      $ref: "HorizontalOrigin.json",
      description:
        "The horizontal origin of the billboard, which determines whether the billboard image is left-, center-, or right-aligned with the `position`.",
      default: "CENTER",
    },
    verticalOrigin: {
      $ref: "VerticalOrigin.json",
      description:
        "The vertical origin of the billboard, which determines whether the billboard image is bottom-, center-, or top-aligned with the `position`.",
      default: "CENTER",
    },
    heightReference: {
      $ref: "HeightReference.json",
      description:
        "The height reference of the billboard, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    },
    color: {
      $ref: "Color.json",
      description:
        "The color of the billboard. This color value is multiplied with the values of the billboard's `image` to produce the final color.",
      default: "white",
    },
    rotation: {
      $ref: "Double.json",
      description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
      default: 0.0,
    },
    alignedAxis: {
      $ref: "AlignedAxis.json",
      description:
        "The aligned axis is the unit vector, in world coordinates, that the billboard up vector points towards. The default is the zero vector, which means the billboard is aligned to the screen up vector.",
      default: "[0.0, 0.0, 0.0]",
    },
    sizeInMeters: {
      $ref: "Boolean.json",
      description:
        "Whether this billboard's size (`width` and `height`) should be measured in meters, otherwise size is measured in pixels.",
      default: false,
    },
    width: {
      $ref: "Double.json",
      description:
        "The width of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native width of the image is used.",
    },
    height: {
      $ref: "Double.json",
      description:
        "The height of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native height of the image is used.",
    },
    scaleByDistance: {
      $ref: "NearFarScalar.json",
      description:
        "How the billboard's scale should change based on the billboard's distance from the camera. This scalar value will be multiplied by `scale`.",
    },
    translucencyByDistance: {
      $ref: "NearFarScalar.json",
      description:
        "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
    },
    pixelOffsetScaleByDistance: {
      $ref: "NearFarScalar.json",
      description:
        "How the billboard's pixel offset should change based on the billboard's distance from the camera. This scalar value will be multiplied by `pixelOffset`.",
    },
    imageSubRegion: {
      $ref: "BoundingRectangle.json",
      description:
        "A sub-region of the image which will be used for the billboard, rather than the entire image, measured in pixels from the bottom-left.",
    },
    distanceDisplayCondition: {
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this billboard will be displayed.",
    },
    disableDepthTestDistance: {
      $ref: "Double.json",
      description:
        "The distance from the camera at which to disable the depth test. This can be used to prevent clipping against terrain, for example. When set to zero, the depth test is always applied. When set to Infinity, the depth test is never applied.",
      default: 0.0,
    },
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
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlBillboard;
