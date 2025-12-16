import czmlInterpolatableProp from "../values/InterpolatableProperty";

export function createInterpolatableProp(options = {}) {
  return new czmlInterpolatableProp({
    ...options,
  });
}
