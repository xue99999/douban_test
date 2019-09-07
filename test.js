@controller
class Dog {
    @wang
    @admin('xuejun')
    run() {
        console.log('dog can run =>')
    }
}

// 给类的方法加装饰器, 可以接受到target, key, description
function wang(target, key, description) {
    console.log('wang target =>', target, key, description)
    console.log('==============================')
}

// 给类自身加装饰器, 只能接受到target
function controller(target) {
    console.log('controller target =>', target)
    target.prototype.age = 22
    console.log('==============================')
}

function admin(username) {
    return function(target) {
        console.log('controller target =>', target)
        target.username = username
    }
}

var d = new Dog()
d.run()
console.log(d.run)
console.log(d.age)
console.log(d.username)
