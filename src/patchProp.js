import * as PIXI from "PIXI.js";
export const patchProp = (
  el,
  key,
  prevValue,
  nextValue,
  isSVG = false,
  prevChildren,
  parentComponent,
  parentSuspense,
  unmountChildren
) => {
  if (key === "on" || key === "texture" || key === "style") {
    switch (key) {
      case "on":
        Object.keys(nextValue).forEach((eventName) => {
          const callback = nextValue[eventName];
          el.on(eventName, callback);
        });
        break;
      case "texture":
        let texture = PIXI.Texture.from(nextValue);
        el.texture = texture;
        break;
      case "style":
        let style = new PIXI.TextStyle(nextValue);
        el.style = style;
        break;
      case "anchor":
        console.log(nextValue)
        el.anchor.set(...nextValue);
        break;
    }
  } else {
    el[key] = nextValue;
  }
};
