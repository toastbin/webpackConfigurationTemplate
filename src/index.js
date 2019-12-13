import avatar from './pic.jpg'
import sAvatar from './small.png'
// 全局样式
import './css/index.css'
import './css/index.scss'
let name = 'zyy'
const root = document.getElementById('root')
const imgBig = new Image()
const imgSmall = new Image()

imgBig.src = avatar;
imgBig.classList.add('avatar')
console.log(imgBig)
imgSmall.src = sAvatar
root.append(imgBig)
root.append(imgSmall)

