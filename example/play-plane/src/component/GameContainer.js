import { h, reactive, ref, computed } from "../../../../src/index.js";
import { PAGE, getPageComponent } from "./page";

export default {
  setup() {
    const currentPageName = ref(PAGE.start);
    const currentPage = computed(() => {
      return getPageComponent(currentPageName.value);
    });
    const handleNextPage = (nextPage) => {
      currentPageName.value = nextPage;
    };

    return {
      currentPage,
      handleNextPage,
    };
  },

  render(ctx) {
    return h("Container", [
      h(ctx.currentPage, {
        onNextPage: ctx.handleNextPage,
      }),
    ]);
  },
};
