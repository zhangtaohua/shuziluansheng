import { nanoid } from "@/utils/common/nanoid";

import { czmlPacketV2 } from "./packetV2";
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
  public type = "czml";
  public componentType = "czml"; // 是 czml html three(3d)
  public flyTo = true;
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
  public isShowUsed = true;
  public isExpand = true; // for UI

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

  get czmlName() {
    return this._czmlName;
  }

  set czmlName(newValue) {
    return;
  }

  // RJTODO 后期要用 set 实现
  public data = testFakeData2;

  // RJTODO
  // 1 要可以手动增加packet;
  public packets = [new czmlDocument(), new czmlPacketV2()];

  public getCzmlData() {
    const czmlData = [];
    for (let i = 0; i < this.packets.length; i++) {
      const packet = this.packets[i];
      czmlData.push(packet.getCzmlData());
    }

    return czmlData;
  }
}

export default CzmlDataMaker;
