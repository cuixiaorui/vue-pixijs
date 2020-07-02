import { game } from "../../game";
import { useKeyboardMove, useKeyboard } from "../use";
import {
  h,
  defineComponent,
  watch,
  ref,
  onMounted,
  onUnmounted,
} from "../../../../src/index";
import planeImagePath from '../../resource/assets/plane.png'

export const PlaneInfo = {
  width:258,
  height:364
}

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

    useAttackHandler(ctx, x, y);

    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      texture: planeImagePath,
    });
  },
});

function useAttackHandler(ctx, x, y) {
  let isAttack = false;
  // 攻击间隔时间
  const ATTACK_INTERVAL = 10;

  let startTime = 0;

  const handleTicker = () => {
    if (isAttack) {
      startTime++;
      if (startTime > ATTACK_INTERVAL) {
        emitAttack();
        startTime = 0;
      }
    }
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });

  const emitAttack = () => {
    ctx.emit("attack", {
      x: x.value + 110,
      y: y.value + 0,
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
