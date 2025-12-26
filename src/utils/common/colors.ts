import chroma from "chroma-js";

export function gerRandomRgbaArrayColor() {
  return chroma.random().rgba();
}

export function gerRandomRgbaColor() {
  return `rgba(${chroma.random().rgba().join(",")})`;
}
