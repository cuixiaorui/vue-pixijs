import { stage } from "../../config";
import { PAGE } from "../page";
import { h, defineComponent } from "../../../../../src/index";

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
      h("Text", {
        text: "开始页面",
        x: stage.width / 2 - 50,
        y: 200,
        style: {
          fill: ["#ffffff", "#00ff99"],
        },
      }),
      h("Text", {
        text: "开始游戏",
        x: stage.width / 2 - 50,
        y: stage.height - 300,
        style: {
          fill: "#ff0000",
        },
        on: {
          pointertap: ctx.handleGoToGame,
        },
        interactive: true,
        buttonMode: true,
      }),
    ]);
  },
});
