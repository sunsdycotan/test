/**
 * Created by admin on 2016/9/13.
 */

var testModule = (function(){
    var count = 0;

    return {
        incrementCount : function(){
            return ++count;
        },
        resetCount : function(){
            console.log('重置计数器。');
            count = 0;
        }
    }
})();

console.log(testModule.incrementCount());  //1
testModule.resetCount();

/**
 * Module模式
 * @type {{myPublicVar, myPublicMethod}}
 */
var myNamespace = (function(){
    var myPrivateVar = 0;

    var myPrivateMethod = function(foo){
        console.log(foo);
    };

    return {
        myPublicVar : 'foo',
        myPublicMethod : function(bar){
            myPrivateVar++;
            myPrivateMethod(bar);
        }
    }
})();

/**
 * Module模式示例
 * @type {{addItem, getItemCount, doSomething, getTotal}}
 */
var basketModule = (function(){
    var basket = [];

    function doSomethingPrivate(){
        //...
    }

    function doSomethingElsePrivate(){
        //...
    }

    return {
        //添加item到购物车
        addItem : function(values){
            basket.push(values);
        },
        //获取购物车里item的数量
        getItemCount : function(){
            return basket.length;
        },
        //私有函数的公有形式命名
        doSomething : doSomethingPrivate,
        //获取购物车里所有item的总价
        getTotal : function(){
            var itemCount = this.getItemCount(),
                total = 0;
            while(itemCount--){
                total += basket[itemCount].price;
            }
            return total;
        }
    }
})();

basketModule.addItem({
    item: "bread",
    price: 0.5
});
basketModule.addItem({
    item: "butter",
    price: 0.3
});
console.log(basketModule.getItemCount());
console.log(basketModule.getTotal());

/**
 * 引入混入
 * @type {{publiceMethod}}
 */
var myModule = (function(jQ, _){

    function privateMethod1(){
        jQ('.container').html('test');
    }

    function privateMethod2(){
        console.log(_.min([10,5,100,2,1000]));
    }

    return {
        publiceMethod : function(){
            privateMethod1();
        }
    }
    //引入jQuery 和 Underscore
})(jQuery, _);

/**
 * 引出
 * @type {{object}}
 */
var myModule2 = (function(){
    //模块对象
    var module = {},
        privateVar = 'hello world';

    function privateMethod(){
        //...
    }

    module.publicProperty = 'Foobar';
    module.publiceMethod = function(){
        console.log(privateVar);
    }

    return module;

})();

/**
 * 定义一个library函数，它声明一个新库，并在创建新库（模块）时将init函数自动绑定到document.ready
 * @param module
 * @returns {*}
 */
function library(module){
    $(function(){
        if(module.init){
            module.init();
        }
    });

    return module;
}
var myLibrary = library(function(){
    return {
        init : function(){
            //模块实现
        }
    }
})();

/**
 * 单例模式
 * @type {{getInstance}}
 */
var mySingleton = (function(){

    var instance;
    function init(){

        function privateMethod(){
            console.log('私有方法');
        }
        var privateVar = '私有变量';
        var privateRandomNumber =  Math.random();

        return {
            publicMethod : function(){
                console.log('公用方法');
            },
            publicProperty : '公有属性',
            getRandomNumber : function(){
                return privateRandomNumber;
            }
        }
    }

    return {
        getInstance : function(){
            if(!instance){
                instance = init();
            }
            return instance;
        }
    }
})();

/**
 * 差的单例模式
 * @type {{getInstance}}
 */
var myBadSingleton = (function(){
    var instance;

    function init(){
        var privateRandomNumber = Math.random();

        return {
            getRandomNumber : function(){
                return privateRandomNumber;
            }
        }
    }

    return {
        //每次都创建新实例
        getInstance : function(){
            instance = init();
            return instance;
        }
    }
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance();
var badSingleB = myBadSingleton.getInstance();
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber());