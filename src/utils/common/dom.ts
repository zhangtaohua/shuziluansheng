export const getDomMaxHeight = (domId: string) => {
  const dom = document.getElementById(domId);
  if (dom) {
    console.log("domId", domId, dom);
    return `${dom.offsetHeight}px`;
  } else {
    return "fit-content";
  }
};
