import { nanoid } from "@/utils/common/nanoid";

import { createShowProp } from "../properties/booleanProp";
import { createUriProp } from "../properties/urlProp";
import { createMaximumScreenSpaceErrorDoubleProp } from "../properties/doubleProp";

export class czmlTilesetEntity {
  public id = "czml_entity_tileset_" + nanoid(10);
  public name = "tileset";
  public _czmlName = "tileset";
  public labelZh = "数据集";
  public labelEn = "tileset";
  public title = "3D Tiles Tileset";
  public description = "A 3D Tiles tileset.";
  public descriptionZh = "";

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
      this.id = "czml_entity_tileset_" + options.name + "_" + nanoid(10);
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
      $ref: "Boolean.json",
      description: "Whether or not the tileset is shown.",
      default: true,
    }),
    uri: createUriProp({
      isUsed: false,
      $ref: "Uri.json",
      description:
        "The URI of a 3D tiles tileset. For broadest client compatibility, the URI should be accessible via Cross-Origin Resource Sharing (CORS).",
      czmlRequiredForDisplay: true,
    }),
    maximumScreenSpaceError: createMaximumScreenSpaceErrorDoubleProp({
      isUsed: false,
      $ref: "Double.json",
      description: "The maximum screen space error used to drive level of detail refinement.",
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

export default czmlTilesetEntity;
