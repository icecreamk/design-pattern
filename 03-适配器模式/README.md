### 适配器模式
- 旧接口格式和使用者不兼容（中间加一个适配转换接口）

### 场景
- 封装旧接口
- vue computed

### 设计原则
- 将旧接口和使用者分离
- 符合开放封闭原则

#### 实例
```
class Adaptee {
    specificReq() {
        return '外国插头'
    }
}

class Target {
    constructor() {
        this.adaptee = new Adaptee()
    }
    req() {
        const info = this.adaptee.specificReq()
        return `${info}-转换器-中国插头`
    }
}

const target = new Target()
console.log(target.req())
```