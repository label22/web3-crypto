import lodash from "lodash";

/**
 * @returns 配置
 * @param emv -------
 * @param rpc https://rpc.ankr.com/eth
 * @param createAddressFilePath 地址json
 * @param createAddressCount 创建地址数量
 * @param createColliderFilePath 对撞器json
 * @param preSufFix 对撞靓号的前缀或后缀
 * @param preSufFixLength 前后缀长度
 * @param isEmail 是否发送至邮箱
 * @param email 邮箱
 * @param inscription -------
 * @param chainId 137
 * @param gas 25000
 * @param rpc https://polygon-bor.publicnode.com
 * @param toAddress
 * @param privateKey
 * @param lim 10
 * @param mintData 'data:,{"p":"prc-20","op":"mint","tick":"pols","amt":"100000000"}'
 */
let config = {
    emv: {
        rpc: 'https://rpc.ankr.com/eth',
        createAddressFilePath: 'history/address.json', // 地址json
        createAddressCount: 10, // 创建地址数量
        createColliderFilePath: 'history/Collider.json', // 对撞器json
        preSufFix: 'end', // 对撞靓号的前缀或后缀
        preSufFixLength: 6, // 前后缀长度
        isEmail: false, // 是否发送至邮箱
        email: '926117017@qq.com', // 邮箱
    },
    // 铭文
    inscription: {
        chainId: 137,
        gas: 25000,
        rpc: 'https://polygon-bor.publicnode.com',
        toAddress: '',
        privateKey: '',
        lim: 10,
        mintData: 'data:,{"p":"prc-20","op":"mint","tick":"pols","amt":"100000000"}'
    }
}

export const setConfig = (conf) => {
    config = lodash.merge({}, config, conf)
}

export default config
