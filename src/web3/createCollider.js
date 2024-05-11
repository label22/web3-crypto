import fs from "fs";
import config from "../../config.js";
import bip39 from "bip39";
import Wallet from "ethereum-hdwallet";
import {Web3} from "web3";
import email from "../../utils/email.js";
import date from "../../utils/date.js";

/**
 * @returns promise
 * 返回地址余额
 * @param address 钱包地址
 */
const getBalance = async (address) => {
    const rpc = config.emv.rpc
    // 连接到以太坊节点
    const web3 = new Web3(new Web3.providers.HttpProvider(rpc));
    const balance = await web3.eth.getBalance(address)
    return Number(web3.utils.fromWei(balance, "ether"))
}

// 5 0.7 30

/**
 * @returns string
 * 返回相同字符串
 * @param address 钱包地址
 * @param type 前缀、后缀 默认后缀
 * @param len 长度 默认4
 */
const alike = (address, type = 'end', len = 4) => {
    let params = {
        start: address.slice(2, 2 + len),
        end: address.slice(address.length - len, address.length)
    }
    let res = ''
    for (let i = 0; i < 10; i++) {
        let str = ''
        for (let j = 0; j < len; j++) str += i
        if (str === params[type]) res = params[type]
    }
    return res
}

const createCollider = async (cAddress) => {
    // 读取配置文件
    const createColliderFilePath = config.emv.createColliderFilePath;
    let fileConfig;
    const isCirculation = true
    while (isCirculation) {
        // 检查文件是否存在
        if (fs.existsSync(createColliderFilePath)) {
            // 如果文件存在，则读取配置
            fileConfig = JSON.parse(fs.readFileSync(createColliderFilePath, 'utf8'));
        } else {
            // 如果文件不存在，则创建默认的配置
            fileConfig = {
                count: 0,
                goodList: {address: []},
                assignList: {address: []},
                randomList: {address: []}
            };
            // 将默认配置写入文件
            fs.writeFileSync(createColliderFilePath, JSON.stringify(fileConfig), 'utf8');
        }
        let {goodList, assignList, randomList} = fileConfig
        // 计数
        let count = fileConfig.count
        // 生成助记词
        const mnemonic = bip39.generateMnemonic();
        // 使用助记词生成钱包
        const wallet = Wallet.fromMnemonic(mnemonic);
        // 获取私钥和地址
        const privateKey = wallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex');
        const address = `0x${wallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;
        if (privateKey) {
            count++
            fileConfig.count = count
            const account = {id: fileConfig.count, address, balance: 0, privateKey, mnemonic}; // 私钥导入的钱包地址
            if (alike(account.address, config.emv.preSufFix, config.emv.preSufFixLength)) {
                console.log(fileConfig.count, '/', account.address)
                account.balance = await getBalance(address)
                goodList.address.push(account)
                await fs.writeFileSync(createColliderFilePath, JSON.stringify(fileConfig))
                if (config.emv.isEmail) await email.QQ(config.emv.email, '靓号地址', `地址：${account.address}\r\n余额：${account.balance}\r\n备忘词：${mnemonic}\r\n私钥：${privateKey}`)
                await date.wait(1000)
            }
            if (cAddress && cAddress === account.address) {
                console.log(fileConfig.count, '/', account.address)
                account.balance = await getBalance(address)
                assignList.address.push(account)
                await fs.writeFileSync(createColliderFilePath, JSON.stringify(fileConfig))
                if (config.emv.isEmail) await email.QQ(config.emv.email, ' 指定地址', `地址：${account.address}\r\n余额：${account.balance}\r\n备忘词：${mnemonic}\r\n私钥：${privateKey}`)
                await date.wait(1000)
            } else {
                account.balance = await getBalance(address)
                console.log(fileConfig.count, '/', account.address, ' 余额', account.balance, 'ETH/BNB');
                randomList.address.push(account)
                await fs.writeFileSync(createColliderFilePath, JSON.stringify(fileConfig))
                if (config.emv.isEmail && account.balance > 0) await email.QQ(config.emv.email, '随机地址', `地址：${account.address}\r\n余额：${account.balance}\r\n备忘词：${mnemonic}\r\n私钥：${privateKey}`)
                await date.wait(1000)
            }
        }
    }
}

export default createCollider
