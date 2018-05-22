// var and let
{
 let name = 'imooc';
}
// console.log(name);

// str
name = 'imooc';
course = 'react app';
console.log(name + ' ' + course);
console.log(`hello ${name}, course is ${course}`);
console.log(`
 haha
`);

// function
function hello(name) {
 console.log(`hello ${name}!`);
}
const hello1 = (name) => {
 console.log(`hello ${name} !`);
}
hello('imooc');
hello1('imooc');

setTimeout(() => {
 console.log('xxx');
}, 1000);
const double = x => x * 2;
console.log(double(5));

const hello2 = (name='imooc') => {
 console.log(`hello ${name}!`);
}
hello2();
hello2('woniu');

// destructor
function hello3(name1, name2) {
 console.log(name1, name2);
}
let arr = ['a1', 'a2'];
hello3.apply(null, arr);
hello3(...arr);

// object
obj = {
 name: 'imooc',
 course: 'React Dev App'
}
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj));

// computed value and function
name = 'imooc';
obj = {
 [name]: 'hello',
 hello: function() {

 },
 hello1() {

 }
}
obj[name] = 'hello iooc';
console.log(obj);

// object and array extend
obj = {
 name: 'imooc',
 course: 'React'
}
obj2 = {
 type: 'IT',
 name: 'woniu'
}
console.log({...obj, ...obj2, date:"2017"});

// destructor assign value
arr = ['hello', 'imooc'];
let arg1 = arr[0];
let arg2 = arr[1];
console.log(arg1, '|', arg2);
let [arg3, arg4] = arr;
console.log(arg3, '|', arg4);

// class
class MyApp {
 constructor(props) {
  this.name = 'imooc';
 }
 sayHello() {
  console.log(`hello ${this.name}`);
 }
}
let app = new MyApp();
app.sayHello();

import { name } from './module1'; 
console.log(name);
