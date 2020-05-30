import Bullet from "./Bullet.js";
import Plane from "./Plane.js";
import { h, reactive } from "../../../../src/index.js";

let hashCode = 0;
export default {
  setup() {
    const selfBullets = reactive([]);

    const createHashCode = () => {
      return hashCode++;
    }

    const handleBulletDestroy = ({ id }) => {
      const index = selfBullets.findIndex((info) => info.id == id);
      selfBullets.splice(index, 1);
    };

    const handlePlaneAttack = ({x,y}) => {
      const id = createHashCode()
      selfBullets.push({ x, y, id });
    };

    return {
      selfBullets,
      handleBulletDestroy,
      handlePlaneAttack,
    };
  },

  render(ctx) {
    const createBullet = (info) => {
      return h(Bullet, {
        key: info.id,
        x: info.x,
        y: info.y,
        id: info.id,
        onDestroy: ctx.handleBulletDestroy,
      });
    };

    return h(
      "Container",
      {
        width: 500,
        height: 500,
      },
      [
        h(Plane, {
          onAttack: ctx.handlePlaneAttack,
        }),
        ...ctx.selfBullets.map(createBullet),
      ]
    );
  },
};
