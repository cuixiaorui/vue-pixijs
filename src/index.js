import { createRenderer } from "@vue/runtime-core";
import { getNodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

export const initRuntimeCanvas = (app) => {
  const renderer = createRenderer({
    ...getNodeOps(app),
    patchProp,
  });

  return {
    renderer,
  };
};

export * from "@vue/runtime-core";
