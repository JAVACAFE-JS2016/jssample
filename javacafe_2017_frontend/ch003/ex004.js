/**
 * Created by whybe on 2017. 4. 22..
 */
/* p.69. 함수 */

// 함수 선언문 vs. 함수 표현식 -> 호이스팅의 차이가 생김
console.log(funcDeclaration);
console.log(funcExpression);

function funcDeclaration() {
    console.log(innerFuncDeclaration);
    console.log(innerFuncExpression);
    function innerFuncDeclaration() {}
    var innerFuncExpression = function () {};
}
var funcExpression = function () {};

/* p.81. 함수 반환하기 : 함수를 반환하는 함수 */

// 가장 흔한 카운터 예제
// 특징 : 처음 실행할 때만 실행하고 그 이후로는 실행되지 않는다.
function setNext(initVal) {
    // 아래 줄은 처음에만 실행되고 그 이후로는 실행되지 않는다. 그래서 처음 실행시에 무언가를 세팅할때 쓰인다
    var useLater = initVal || 0;
    return function (param) {
        console.log(++useLater);
    }
}

var next = setNext();
next();
next();
next();


var next = setNext(2);
next();
next();
next();

// 함수형 맛보기
function handleTwo(fun) {
    return function(x, y) {
        return fun.call(null, x, y);
    };
}

var adder = handleTwo(function(x, y) { return x + y; });

adder(1,2);
adder(4,2);
adder(3,6);

var devider = handleTwo(function(x, y) { return x / y; });

devider(2,4);
devider(4,2);
devider(3,9);


// 받아오는 인수의 갯수와 상관없게 만들기
var handleAll = function (fun) {
    return function () {
        return fun.call(null, ...arguments);
    }
};

var addAll = handleAll(function () { return Array.prototype.reduce.call(arguments, function(prev, next) { return prev + next} ) });
