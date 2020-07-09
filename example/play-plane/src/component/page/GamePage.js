import TWEEN from "@tweenjs/tween.js";
import Bullet, { SelfBulletInfo, EnemyBulletInfo } from "../Bullet.js";
import Plane, { PlaneInfo } from "../Plane.js";
import Map from "../Map.js";
import EnemyPlane, { EnemyPlaneInfo } from "../EnemyPlane";
import { game } from "../../../game";
import { hitTestRectangle } from "../../utils";
import {
  h,
  reactive,
  defineComponent,
  onMounted,
  onUnmounted,
} from "../../../../../src/index.js";
import { moveBullets } from "../../moveBullets";
import { moveEnemyPlane } from "../../moveEnemyPlane";
import { stage } from "../../config/index.js";
import { useKeyboardMove } from "../../use";
import { PAGE } from "./index";

let hashCode = 0;
const createHashCode = () => {
  return hashCode++;
};

// 我方战机
const useSelfPlane = ({ x, y, speed }) => {
  const selfPlane = reactive({
    x,
    y,
    speed,
    width: PlaneInfo.width,
    height: PlaneInfo.height,
  });

  const { x: selfPlaneX, y: selfPlaneY } = useKeyboardMove({
    x: selfPlane.x,
    y: selfPlane.y,
    speed: selfPlane.speed,
  });

  // 缓动出场
  var tween = new TWEEN.Tween({
    x,
    y,
  })
    .to({ y: y - 250 }, 500)
    .start();
  tween.onUpdate((obj) => {
    selfPlane.x = obj.x;
    selfPlane.y = obj.y;
  });

  const handleTicker = () => {
    TWEEN.update();
  };

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  selfPlane.x = selfPlaneX;
  selfPlane.y = selfPlaneY;

  return selfPlane;
};

// 我方子弹
const useSelfBullet = () => {
  // 子弹的数据
  const selfBullets = reactive([]);

  // 创建子弹
  const createSelfBullet = (x, y) => {
    const id = createHashCode();
    const width = SelfBulletInfo.width;
    const height = SelfBulletInfo.height;
    const rotation = SelfBulletInfo.rotation;
    const dir = SelfBulletInfo.dir;
    selfBullets.push({ x, y, id, width, height, rotation, dir });
  };

  // 销毁子弹

  const destroySelfBullet = (id) => {
    const index = selfBullets.findIndex((info) => info.id == id);
    if (index !== -1) {
      selfBullets.splice(index, 1);
    }
  };

  return {
    selfBullets,
    createSelfBullet,
    destroySelfBullet,
  };
};

// 敌机
const useEnemyPlanes = () => {
  //生产敌机
  const createEnemyPlaneData = (x) => {
    return {
      x,
      y: -200,
      width: EnemyPlaneInfo.width,
      height: EnemyPlaneInfo.height,
      life: EnemyPlaneInfo.life,
    };
  };

  const enemyPlanes = reactive([]);

  setInterval(() => {
    const x = Math.floor((1 + stage.width) * Math.random());
    enemyPlanes.push(createEnemyPlaneData(x));
  }, 600);

  return enemyPlanes;
};

const useEnemyPlaneBullets = () => {
  // 创建敌军子弹
  const enemyPlaneBullets = reactive([]);

  const createEnemyPlaneBullet = (x, y) => {
    const id = createHashCode();
    const width = EnemyBulletInfo.width;
    const height = EnemyBulletInfo.height;
    const rotation = EnemyBulletInfo.rotation;
    const dir = EnemyBulletInfo.dir;
    enemyPlaneBullets.push({ x, y, id, width, height, rotation, dir });
  };

  return {
    enemyPlaneBullets,
    createEnemyPlaneBullet,
  };
};

