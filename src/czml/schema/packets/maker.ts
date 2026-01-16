import { nanoid } from "@/utils/common/nanoid";

import { czmlDocument } from "./document";
import { testFakeData, TCdata, testFakeData2, testFakeData3 } from "./testFakeData1.js";

import colorsvg from "@/assets/images/icons/colors.svg";

export class CzmlDataMaker {
  public id = "czml_" + nanoid(10);
  public name = "czml";
  public _czmlName = "czml";
  public labelZh = "Cesium JSON数据";
  public labelEn = "czml data";
  public title = "Czml";
  public description = "A czml data.";
  public descriptionZh = "";

  public type = "czmlRoot"; // czmlRoot, czmlPacket, czmlEntity, czmlProperty
  public componentType = "czml"; // 是 czml html three(3d) 还是 czml 2d
  public componentProps = "czml";

  public flyTo = true;
  public isRequired = false;
  public isEnable = true;
  // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI

  public packets = {};

  constructor(options: any) {
    this.packets = {};
    const doc = new czmlDocument();
    this.packets[doc.id] = doc;

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

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
  }

  // RJTODO
  // 这样好像也是不能识别有 data 这个属性
  get data() {
    // return testFakeData2;
    return this.getCzmlData();
  }

  // RJTODO
  // 1 要可以手动增加packet;
  // public packets = [new czmlDocument(), new czmlPacket()];

  public getCzmlData() {
    const czmlData = [];
    for (const packet of Object.values(this.packets)) {
      czmlData.push(packet.getCzmlData());
    }

    return czmlData;
  }

  public addPacket(packet: any) {
    this.packets[packet.id] = packet;
  }
}

export default CzmlDataMaker;
