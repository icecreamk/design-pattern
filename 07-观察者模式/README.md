### 观察者模式
- 发布订阅
- 1对n

### 场景
- 事件绑定
- Promise
- jQuery callbacks
- nodejs 自定义事件
- React和Vue生命周期

### 设计原则
- 主题（发布）和观察者（订阅）分离，不是主动触发而是被动监听，两者解耦
- 符合开发封闭原则

#### 示例
```
// 保存所有观察者的状态，状态变化后，触发所有观察者对象
class Subject {
    constructor() {
        this.state = 0
        this.observers = []
    }
    getState() {
        return this.state
    }
    setState(flag) {
        this.state = flag
        this.notifyObservers()
    }
    notifyObservers() {
        this.observers.forEach(item => {
            item.update()
        })
    }
    attach(observer) {
        this.observers.push(observer)
    }
}

class Observer {
    constructor(name, subject) {
        this.name = name
        this.subject = subject
        this.subject.attach(this)
    }
    update() {
        console.log(`${this.name}, ${this.subject.getState()}`)
    }
}

const s = new Subject()
const o1 = new Observer('o1', s)
const o2 = new Observer('o2', s)
const o3 = new Observer('o3', s)

s.setState(1)
s.setState(2)
```