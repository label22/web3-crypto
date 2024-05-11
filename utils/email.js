import {SMTPClient} from "emailjs";

let server = new SMTPClient({
    user: '926117017@qq.com',//你的邮箱账户如: example@qq.com
    //此处并非你的邮箱密码，而是邮箱的授权码
    password: 'vaexebovnkmqbcbd',
    //此处为邮箱服务器主机，例如你用的是QQ邮箱发邮件，则是
    //smtp.qq.com
    host: 'smtp.qq.com',
    //不用改
    ssl: true,
})

export default {
    /**
     * @returns 发送QQ邮箱
     * @param email
     * @param title 邮件主题
     * @param content 邮件内容
     */
    QQ: (email,title, content) => {
        server.send({
            subject: title, // 邮件主题
            text: content, // 邮件内容
            from: "926117017@qq.com", // 谁发送的
            to: email, // 发送给谁的
        }, () => {
        })
    },
    /**
     * @returns 发送Gmail邮箱
     * @param email
     * @param title 邮件主题
     * @param content 邮件内容
     */
    Gmail: (email,title, content) => {
        server.send({
            subject: title, // 邮件主题
            text: content, // 邮件内容
            from: "926117017@qq.com", // 谁发送的
            to: email, // 发送给谁的
        }, () => {
        })
    }
}
