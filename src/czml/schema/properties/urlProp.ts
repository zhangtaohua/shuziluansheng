import { nanoid } from "@/utils/common/nanoid";

import czmlUriProp from "../values/Uri";

export function createImageProp(options = {}) {
  return new czmlUriProp({
    id: "czml_prop_image_" + nanoid(10),
    name: "image",
    czmlName: "image",
    labelZh: "图片链接",
    labelEn: "image uri",
    value: "",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createGltfProp(options = {}) {
  return new czmlUriProp({
    id: "czml_prop_gltf_" + nanoid(10),
    name: "gltf",
    czmlName: "gltf",
    labelZh: "模型链接",
    labelEn: "gltf uri",
    value: "",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}

export function createUriProp(options = {}) {
  return new czmlUriProp({
    id: "czml_prop_uri_" + nanoid(10),
    name: "uri",
    czmlName: "uri",
    labelZh: "链接",
    labelEn: "uri",
    value: "",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}
