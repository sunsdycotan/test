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
            console.log('���ü�������');
            count = 0;
        }
    }
})();

console.log(testModule.incrementCount());  //1
testModule.resetCount();

/**
 * Moduleģʽ
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
 * Moduleģʽʾ��
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
        //���item�����ﳵ
        addItem : function(values){
            basket.push(values);
        },
        //��ȡ���ﳵ��item������
        getItemCount : function(){
            return basket.length;
        },
        //˽�к����Ĺ�����ʽ����
        doSomething : doSomethingPrivate,
        //��ȡ���ﳵ������item���ܼ�
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
 * �������
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
    //����jQuery �� Underscore
})(jQuery, _);

/**
 * ����
 * @type {{object}}
 */
var myModule2 = (function(){
    //ģ�����
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
 * ����һ��library������������һ���¿⣬���ڴ����¿⣨ģ�飩ʱ��init�����Զ��󶨵�document.ready
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
            //ģ��ʵ��
        }
    }
})();

/**
 * ����ģʽ
 * @type {{getInstance}}
 */
var mySingleton = (function(){

    var instance;
    function init(){

        function privateMethod(){
            console.log('˽�з���');
        }
        var privateVar = '˽�б���';
        var privateRandomNumber =  Math.random();

        return {
            publicMethod : function(){
                console.log('���÷���');
            },
            publicProperty : '��������',
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
 * ��ĵ���ģʽ
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
        //ÿ�ζ�������ʵ��
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