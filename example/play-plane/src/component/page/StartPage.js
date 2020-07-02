import { PAGE } from "../page";
import { h, defineComponent } from "../../../../../src/index";

import startPageAsset from "../../../resource/assets/start_page.jpg";
import startBtn from "../../../resource/assets/startBtn.png";

export default defineComponent({
  props: ["onNextPage"],
  setup(props, ctx) {
    const handleGoToGame = () => {
      props.onNextPage(PAGE.game);
    };

    return {
      handleGoToGame,
    };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", {
        texture: startPageAsset,
        key: "1",
      }),
      h("Sprite", {
        x: 230,
        y: 515,
        texture: startBtn,
        key: "2",
        on: {
          pointertap: ctx.handleGoToGame,
        },
        interactive: true,
        buttonMode: true,
      }),
    ]);
  },
});
