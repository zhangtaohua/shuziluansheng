import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createCartesian2Prop } from "./cartesian2Prop";

export function createCoordinatesProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_coordinates_" + nanoid(10),
    name: "coordinates",
    czmlName: "coordinates",
    labelZh: "矩形坐标",
    labelEn: "coordinates",
    tag: "CzmlCombineSmPropInput",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    $ref: "RectangleCoordinates.json",
    description: "A set of coordinates describing a cartographic rectangle on the surface of the ellipsoid.",
    descriptionZh: "",
    ...options,
    properties: {
      wsen: {
        isUsed: false,
        $ref: "Values/CartographicRectangleRadiansValue.json",
        description:
          "The set of coordinates specified as Cartographic values `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in radians.",
      },
      wsenDegrees: {
        isUsed: false,
        $ref: "Values/CartographicRectangleDegreesValue.json",
        description:
          "The set of coordinates specified as Cartographic values `[WestLongitude, SouthLatitude, EastLongitude, NorthLatitude]`, with values in degrees.",
      },
      reference: createReferenceProp({
        isUsed: false,
        $ref: "Values/ReferenceValue.json",
        description: "The set of coordinates specified as a reference to another property.",
      }),
    },
  });
}
