import { nanoid } from "@/utils/common/nanoid";
import czmlCombineProp from "../values/CombinePropert";
import { createReferenceProp } from "./referenceProp";
import { createSensorVolumePortionToDisplayProp } from "./optionsProp";

export function createPortionToDisplayCombineProp(options = {}) {
  return new czmlCombineProp({
    id: "czml_prop_portionToDisplay_" + nanoid(10),
    name: "portionToDisplay",
    czmlName: "portionToDisplay",
    labelZh: "显示部分",
    labelEn: "portion to display",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    $ref: "SensorVolumePortionToDisplay.json",
    description: "The part of a sensor that should be displayed.",
    descriptionZh: "",
    ...options,
    properties: {
      portionToDisplay: createSensorVolumePortionToDisplayProp({
        czmlName: "portionToDisplay",
        $ref: "../../Extensions/AGI/SensorVolumePortionToDisplayValue.json",
        description: "The part of a sensor to display.",
      }),
      reference: createReferenceProp({
        $ref: "../../Values/ReferenceValue.json",
        description: "The part of a sensor to display, specified as a reference to another property.",
      }),
    },
  });
}
