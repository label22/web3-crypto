export default {
    /**
     * 当前时间戳
     * @returns number
     * @param   isSecond 单位是否为秒
     */
    timestamp: (isSecond) => {
        let s = isSecond ? 1000 : 1
        return parseInt((Date.now() / s).toString())
    },
    /**
     * 当前日期时间
     * @returns string
     */
    formatterTodayTime: () => {
        let date = new Date(Date.now())
        const Y = date.getFullYear()
        const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
        const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + '年' + M + '月' + D + '日' + h + '点' + m + '分' + s + '秒'
    },
    /**
     * 等待n毫秒后继续执行
     * @returns promise
     * @param seconds n毫秒
     */
    wait: (seconds) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, seconds);
        });
    },
}
