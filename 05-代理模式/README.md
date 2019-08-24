### 代理模式
- 使用者无权访问目标对象
- 通过代理做授权和控制（如明星经纪人，事件代理）

### 设计原则
- 符合开放封闭原则


```
// 明星
const start = {
    name: 'xxx',
    age: '25',
    phone: 'start: 18900000000'
}
// 代理人
const agent = new Proxy(start, {
    get: function(target, key){
        if (key === 'phone') {
            return '明星号码保密，返回经纪人的: 13609999999'
        }
        if (key === 'price') {
            // 经纪人报价
            return 120000
        }
        return target[key]
    },
    set: function(target, key, val) {
        if (key === 'customPrice') {
            if(val < 120000) {
                throw new Error('价格太低')
            } else {
                target[key] = val
                return true // set函数必须返回一个boolean值，只有返回值为true时才表示修改成功
            }
        }
    }
})

console.log(agent.phone)
console.log(agent.price)
// agent.customPrice = 15000
// console.log(agent.customPrice)
agent.customPrice = 15000000
console.log(agent.customPrice)
```


#### 代理模式VS适配器模式
- 适配器模式：提供一个不同的接口
- 代理模式：提供一模一样的接口

#### 代理模式VS装饰器模式
- 装饰器模式：扩展功能，原有功能不变且可直接使用
- 代理模式：显示原有功能，但是经过限制后的