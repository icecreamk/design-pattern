class SingleObj {
    constructor() {
        this.state = ''
    }
    fn() {
       
    }
}

// 静态方法，直接通过类调用
SingleObj.getInstance = (function () {
    // this指向该类而不是实例
    let instance = null

    return function() {
        if(instance) {
            return instance
        } else {
            instance = new SingleObj()
            return instance
        }
    }
})()



