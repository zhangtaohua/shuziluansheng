import { nanoid } from "@/utils/common/nanoid";
import { czmlBooleanIntervalProp, czmlShowOptions } from "../properties/BooleanIntervalProp";
import czmlUriProp from "../properties/UriProp";
import czmlStringProp from "../properties/StringProp";
import czmlTextProp from "../properties/TextProp";
import czmlPositionProp from "../properties/PositionProp";
import {
  czmlDoubleProp,
  czmlScaleDoubleOptions,
  czmlDisableDepthTestDistanceDoubleOptions,
} from "../properties/DoubleProp";
import {
  czmlDoublePureProp,
  czmlScalePureOptions,
  czmlRotationPureOptions,
  czmlDisableDepthTestDistancePureOptions,
} from "../properties/DoublePureProp";
import {
  czmlCartesian2Prop,
  czmlPixelOffsetOptions,
  czmlDistanceDisplayConditionOptions,
} from "../properties/Cartesian2Prop";
import { czmlCartesian3PixelProp, czmlEyeOffsetCartesian3PixelOptions } from "../properties/Cartesian3PixelProp";
import {
  czmlOptionsPureProp,
  CzmlHorizontalOriginOptions,
  CzmlVerticalOriginOptions,
  CzmlHeightReferenceOptions,
} from "../properties/OptionsPureProp";
import {
  czmlDoubleFixedNumberProp,
  czmlAlignedAxisDoubleFixedNumberOptions,
} from "../properties/DoubleFixedNumberProp";
import { czmlBooleanPureProp, czmlSizeInMetersOptions } from "../properties/BooleanPureProp";
import { czmlIntegerPureProp, czmlWidthIntPureOptions, czmlHeightIntPureOptions } from "../properties/IntegerPureProp";
import {
  czmlCartesian4Prop,
  czmlScaleByDistanceOptions,
  czmlTranslucencyByDistanceOptions,
  czmlNearFarOptions,
  czmlPixelOffsetScaleByDistanceOptions,
  czmlImageSubRegionOptions,
  czmlBoundingRectangleOptions,
} from "../properties/Cartesian4Prop";
import czmlColorCombineProp from "../properties/ColorCombineProp";
import czmlCombineProp from "../properties/CombinePropertyProp";
import czmlReferencesProp from "../properties/ReferencesProps";

