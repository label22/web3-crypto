import fs from "fs";
import bip39 from 'bip39';
import Wallet from "ethereum-hdwallet";
import config from "../../config.js";

const createAddress = async () => {
    // 读取配置文件
    const createAddressFilePath = config.emv.createAddressFilePath;
    let configFile;
    // 计数
    let count = 0
    while (count < config.emv.createAddressCount) {
        // 检查文件是否存在
        if (fs.existsSync(createAddressFilePath)) {
            // 如果文件存在，则读取配置
            configFile = JSON.parse(fs.readFileSync(createAddressFilePath, 'utf8'));
            count = configFile.list.length
            if (count >= config.emv.createAddressCount) return
        } else {
            // 如果文件不存在，则创建默认的配置
            configFile = {
                list: []
            };
            // 将默认配置写入文件
            await fs.writeFileSync(createAddressFilePath, JSON.stringify(configFile), 'utf8');
        }
        let {list} = configFile
        // 计数
        count++
        // 生成助记词
        const mnemonic = bip39.generateMnemonic();
        // 使用助记词生成钱包
        const wallet = Wallet.fromMnemonic(mnemonic);
        // 获取私钥和地址
        const privateKey = wallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex');
        const address = `0x${wallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`;
        if (privateKey) {
            list.push({id: count, address, privateKey}); // 私钥导入的钱包地址
            await fs.writeFileSync(createAddressFilePath, JSON.stringify(configFile))
        }
    }
}

export default createAddress
