import {Web3} from 'web3';
import config from "../../config.js";

const Inscription = () => {
    const toAddress = config.inscription.toAddress;// 接受地址
    const privateKey = config.inscription.privateKey;// 你自己的私钥
    const lim = config.inscription.lim; // 打多少张 5u大概1k张,最好准备6u
    const chainId = config.inscription.chainId
    const gas = config.inscription.gas
    const web3 = new Web3(new Web3.providers.HttpProvider(config.inscription.rpc));// 连接到rpc节点
    const mintData = web3.utils.asciiToHex(config.inscription.mintData); //
    const fromAddress = web3.eth.accounts.privateKeyToAccount(config.inscription.privateKey).address; // 私钥导入的钱包地址
    const isListening = async () => {
        return await web3.eth.net.isListening()
    }
    console.log('网络链接：', isListening);
    // 判断网络链接
    if (isListening) {
        // 获取当前nonce
        web3.eth.getTransactionCount(fromAddress).then(nonce => {
            // 获取当前燃气价格
            web3.eth.getGasPrice().then(async (gasPrice) => {
                console.log('当前nonce:', nonce, '当前gas:', web3.utils.fromWei(gasPrice, 'gwei'), '发送地址:', fromAddress);

                // 批量发送交易
                for (let i = 0; i < lim; i++) {
                    const transaction = {
                        from: fromAddress, // from：发送地址
                        to: toAddress, // to：接收地址
                        value: web3.utils.toWei('0', 'ether'), // value：发送的以太币数量
                        nonce: nonce, // nonce：发送地址的交易计数
                        gas: gas, // gas：指定用于交易的燃气数量
                        gasPrice: gasPrice, // gasPrice：燃气价格
                        data: mintData, // 要添加到 Input Data 的自定义数据
                        chainId: chainId // 区块链id（以太坊主网的chainId为1）
                    };
                    // console.log('transaction:', transaction)
                    // 2.签名交易
                    const signedTransaction = await web3.eth.accounts.signTransaction(transaction, privateKey)
                    // console.log(signedTransaction)
                    if (signedTransaction) {
                        web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).on('transactionHash', (hash) => {
                            console.log('number:', i, 'Hash:', hash, 'noce:', nonce);
                        }).catch(error => {
                            console.log('number:', i, '交易发生错误', '噶了', '交易data：', mintData);
                        });
                    }
                    nonce++;
                }
            });
        });
    }
}

export default Inscription
