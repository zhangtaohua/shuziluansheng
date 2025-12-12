import { nanoid } from "@/utils/common/nanoid";
import { czmlBooleanIntervalProp, czmlShowOptions } from "../properties/BooleanIntervalProp";
import czmlUriProp from "../properties/UriProp";
import { czmlStringProp, czmlFontOptions } from "../properties/StringProp";
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
  CzmlLabelStyleOptions,
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

export class czmlLableEntity {
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
    show: new czmlBooleanIntervalProp({
      ...czmlShowOptions,
      $ref: "Boolean.json",
      description: "Whether or not the label is shown.",
      default: true,
    }),
    text: new czmlTextProp({
      name: "text",
      czmlName: "text",
      isUsed: true,
      isShowUsed: true,
      $ref: "String.json",
      description: "The text displayed by the label. The newline character (\\n) indicates line breaks.",
    }),
    font: new czmlStringProp({
      ...czmlFontOptions,
      $ref: "Font.json",
      description: "The font to use for the label.",
      default: "30px sans-serif",
    }),
    style: new czmlCombineProp({
      name: "style",
      czmlName: "style",
      labelZh: "样式",
      labelEn: "style",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "LabelStyle.json",
      description: "The style of the label.",
      default: "FILL",
      properties: {
        labelStyle: new czmlOptionsPureProp({
          ...CzmlLabelStyleOptions,
          $ref: "Values/LabelStyleValue.json",
          description: "The label style.",
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
          description: "The label style specified as a reference to another property.",
        }),
      },
    }),
    scale: new czmlDoubleProp({
      name: "cellAlpha",
      czmlName: "cellAlpha",
      labelZh: "间隔透明度",
      labelEn: "cellAlpha",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      value: [0.1],
      $ref: "Double.json",
      description:
        "The scale of the label. The scale is multiplied with the pixel size of the label's text. For example, if the scale is 2.0, the label will be rendered with twice the number of pixels, in each direction, of the text.",
      default: 1.0,
    }),
    showBackground: new czmlBooleanIntervalProp({
      name: "showBackground",
      czmlName: "showBackground",
      labelZh: "显示背景",
      labelEn: "showBackground",
      value: false,
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "Boolean.json",
      description: "Whether or not a background behind the label is shown.",
      default: false,
    }),
    backgroundColor: new czmlColorCombineProp({
      labelZh: "背景色",
      labelEn: "background color",
      czmlName: "backgroundColor",
      isUsed: true,
      isShowUsed: true,
      $ref: "Color.json",
      description: "The color of the background behind the label.",
      default: "[0.165, 0.165, 0.165, 0.8]",
    }),
    backgroundPadding: new czmlCombineProp({
      name: "backgroundPadding",
      czmlName: "backgroundPadding",
      labelZh: "背景填充",
      labelEn: "background padding",
      isEnable: true,
      isUsed: true,
      isShowUsed: true,
      $ref: "BackgroundPadding.json",
      description: "The amount of padding between the text and the label's background.",
      default: [7, 5],
      properties: {
        cartesian2: new czmlCartesian2Prop({
          name: "cartesian2",
          czmlName: "cartesian2",
          isEnable: true,
          isUsed: true,
          isShowUsed: true,
          value: [7, 5],
          $ref: "Values/Cartesian2Value.json",
          description:
            "The background padding specified as a two-dimensional Cartesian value `[X, Y]`, in pixels, where X is the horizontal padding, and Y is the vertical padding.",
          default: [7, 5],
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
          description: "The background padding specified as a reference to another property.",
        }),
      },
    }),
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
        "The offset, in viewport pixels, of the label origin from the `position`. A pixel offset is the number of pixels up and to the right to place the label, relative to the `position`.",
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
        "The eye offset of the label, which is the offset in eye coordinates at which to place the label relative to the `position` property. Eye coordinates are a left-handed coordinate system where the X-axis points toward the viewer's right, the Y-axis points up, and the Z-axis points into the screen.",
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
    fillColor: new czmlColorCombineProp({
      labelZh: "填充色",
      labelEn: "fill color",
      czmlName: "fillColor",
      isUsed: true,
      isShowUsed: true,
      $ref: "Color.json",
      description: "The fill color of the label.",
      default: "white",
    }),
    outlineColor: new czmlColorCombineProp({
      id: "czml_prop_outlineColor_" + nanoid(10),
      name: "outlineColor",
      czmlName: "outlineColor",
      labelZh: "轮廓颜色",
      labelEn: "outline color",
      $ref: "Color.json",
      description: "The outline color of the label.",
      default: "black",
    }),
    outlineWidth: new czmlDoubleProp({
      id: "czml_prop_outlineWidth_" + nanoid(10),
      name: "outlineWidth",
      czmlName: "outlineWidth",
      labelZh: "轮廓线宽",
      labelEn: "outline width",
      $ref: "Double.json",
      description: "The width of the box outline.",
      value: [1.0],
      default: [1.0],
    }),
    translucencyByDistance: new czmlCombineProp({
      ...czmlTranslucencyByDistanceOptions,
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

export default czmlLableEntity;
