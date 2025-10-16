import { nanoid } from "@/utils/common/nanoid";

import { czmlPacket } from "./packet";
import { czmlDocument } from "./document";

import colorsvg from "@/assets/images/icons/colors.svg";

export class CzmlDataMaker {
  public id = "czml_data_" + nanoid(10);
  public name = "czml";
  public title = "czml";
  public description = "A czml data.";
  public type = "object";
  public componentType = "czml";
  public flyTo = true;
  public isEnable = true;

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
  public properties = [new czmlDocument(), new czmlPacket()];
}
