### 迭代器模式
- 顺序访问一个集合
- 使用者无需知道集合而内部结构（封装）
- 如果一个系统中，有序集合的数据类型已经有很多，就需要迭代器来统一实现遍历

### 有序集合有哪些
- Array Map Set String TypedArray arguments NodeList（object不是，可以用Map代替）
- 以上数据类型都有`[Symbol.iterator]`
### 场景
- jquery each
- ES6 Iterator

### 设计原则
- 迭代器对象和目标对象分离
- 迭代器将使用者和目标对象隔离开
- 符合开放封闭原则


#### 示例
```
class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }

  next() {
    if (this.hasNext()) {
      return this.list[this.index++];
    }
    return null;
  }

  hasNext() {
    if (this.index >= this.list.length) {
      return false;
    } else {
      return true;
    }
  }
}
class Container {
  constructor(list) {
    this.list = list;
  }

  // 生成遍历器
  getIterator() {
    return new Iterator(this);
  }
}

const arr = [1,2,,43,15]
const con = new Container(arr)
const iterator = con.getIterator()
while(iterator.hasNext()) {
    console.log(iterator.next())
}
```