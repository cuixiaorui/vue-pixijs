import { useKeyboardMove, useKeyboard } from "../use";
import { h, defineComponent } from "../../../../src/index";
// 飞机
export default defineComponent({
  setup(props, ctx) {
    const emitAttack = () => {
      ctx.emit("attack", {
        x: x.value + 50,
        y,
      });
    };

    useKeyboard({
      Space: emitAttack,
    });

    const { x, y } = useKeyboardMove({
      x: 200,
      y: 400,
      speed: 7,
    });

    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      texture: "../../resource/assets/plane.png",
    });
  },
});
