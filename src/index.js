//引入React核心库
import React from 'react';  
//引入ReactDom
import ReactDom from 'react-dom/client'; 
//引入APP组件
import App from './App';
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';







//v18版本 
 const root = ReactDom.createRoot(document.getElementById('root'));//创建虚拟DOM的插入节点，即原生DOM的节点
 const element = <Router><App/></Router> //声明组件
 root.render(element); //渲染组件到页面， 虚拟DOM到原生DOM

