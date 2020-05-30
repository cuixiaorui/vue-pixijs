import { game } from "../../game";
import {
  h,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
} from "../../../../src/index";

// 地图
export default defineComponent({
  setup(props, ctx) {
    let x1 = ref(100);
    let x2 = ref(100);
    let y1 = ref(50);
    let y2 = ref(100);

    const speed = 1;

    game.ticker.add(() => {
      y1.value++;
      y2.value++;

      if(y1.value > 400){
          y1.value = 50;
      }

      if(y2.value > 400){
          y2.value = 50;
      }
    });
    return {
      y1,
      x1,
      y2,
      x2,
    };
  },
  render(ctx) {
    return h(
      "Container",
      {
        width: 500,
        height: 500,
      },
      [
        h("Sprite", {
          x: ctx.x1,
          y: ctx.y1,
          texture: "../../resource/assets/bunny.png",
          key:"1"
        }),
        h("Sprite", {
          x: ctx.x2,
          y: ctx.y2,
          texture: "../../resource/assets/bunny.png",
          key:"2"
        }),
      ]
    );
  },
});
