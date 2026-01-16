import { nanoid } from "@/utils/common/nanoid";
import czmlStringProp from "../values/String";
import czmlTextProp from "../values/Text";

export function createStringProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_string_" + nanoid(10),
    name: "string",
    czmlName: "string",
    labelZh: "字符串",
    labelEn: "string",
    value: "",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description: `The property specified as a string.`,
    descriptionZh: "",
    ...options,
  });
}

export function createIdProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_id_" + nanoid(10),
    name: "id",
    czmlName: "id",
    labelZh: "标示",
    labelEn: "id",
    value: "id",
    isRequired: true,
    isEnable: false,
    isUsed: true,
    isShowUsed: true,
    description: "Describes a CZML document.",
    descriptionZh: "",
    ...options,
  });
}

export function createNameProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_name_" + nanoid(10),
    name: "name",
    czmlName: "name",
    labelZh: "名称",
    labelEn: "name",
    value: "document_init" + nanoid(10),
    isRequired: true,
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "The name of the object. It does not have to be unique and is intended for user consumption.",
    descriptionZh: "",
    ...options,
  });
}

export function createVersionProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_version_" + nanoid(10),
    name: "version",
    czmlName: "version",
    labelZh: "版本号",
    labelEn: "version",
    value: "1.0",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "The CZML version being written. Only valid on the document object.",
    descriptionZh: "",
    ...options,
  });
}

export function createDescriptionProp(options = {}) {
  return new czmlTextProp({
    id: "czml_prop_description_" + nanoid(10),
    name: "description",
    czmlName: "description",
    labelZh: "描述",
    labelEn: "description",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Describes a CZML document.",
    descriptionZh: "",
    ...options,
  });
}

export function createTitleProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_title_" + nanoid(10),
    name: "title",
    czmlName: "title",
    labelZh: "标题",
    labelEn: "title",
    value: "title",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "Describes a CZML title.",
    descriptionZh: "",
    ...options,
  });
}

export function createParentProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_parent_" + nanoid(10),
    name: "parent",
    czmlName: "parent",
    labelZh: "父级",
    labelEn: "parent",
    value: "",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "The name of the object. It does not have to be unique and is intended for user consumption.",
    descriptionZh: "",
    ...options,
  });
}

export function createFontProp(options = {}) {
  return new czmlStringProp({
    id: "czml_prop_font_" + nanoid(10),
    name: "font",
    czmlName: "font",
    labelZh: "字体",
    labelEn: "parent",
    value: "",
    isEnable: true,
    isUsed: false,
    isShowUsed: true,
    description: `A font, specified using the same syntax as the CSS "font" property.`,
    descriptionZh: "",
    ...options,
  });
}

export function createTextProp(options = {}) {
  return new czmlTextProp({
    id: "czml_prop_text_" + nanoid(10),
    name: "text",
    czmlName: "text",
    labelZh: "文本",
    labelEn: "text",
    isEnable: true,
    isUsed: true,
    isShowUsed: true,
    description: "",
    descriptionZh: "",
    ...options,
  });
}