// 战斗逻辑
const useFighting = ({
  selfPlane,
  selfBullets,
  enemyPlanes,
  enemyPlaneBullets,
  gameOverCallback,
}) => {
  const handleTicker = () => {
    moveBullets(selfBullets);
    moveBullets(enemyPlaneBullets);
    moveEnemyPlane(enemyPlanes);

    // 先遍历自己所有的子弹
    selfBullets.forEach((bullet, selfIndex) => {
      // 检测我方子弹是否碰到了敌机
      enemyPlanes.forEach((enemyPlane, enemyPlaneIndex) => {
        const isIntersect = hitTestRectangle(bullet, enemyPlane);
        if (isIntersect) {
          selfBullets.splice(selfIndex, 1);

          // 敌机需要减血
          enemyPlane.life--;
          if (enemyPlane.life <= 0) {
            // todo
            // 可以让实例发消息过来在销毁
            // 因为需要在销毁之前播放销毁动画
            enemyPlanes.splice(enemyPlaneIndex, 1);
          }
        }
      });

      // 检测是否碰到了敌方子弹
      enemyPlaneBullets.forEach((enemyBullet, enemyBulletIndex) => {
        const isIntersect = hitTestRectangle(bullet, enemyBullet);
        if (isIntersect) {
          selfBullets.splice(selfIndex, 1);
          enemyPlaneBullets.splice(enemyBulletIndex, 1);
        }
      });
    });

    const hitSelfHandle = (enemyObject) => {
      const isIntersect = hitTestRectangle(selfPlane, enemyObject);
      if (isIntersect) {
        // 碰到我方飞机
        // 直接 game over
        // 跳转到结束页面
        gameOverCallback && gameOverCallback();
      }
    };

    // 遍历敌军的子弹
    enemyPlaneBullets.forEach((enemyBullet, enemyBulletIndex) => {
      hitSelfHandle(enemyBullet);
    });

    // 遍历敌军
    // 我方和敌军碰撞也会结束游戏
    enemyPlanes.forEach((enemyPlane) => {
      hitSelfHandle(enemyPlane);
    });
  };

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });

  onMounted(() => {
    game.ticker.add(handleTicker);
  });
};

export default defineComponent({
  props: ["onNextPage"],
  setup(props) {
    const selfPlane = useSelfPlane({
      x: stage.width / 2 - 60,
      y: stage.height,
      speed: 7,
    });

    const {
      selfBullets,
      createSelfBullet,
      destroySelfBullet,
    } = useSelfBullet();

    const enemyPlanes = useEnemyPlanes();

    const {
      enemyPlaneBullets,
      createEnemyPlaneBullet,
    } = useEnemyPlaneBullets();

    useFighting({
      selfPlane,
      selfBullets,
      enemyPlanes,
      enemyPlaneBullets,
      gameOverCallback() {
        props.onNextPage(PAGE.end);
      },
    });

    return {
      selfPlane,
      enemyPlanes,
      selfBullets,
      createSelfBullet,
      destroySelfBullet,
      enemyPlaneBullets,
      createEnemyPlaneBullet,
    };
  },

  render(ctx) {
    const createBullet = (info, index) => {
      return h(Bullet, {
        key: "Bullet" + info.id,
        x: info.x,
        y: info.y,
        id: info.id,
        width: info.width,
        height: info.height,
        rotation: info.rotation,
        dir: info.dir,
        onDestroy({ id }) {
          ctx.destroySelfBullet(id);
        },
      });
    };

    const createEnemyPlane = (info, index) => {
      return h(EnemyPlane, {
        key: "EnemyPlane" + index,
        x: info.x,
        y: info.y,
        height: info.height,
        width: info.width,
        onAttack({ x, y }) {
          ctx.createEnemyPlaneBullet(x, y);
        },
      });
    };

    const createSelfPlane = () => {
      return h(Plane, {
        x: ctx.selfPlane.x,
        y: ctx.selfPlane.y,
        speed: ctx.selfPlane.speed,
        onAttack({ x, y }) {
          ctx.createSelfBullet(x, y);
        },
      });
    };

    return h("Container", [
      h(Map),
      createSelfPlane(),
      ...ctx.selfBullets.map(createBullet),
      ...ctx.enemyPlaneBullets.map(createBullet),
      ...ctx.enemyPlanes.map(createEnemyPlane),
    ]);
  },
});
