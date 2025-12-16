import { nanoid } from "@/utils/common/nanoid";
import {
  createIncrementallyLoadTexturesProp,
  createRunAnimationsProp,
  createShowProp,
} from "../properties/booleanProp";
import { createGltfProp } from "../properties/urlProp";
import {
  createColorBlendAmountDoubleProp,
  createMiniMumPixelSizeDoubleProp,
  createScaleDoubleProp,
} from "../properties/doubleProp";
import { createShadowsProp } from "../properties/shadowsProp";
import { createHeightReferenceProp } from "../properties/heightReferenceProp";
import { createColorProp, createSilhouetteColorProp } from "../properties/colorProp";
import { createColorBlendModeProp } from "../properties/optionsProp";
import { createDistanceDisplayConditionProp } from "../properties/distanceDisplayConditionProp";
import { createArticulationsProp } from "../properties/articulationProp";
import { createNodeTransformationsProp } from "../properties/nodeTransformationProp";

export class czmlModelEntity {
  public id = "czml_entity_model_" + nanoid(10);
  public name = "model";
  public _czmlName = "model";
  public labelZh = "模型";
  public labelEn = "model";
  public title = "model";
  public description = "A 3D model.";

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
      description: "Whether or not the model is shown.",
      default: true,
    }),
    gltf: createGltfProp({
      $ref: "Uri.json",
      description:
        'The URI of a <a href="https://github.com/KhronosGroup/glTF">glTF</a> model. For broadest client compatibility, the URI should be accessible via Cross-Origin Resource Sharing (CORS). The URI may also be a <a href="https://developer.mozilla.org/en/data_URIs">data URI</a>.',
      czmlRequiredForDisplay: true,
    }),
    scale: createScaleDoubleProp({
      $ref: "Double.json",
      description: "The scale of the model.",
      default: 1.0,
    }),
    minimumPixelSize: createMiniMumPixelSizeDoubleProp({
      $ref: "Double.json",
      description: "The approximate minimum pixel size of the model regardless of zoom.",
      default: 0.0,
    }),
    maximumScale: createScaleDoubleProp({
      $ref: "Double.json",
      description: "The maximum scale size of the model. This is used as an upper limit for `minimumPixelSize`.",
    }),
    incrementallyLoadTextures: createIncrementallyLoadTexturesProp({
      $ref: "Boolean.json",
      description: "Whether or not the model can be rendered before all textures have loaded.",
      default: true,
    }),
    runAnimations: createRunAnimationsProp({
      $ref: "Boolean.json",
      description: "Whether or not to run all animations defined in the glTF model.",
      default: true,
    }),
    shadows: createShadowsProp({
      $ref: "ShadowMode.json",
      description: "Whether or not the model casts or receives shadows.",
      default: "ENABLED",
    }),
    heightReference: createHeightReferenceProp({
      $ref: "HeightReference.json",
      description: "The height reference of the model, which indicates if the position is relative to terrain or not.",
      default: "NONE",
    }),
    silhouetteColor: createSilhouetteColorProp({
      $ref: "Color.json",
      description: "The color of the silhouette drawn around the model.",
      default: "red",
    }),
    silhouetteSize: createSilhouetteColorProp({
      $ref: "Double.json",
      description: "The size, in pixels, of the silhouette drawn around the model.",
      default: 0.0,
    }),
    color: createColorProp({
      $ref: "Color.json",
      description: "The color to blend with the model's rendered color.",
      default: "white",
    }),
    colorBlendMode: createColorBlendModeProp({
      $ref: "ColorBlendMode.json",
      description: "The mode to use for blending between `color` and the model's color.",
      default: "HIGHLIGHT",
    }),
    colorBlendAmount: createColorBlendAmountDoubleProp({
      $ref: "Double.json",
      description:
        "The color strength when `colorBlendMode` is `MIX`. A value of 0.0 results in the model's rendered color while a value of 1.0 results in a solid color, with any value in-between resulting in a mix of the two.",
      default: 0.5,
    }),
    distanceDisplayCondition: createDistanceDisplayConditionProp({
      $ref: "DistanceDisplayCondition.json",
      description: "The display condition specifying at what distance from the camera this model will be displayed.",
    }),
    nodeTransformations: createNodeTransformationsProp({
      nodeArrays: [
        {
          nodeName: "testnode1",
        },
        {
          nodeName: "testnode2",
        },
      ],
      $ref: "NodeTransformations.json",
      czmlExamples: ["Examples/ModelNodeTransformations.json"],
    }),
    articulations: createArticulationsProp({
      $ref: "Articulations.json",
      czmlExamples: ["Examples/ModelArticulations.json"],
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

export default czmlModelEntity;