export class czmlBillboardEntity {
  public id = "czml_entity_billboard_" + nanoid(10);
  public name = "billboard";
  public _czmlName = "billboard";
  public labelZh = "广告牌";
  public labelEn = "billboard";
  public title = "Billboard";
  public description =
    "A billboard, or viewport-aligned image. The billboard is positioned in the scene by the `position` property. A billboard is sometimes called a marker.";

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
    show: new czmlBooleanIntervalProp({
      $ref: "Boolean.json",
      default: true,
      ...czmlShowOptions,
    }),
    image: new czmlUriProp({
      $ref: "Uri.json",
      name: "image",
      czmlName: "image",
      isUsed: true,
      isShowUsed: true,
      description:
        'The URI of the image displayed on the billboard. For broadest client compatibility, the URI should be accessible via Cross-Origin Resource Sharing (CORS). The URI may also be a <a href="https://developer.mozilla.org/en/data_URIs">data URI</a>.',
      czmlRequiredForDisplay: true,
    }),
    scale: new czmlDoubleProp({
      ...czmlScaleDoubleOptions,
      $ref: "Double.json",
      description:
        "The scale of the billboard. The scale is multiplied with the pixel size of the billboard's `image`. For example, if the scale is 2.0, the billboard will be rendered with twice the number of pixels, in each direction, of the `image`.",
      default: 1.0,
    }),
    // scale: new czmlDoublePureProp({
    //   ...czmlScalePureOptions,
    //   $ref: "Double.json",
    //   description:
    //     "The scale of the billboard. The scale is multiplied with the pixel size of the billboard's `image`. For example, if the scale is 2.0, the billboard will be rendered with twice the number of pixels, in each direction, of the `image`.",
    //   default: 1.0,
    // }),
    pixelOffset: new czmlCombineProp({
      name: "backgroundPadding",
      czmlName: "backgroundPadding",
      labelZh: "背景填充",
      labelEn: "background padding",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "PixelOffset.json",
      description:
        "The offset, in viewport pixels, of the billboard origin from the `position`. A pixel offset is the number of pixels up and to the right to place the billboard, relative to the `position`.",
      default: [0.0, 0.0],
      properties: {
        cartesian2: new czmlCartesian2Prop({
          name: "cartesian2",
          czmlName: "cartesian2",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [0.0, 0.0],
          $ref: "Values/Cartesian2Value.json",
          description:
            "The pixel offset specified as a two-dimensional Cartesian value `[X, Y]`, in viewport coordinates in pixels, where X is pixels to the right and Y is pixels up.",
          default: [0.0, 0.0],
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    eyeOffset: new czmlCombineProp({
      name: "eyeOffset",
      czmlName: "eyeOffset",
      labelZh: "观察偏移",
      labelEn: "eyeOffset",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "EyeOffset.json",
      description:
        "The eye offset of the billboard, which is the offset in eye coordinates at which to place the billboard relative to the `position` property. Eye coordinates are a left-handed coordinate system where the X-axis points toward the viewer's right, the Y-axis points up, and the Z-axis points into the screen.",
      default: [0.0, 0.0, 0.0],
      properties: {
        cartesian: new czmlCartesian3PixelProp({
          name: "cartesian",
          czmlName: "cartesian",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [0.0, 0.0, 0.0],
          $ref: "Values/Cartesian3Value.json",
          description:
            "The eye offset specified as a three-dimensional Cartesian value `[X, Y, Z]`, in eye coordinates in meters. If the array has three elements, the eye offset is constant. If it has four or more elements, they are time-tagged samples arranged as `[Time, X, Y, Z, Time, X, Y, Z, ...]`, where Time is an ISO 8601 date and time string or seconds since epoch.",
          default: [0.0, 0.0, 0.0],
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    horizontalOrigin: new czmlCombineProp({
      name: "horizontalOrigin",
      czmlName: "horizontalOrigin",
      labelZh: "水平原点",
      labelEn: "horizontal origin",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "HorizontalOrigin.json",
      description:
        "The horizontal origin of the label. It controls whether the label is left-, center-, or right-aligned with the `position`.",
      default: "CENTER",
      properties: {
        horizontalOrigin: new czmlOptionsPureProp({
          ...CzmlHorizontalOriginOptions,
          $ref: "Values/HorizontalOriginValue.json",
          description: "The horizontal origin.",
          default: "CENTER",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    verticalOrigin: new czmlCombineProp({
      name: "horizontalOrigin",
      czmlName: "horizontalOrigin",
      labelZh: "水平原点",
      labelEn: "horizontal origin",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "VerticalOrigin.json",
      description:
        "The vertical origin of the label. It controls whether the label image is bottom-, center-, or top-aligned with the `position`.",
      default: "CENTER",
      properties: {
        verticalOrigin: new czmlOptionsPureProp({
          ...CzmlVerticalOriginOptions,
          $ref: "Values/VerticalOriginValue.json",
          description: "The vertical origin.",
          default: "CENTER",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    heightReference: new czmlCombineProp({
      name: "horizontalOrigin",
      czmlName: "horizontalOrigin",
      labelZh: "水平原点",
      labelEn: "horizontal origin",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "HeightReference.json",
      description: "The height reference of the label, which indicates if the position is relative to terrain or not.",
      default: "NONE",
      properties: {
        heightReference: new czmlOptionsPureProp({
          ...CzmlHeightReferenceOptions,
          $ref: "Values/HeightReferenceValue.json",
          description: "The height reference.",
          default: "NONE",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    color: new czmlColorCombineProp({
      $ref: "Color.json",
      isUsed: false,
      isShowUsed: true,
      description:
        "The color of the billboard. This color value is multiplied with the values of the billboard's `image` to produce the final color.",
      default: "white",
    }),
    rotation: new czmlDoublePureProp({
      ...czmlRotationPureOptions,
      $ref: "Double.json",
      description: "The rotation of the billboard, in radians, counter-clockwise from the alignedAxis.",
      value: 0.0,
      default: 0.0,
    }),
    alignedAxis: new czmlCombineProp({
      name: "alignedAxis",
      czmlName: "alignedAxis",
      labelZh: "对齐轴",
      labelEn: "aligned axis",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "AlignedAxis.json",
      description:
        "The aligned axis is the unit vector, in world coordinates, that the billboard up vector points towards. The default is the zero vector, which means the billboard is aligned to the screen up vector.",
      default: [0.0, 0.0, 0.0],
      properties: {
        unitCartesian: new czmlCartesian3PixelProp({
          name: "unitCartesian",
          czmlName: "unitCartesian",
          labelZh: "单位XYZ",
          labelEn: "unit cartesian",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          $ref: "Values/UnitCartesian3Value.json",
          description:
            "The axis specified as a three-dimensional unit magnitude Cartesian value `[X, Y, Z]`, in world coordinates.",
        }),
        unitSpherical: new czmlCartesian2Prop({
          name: "unitCartesian",
          czmlName: "unitCartesian",
          labelZh: "单位球角度",
          labelEn: "unit cartesian",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          tag: "CzmlUnitSphericalPropInput",
          $ref: "Values/UnitSphericalValue.json",
          description:
            "The axis specified as a unit spherical value `[Clock, Cone]`, in radians. The clock angle is measured in the XY plane from the positive X axis toward the positive Y axis. The cone angle is the angle from the positive Z axis toward the negative Z axis.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
        velocityReference: new czmlReferencesProp({
          name: "velocityReference",
          czmlName: "velocityReference",
          labelZh: "速率参考",
          labelEn: "velocity reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/VelocityReferenceValue.json",
          description:
            "The axis specified as the normalized velocity vector of a position property. The reference must be to a `position` property.",
        }),
      },
    }),
    sizeInMeters: new czmlBooleanPureProp({
      ...czmlSizeInMetersOptions,
      $ref: "Boolean.json",
      description:
        "Whether this billboard's size (`width` and `height`) should be measured in meters, otherwise size is measured in pixels.",
      default: false,
    }),
    width: new czmlIntegerPureProp({
      ...czmlWidthIntPureOptions,
      $ref: "Double.json",
      description:
        "The width of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native width of the image is used.",
    }),
    height: new czmlIntegerPureProp({
      ...czmlHeightIntPureOptions,
      $ref: "Double.json",
      description:
        "The height of the billboard, in pixels (or meters, if `sizeInMeters` is true). By default, the native height of the image is used.",
    }),
    scaleByDistance: new czmlCombineProp({
      ...czmlScaleByDistanceOptions,
      tag: "CzmlCombineSmPropInput",
      $ref: "NearFarScalar.json",
      description:
        "How the label's scale should change based on the label's distance from the camera. This scalar value will be multiplied by `scale`.",
      properties: {
        nearFarScalar: new czmlCartesian4Prop({
          ...czmlNearFarOptions,
          $ref: "NearFarScalar.json",
          description:
            "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    translucencyByDistance: new czmlCombineProp({
      name: "translucencyByDistance",
      czmlName: "translucencyByDistance",
      labelZh: "透明度距离",
      labelEn: "translucency by distance",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      tag: "CzmlCombineSmPropInput",
      $ref: "NearFarScalar.json",
      description:
        "How the label's translucency should change based on the label's distance from the camera. This scalar value should range from 0 to 1.",
      properties: {
        nearFarScalar: new czmlCartesian4Prop({
          ...czmlNearFarOptions,
          $ref: "NearFarScalar.json",
          description:
            "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    pixelOffsetScaleByDistance: new czmlCombineProp({
      ...czmlPixelOffsetScaleByDistanceOptions,
      tag: "CzmlCombineSmPropInput",
      $ref: "NearFarScalar.json",
      description:
        "How the label's pixel offset should change based on the label's distance from the camera. This scalar value will be multiplied by `pixelOffset`.",
      properties: {
        nearFarScalar: new czmlCartesian4Prop({
          ...czmlNearFarOptions,
          $ref: "NearFarScalar.json",
          description:
            "How the billboard's translucency should change based on the billboard's distance from the camera. This scalar value should range from 0 to 1.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    imageSubRegion: new czmlCombineProp({
      name: "imageSubRegion",
      czmlName: "imageSubRegion",
      labelZh: "图像子域",
      labelEn: "image sub region",
      isEnable: true,
      isUsed: false,
      isShowUsed: true,
      tag: "CzmlCombineSmPropInput",
      $ref: "BoundingRectangle.json",
      description:
        "A sub-region of the image which will be used for the billboard, rather than the entire image, measured in pixels from the bottom-left.",
      properties: {
        boundingRectangle: new czmlCartesian4Prop({
          name: "boundingRectangle",
          czmlName: "boundingRectangle",
          labelZh: "包围矩形",
          labelEn: "bounding rectangle",
          tag: "CzmlBoundingRectanglePropInput",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/BoundingRectangleValue.json",
          description: "The bounding rectangle specified as `[X, Y, Width, Height]`.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The bounding rectangle specified as a reference to another property.",
        }),
      },
    }),

    distanceDisplayCondition: new czmlCombineProp({
      ...czmlDistanceDisplayConditionOptions,
      tag: "CzmlCombineSmPropInput",
      $ref: "DistanceDisplayCondition.json",
      description:
        "The display condition specifying the distance from the camera at which this label will be displayed.",
      properties: {
        distanceDisplayCondition: new czmlCartesian2Prop({
          ...czmlDistanceDisplayConditionOptions,
          $ref: "DistanceDisplayCondition.json",
          description:
            "The display condition specifying the distance from the camera at which this billboard will be displayed.",
        }),
        reference: new czmlReferencesProp({
          name: "reference",
          czmlName: "reference",
          labelZh: "参考",
          labelEn: "reference",
          value: "",
          isEnable: true,
          isUsed: false,
          isShowUsed: true,
          $ref: "Values/ReferenceValue.json",
          description: "The pixel offset specified as a reference to another property.",
        }),
      },
    }),
    disableDepthTestDistance: new czmlDoubleProp({
      ...czmlDisableDepthTestDistanceDoubleOptions,
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
        [this.name]: this.getCzmlValue(),
      };
    } else {
      return null;
    }
  }
}

export default czmlBillboardEntity;
