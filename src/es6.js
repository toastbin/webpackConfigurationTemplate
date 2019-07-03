import '@babel/polyfill'
class Stu {
  constructor(name){
    this.name = name
  }
}
const zyy = new Stu('zyy')
console.log(zyy.name)

new Promise((resolve, reject)=>{
  console.log('promise start');
  resolve('resolve')
}).then(console.log)