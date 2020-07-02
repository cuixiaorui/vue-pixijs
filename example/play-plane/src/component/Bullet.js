import { h, ref, defineComponent, watch } from "../../../../src/index";
import bunnyImagePath from "../../resource/assets/bunny.png";

export const SelfBulletInfo = {
  width: 61,
  height: 99,
  rotation: 0, 
};
export const EnemyBulletInfo = {
  width: 61,
  height: 99,
  rotation: 0,
};

//炮弹
export default defineComponent({
  props: ["x", "y", "id", "rotation"],
  setup(props, ctx) {
    const x = ref(props.x);
    const y = ref(props.y);

    watch(props, (newProps) => {
      x.value = newProps.x;
      y.value = newProps.y;
    });

    return {
      x,
      y,
      rotation: props.rotation,
    };
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      rotation: ctx.rotation,
      texture: bunnyImagePath,
    });
  },
});
