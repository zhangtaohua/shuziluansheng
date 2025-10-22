import { nanoid } from "@/utils/common/nanoid";

import { czmlPacket } from "./packet";
import { czmlDocument } from "./document";

import colorsvg from "@/assets/images/icons/colors.svg";

export class CzmlDataMaker {
  public id = "czml_" + nanoid(10);
  public name = "czml";
  public labelZh = "Cesium JSON数据";
  public labelEn = "czml data";
  public title = "Czml";
  public description = "A czml data.";
  public type = "czml";
  public componentType = "czml"; // 是 czml html three(3d)
  public flyTo = true;
  public isEnable = true; // for can edit
  public isUsed = true; // for can used
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
    if (options.labelZh) {
      this.labelZh = options.labelZh;
    }
    if (options.labelEn) {
      this.labelEn = options.labelEn;
    }
    if (options.description) {
      this.description = options.description;
    }
  }

  // TODO 后期要用 set 实现
  public data = [
    {
      version: "1.0",
      id: "document",
      clock: {
        interval: "2019-03-27T05:57:05.33299999999871943Z/2019-03-28T05:57:47.33299999999871943Z",
        currentTime: "2019-03-27T05:57:05.33299999999871943Z",
        multiplier: 1,
      },
    },
    {
      id: "油田联合站",
      position: {
        cartographicDegrees: [121.92203, 23.896242, 1.99],
      },
      billboard: {
        image: colorsvg,
        scale: 1.0,

        rotation: 1.3,
        horizontalOrigin: "CENTER",
        verticalOrigin: "CENTER",

        show: true,
        sizeInMeters: false,
        width: 32,
        height: 32,
        // scaleByDistance: {
        //   nearFarScalar: [1.0, 2.0, 10000.0, 3.0],
        // },
        // translucencyByDistance: {
        //   nearFarScalar: [1.0, 1.0, 10000.0, 0.0],
        // },
        // pixelOffsetScaleByDistance: {
        //   nearFarScalar: [1.0, 20.0, 10000.0, 30.0],
        // },
      },
    },
  ];

  // todo
  // 1 要可以手动增加packet;
  public packets = [new czmlDocument(), new czmlPacket()];

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
