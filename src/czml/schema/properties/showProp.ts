import { nanoid } from "@/utils/common/nanoid";

export const czmlShowOptions = {
  id: "czml_prop_show_" + nanoid(10),
  name: "show",
  czmlName: "show",
  labelZh: "显示",
  labelEn: "show",
  isEnable: true,
  isUsed: true,
  isShowUsed: true,
  description: "Whether or not the object is shown.",
};
