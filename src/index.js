class Test {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
}

let t = new Test('kk')
alert(t.getName())