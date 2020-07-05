import { game } from "../../game";
import {
  h,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
} from "../../../../src/index";

import { stage } from "../config";
import mapImagePath from "../../resource/assets/map.jpg";

// 地图
export default defineComponent({
  setup(props, ctx) {
    const mapHeight = stage.height;
    let y1 = ref(0);
    let y2 = ref(-mapHeight);

    const speed = 1;

    const handleTicker = () => {
      y1.value += speed;
      y2.value += speed;

      if (y1.value >= mapHeight) {
        y1.value = -mapHeight;
      }

      if (y2.value >= mapHeight) {
        y2.value = -mapHeight;
      }
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });

    return {
      y1,
      y2,
    };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", {
        y: ctx.y1,
        texture: mapImagePath,
        key: "1",
      }),
      h("Sprite", {
        y: ctx.y2,
        texture: mapImagePath,
        key: "2",
      }),
    ]);
  },
});
