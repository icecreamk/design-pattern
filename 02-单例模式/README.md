### 单例模式
- 系统中被唯一使用(如登录框、购物车)
    + 登录框
    + 购物车
    + vuex和redux里的store(每个页面获取的store都是一样的，共享给所有页面)
- 一个类只有一个实例

### 设计原则
- 符合单一职责原则，只实例化唯一的对象
- 没法具体开发封闭原则，但也不会违反开发封闭原则

``` 
<!-- 实现1 -->
class SingleObj {
    constructor() {
        this.name = 'kkk'
    }
}

// 静态方法，直接通过类调用
SingleObj.getInstance = function () {
    // this指向该类而不是实例
    if(this.instance) {
        return this.instance
    } else {
        this.instance = new SingleObj()
        return this.instance
    }
}
const obj1 = SingleObj.getInstance()
const obj2 = SingleObj.getInstance()

console.log(obj1 === obj2)
```

```
<!-- 实现2 -->
class SingleObj {
    constructor() {
        this.name = 'kkk'
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
const obj1 = SingleObj.getInstance()
const obj2 = SingleObj.getInstance()

console.log(obj1 === obj2)

```

```
<!-- 场景 -->
class SingleObj {
    constructor() {
        this.state = 'hide'
    }
    show() {
        if (this.state === 'show') {
            console.log('已经显示了')
        } else {
            this.state = 'show'
            console.log('显示了')
        }
    }
    hide() {
        this.state = 'hide'
        console.log('隐藏了')
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
const page1 = SingleObj.getInstance()
const page2 = SingleObj.getInstance()

page1.show()
page1.hide()
page1.show()
page1.show()

```


``` javascript
// java中修复符private，外部无法访问，js中实现单例模式，可以不用将该类export出去给外部使用，而是导出一个单例函数，该单例函数包含该类的唯一实例

class Cart = {

}

const getCart = (function() {
    let cart
    return function() {
        if(!cart) {
            cart = new Cart()
        }
        return cart
    }
})()

export default getCart

```