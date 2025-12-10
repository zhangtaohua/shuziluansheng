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
  CzmlShadowModeOptions,
} from "../properties/OptionsPureProp";
import czmlColorProp from "../properties/ColorProp";
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
  czmlPixelOffsetScaleByDistanceOptions,
  czmlImageSubRegionOptions,
  czmlBoundingRectangleOptions,
} from "../properties/Cartesian4Prop";
import { czmlCombineProp, czmlBoxDimensionsOptions } from "../properties/combinePropertyProp";

export class czmlBoxEntity {
  public id = "czml_entity_box_" + nanoid(10);
  public name = "box";
  public _czmlName = "box";
  public labelZh = "广告牌";
  public labelEn = "box";
  public title = "box";
  public description =
    "A box, which is a closed rectangular cuboid. The box is positioned and oriented using the `position` and `orientation` properties.";

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
      this.id = "czml_entity_box_" + options.name + "_" + nanoid(10);
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
      description: "Whether or not the box is shown.",
      default: true,
    }),
    dimensions: new czmlCombineProp({
      ...czmlBoxDimensionsOptions,
      $ref: "BoxDimensions.json",
      description: "The dimensions of the box.",
      czmlRequiredForDisplay: true,
    }),
    heightReference: new czmlOptionsPureProp({
      ...CzmlHeightReferenceOptions,
      $ref: "HeightReference.json",
      description:
        "The height reference of the billboard, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    fill: new czmlBooleanIntervalProp({
      ...czmlShowOptions,
      id: "czml_prop_fill_" + nanoid(10),
      name: "fill",
      czmlName: "fill",
      labelZh: "填充",
      labelEn: "fill",
      $ref: "Boolean.json",
      description: "Whether or not the box is filled.",
      default: true,
    }),
    material: {
      $ref: "Material.json",
      description: "The material to display on the surface of the box.",
      default: "solid white",
    },
    outline: new czmlBooleanIntervalProp({
      ...czmlShowOptions,
      id: "czml_prop_outline_" + nanoid(10),
      name: "outline",
      czmlName: "outline",
      labelZh: "轮廓线",
      labelEn: "outline",
      $ref: "Boolean.json",
      description: "Whether or not the box is outlined.",
      default: false,
    }),
    outlineColor: new czmlColorProp({
      id: "czml_prop_outlineColor_" + nanoid(10),
      name: "outlineColor",
      czmlName: "outlineColor",
      labelZh: "轮廓颜色",
      labelEn: "outline color",
      $ref: "Color.json",
      description: "The color of the box outline.",
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
      default: 1.0,
    }),
    shadows: new czmlOptionsPureProp({
      ...CzmlShadowModeOptions,
      $ref: "ShadowMode.json",
      description: "Whether or not the box casts or receives shadows.",
      default: "DISABLED",
    }),
    distanceDisplayCondition: new czmlCartesian2Prop({
      ...czmlDistanceDisplayConditionOptions,
      $ref: "DistanceDisplayCondition.json",
      description: "The display condition specifying the distance from the camera at which this box will be displayed.",
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

export default czmlBoxEntity;
