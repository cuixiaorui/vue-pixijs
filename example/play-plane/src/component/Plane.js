import { game } from "../../game";
import { useKeyboardMove, useKeyboard } from "../use";
import { h, defineComponent, watch,ref } from "../../../../src/index";
// 飞机
export default defineComponent({
  props: ["x", "y", "speed"],
  setup(props, ctx) {

    const x = ref(props.x);
    const y = ref(props.y);
    watch(props, (newProps) => {
      x.value = newProps.x;
      y.value = newProps.y;
    });

    attackHandler(ctx, x, y);

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

function attackHandler(ctx, x, y) {
  let isAttack = false;
  // 攻击间隔时间
  const ATTACK_INTERVAL = 10;

  let startTime = 0;
  game.ticker.add(() => {
    if (isAttack) {
      startTime++;
      if (startTime > ATTACK_INTERVAL) {
        emitAttack();
        startTime = 0;
      }
    }
  });

  const emitAttack = () => {
    ctx.emit("attack", {
      x: x.value + 50,
      y: y.value,
    });
  };

  const startAttack = () => {
    isAttack = true;
    startTime = 100;
  };

  const stopAttack = () => {
    isAttack = false;
  };

  useKeyboard({
    Space: {
      keydown: startAttack,
      keyup: stopAttack,
    },
  });
}
