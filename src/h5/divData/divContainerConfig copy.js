// import CommonDiv from "@/views/editor/components/CommonDiv.vue";

export const divContainerConfig = {
  id: "",
  name: "",
  description: "",
  tag: "CommonDiv",
  h5Tag: "div",
  locked: false,
  children: null,
  className: null,
  classNameValue: null,
  parentId: "",
  style: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "120rem",
    height: "67.5rem",
    backgroundColor: "rgba(255,255,255,1)",
    backgroundImage: "",
    zIndex: 0,
    outline: [1, "solid", "rgba(255,255,255,1)"],
    border: [1, "solid", "rgba(255,255,255,1)"],
    borderRadius: 0, // []
    cursor: "auto",
    top: "0px",
    left: "0px",
    right: "auto",
    bottom: "auto",
    overflow: "hidden",
  },
  transform: {
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    rotation: 0,
    // offsetX: 0,
    // offsetY: 0,
  },
  events: null,
  render: null,
  grid: {
    isShow: false,
    gapX: 20,
    gapY: 20,
  },
  ruler: {
    // gauge
    isShow: false,
    scaleX: 10,
    scaleY: 10,
  },
  crossRuler: {
    isShow: false,
  },
};

export default divContainerConfig;
