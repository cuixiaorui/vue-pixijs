import { ref, onMounted, onUnmounted } from "../../../../src/index";
/**
 * 注册键盘事件
 */
export const useKeyboard = (map) => {
  const handleKeydown = (e) => {
    const callback = map[e.code];
    if (callback) {
      callback(e);
    }
  };

  const handleKeyup = (e) => {};

  onMounted(() => {
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
  });
};
