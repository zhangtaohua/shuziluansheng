import { nanoid } from "@/utils/common/nanoid";
import {
  createEnvironmentConstraintProp,
  createshowDomeSurfacesProp,
  createShowEllipsoidHorizonSurfacesProp,
  createShowEllipsoidSurfacesProp,
  createShowEnvironmentIntersectionProp,
  createShowEnvironmentOcclusionProp,
  createShowIntersectionProp,
  createShowLateralSurfacesProp,
  createShowProp,
  createShowThroughEllipsoidProp,
  createShowViewshedProp,
} from "../properties/booleanProp";
import {
  createEnvironmentIntersectionWidthDoubleProp,
  createIntersectionWidthDoubleProp,
  createRadiusDoubleProp,
} from "../properties/doubleProp";
import {
  createDomeSurfaceMaterialProp,
  createEllipsoidHorizonSurfaceMaterialProp,
  createEllipsoidSurfaceMaterialProp,
  createEnvironmentOcclusionMaterialProp,
  createLateralSurfaceMaterialProp,
} from "../properties/materialProp";
import {
  createEnvironmentIntersectionColorProp,
  createIntersectionColorProp,
  createViewshedOccludedColorProp,
  createViewshedVisibleColorProp,
} from "../properties/colorProp";
import { createViewshedResolutionIntegerProp } from "../properties/integerProp";
import { createPortionToDisplayCombineProp } from "../properties/agiSensorVolumePortionToDisplay";
import { createDirectionsProp } from "../properties/directionProp";

export class czmlAgiCustomPatternSensorEntity {
  public id = "czml_entity_agi_customPatternSensor_" + nanoid(10);
  public name = "agi_customPatternSensor";
  public _czmlName = "agi_customPatternSensor";
  public labelZh = "自定义模式传感器";
  public labelEn = "agi custom pattern sensor";
  public title = "agi_customPatternSensor";
  public description = "A custom pattern sensor volume taking into account occlusion of an ellipsoid, i.e., the globe.";
  public descriptionZh = "自定义模式传感器";

  public type = "entity";
  public componentType = "czml#packet#entity";
  public tag = "CzmlEntityRender";
  public isRequired = false;
  public isEnable = true;
  // for can edit
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
      this.id = "czml_entity_agi_customPatternSensor_" + options.name + "_" + nanoid(10);
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

    this.isRequired = options.isRequired ?? false;
    this.isEnable = options.isEnable ?? true;
    this.isUsed = options.isUsed ?? true;
    this.isShowUsed = options.isShowUsed ?? true;
    this.isExpand = options.isExpand ?? true;
  }

  public properties = {
    show: createShowProp({
      $ref: "../../Boolean.json",
      description: "Whether or not the entire conical sensor is shown.",
      default: true,
    }),
    directions: createDirectionsProp({
      isUsed: false,
      $ref: "../../DirectionList.json",
      description: "The list of directions defining the custom sensor.",
      czmlRequiredForDisplay: true,
    }),
    radius: createRadiusDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The radial limit of the sensor.",
      // default: "Infinity",
    }),
    showIntersection: createShowIntersectionProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not the intersection of the sensor with the Earth is shown.",
      default: true,
    }),
    intersectionColor: createIntersectionColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the intersection of the sensor with the Earth.",
      default: "white",
    }),
    intersectionWidth: createIntersectionWidthDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The width of the intersection in pixels.",
      default: 1.0,
    }),
    showLateralSurfaces: createShowLateralSurfacesProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not the lateral surfaces, i.e., the outer sides of the sensor, are shown.",
      default: true,
    }),
    lateralSurfaceMaterial: createLateralSurfaceMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to use for the sensor's lateral surface, i.e., the outer sides of the sensor.",
      default: "solid white",
    }),
    showEllipsoidSurfaces: createShowEllipsoidSurfacesProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not ellipsoid surfaces are shown.",
      default: true,
    }),
    ellipsoidSurfaceMaterial: createEllipsoidSurfaceMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to use for the sensor's ellipsoid surfaces.",
      default: "solid white",
    }),
    showEllipsoidHorizonSurfaces: createShowEllipsoidHorizonSurfacesProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not ellipsoid horizon surfaces are shown.",
      default: true,
    }),
    ellipsoidHorizonSurfaceMaterial: createEllipsoidHorizonSurfaceMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to use for the sensor's ellipsoid horizon surfaces.",
      default: "solid white",
    }),
    showDomeSurfaces: createshowDomeSurfacesProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not dome surfaces are shown.",
      default: true,
    }),
    domeSurfaceMaterial: createDomeSurfaceMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to use for the sensor's dome surfaces.",
      default: "solid white",
    }),
    portionToDisplay: createPortionToDisplayCombineProp({
      isUsed: false,
      $ref: "../../Extensions/AGI/SensorVolumePortionToDisplay.json",
      description: "What part of the sensor should be displayed.",
      default: "COMPLETE",
    }),
    environmentConstraint: createEnvironmentConstraintProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description:
        "Whether or not the sensor will be occluded by objects in the current view of the environment, e.g. visible terrain or models.",
      default: false,
    }),
    showEnvironmentOcclusion: createShowEnvironmentOcclusionProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description:
        "Whether or not the portion of the terrain occluded by the environment will be drawn with a separate material.",
      default: false,
    }),
    environmentOcclusionMaterial: createEnvironmentOcclusionMaterialProp({
      isUsed: false,
      $ref: "../../Material.json",
      description: "The material to use for the portion of the sensor occluded by the environment.",
      default: "solid white",
    }),
    showEnvironmentIntersection: createShowEnvironmentIntersectionProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not a line showing where the sensor intersects the environment will be drawn.",
      default: false,
    }),
    environmentIntersectionColor: createEnvironmentIntersectionColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the intersection line between the sensor and the environment.",
      default: "white",
    }),
    environmentIntersectionWidth: createEnvironmentIntersectionWidthDoubleProp({
      isUsed: false,
      $ref: "../../Double.json",
      description: "The width in meters of the intersection line between the sensor and the environment.",
      default: 5.0,
    }),
    showThroughEllipsoid: createShowThroughEllipsoidProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description:
        "Whether or not a sensor intersecting the ellipsoid is drawn through the ellipsoid and potentially out to the other side.",
      default: false,
    }),
    showViewshed: createShowViewshedProp({
      isUsed: false,
      $ref: "../../Boolean.json",
      description: "Whether or not the viewshed of the sensor will be drawn.",
      default: false,
    }),
    viewshedVisibleColor: createViewshedVisibleColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the scene geometry that is visible to the sensor.",
      default: "lime, 50% transparent",
    }),
    viewshedOccludedColor: createViewshedOccludedColorProp({
      isUsed: false,
      $ref: "../../Color.json",
      description: "The color of the scene geometry that is not visible to the sensor.",
      default: "red, 50% transparent",
    }),
    viewshedResolution: createViewshedResolutionIntegerProp({
      isUsed: false,
      $ref: "../../Integer.json",
      description: "The resolution in pixels of the viewshed.",
      default: 2048,
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

export default czmlAgiCustomPatternSensorEntity;
