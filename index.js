import inscription from "./src/Inscription/index.js";
import createAddress from "./src/web3/createAddress.js";
import createCollider from "./src/web3/createCollider.js";

/**
 * @returns main
 * @param inscription 打铭文
 * @param createAddress 创建地址
 * @param createCollider 对撞器
 */
const main = {
    inscription,
    createAddress,
    createCollider
}
export default main
