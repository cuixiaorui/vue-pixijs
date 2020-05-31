import { game } from "../../game";
import {
  h,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
} from "../../../../src/index";

//炮弹
export default defineComponent({
  props: ["x", "y", "id"],
  setup(props, ctx) {
    const speed = 5;
    const id = props.id;
    const x = ref(props.x);
    const y = ref(props.y);

    const vanishLine = -100;
    const isDisappear = (val) => val < vanishLine;

    const handleTicker = () => {
      y.value -= speed;
      if (isDisappear(y.value)) {
        ctx.emit("destroy", {
          id,
        });
      }
    };

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
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
      texture: "../../resource/assets/bunny.png",
    });
  },
});
