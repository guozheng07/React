import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

const todoList = [
  { title: '开发任务-1', status: '22-05-22 18:15' },
  { title: '开发任务-3', status: '22-05-22 18:15' },
  { title: '开发任务-5', status: '22-05-22 18:15' },
  { title: '测试任务-3', status: '22-05-22 18:15' }
];
const ongoingList = [
  { title: '开发任务-4', status: '22-05-22 18:15' },
  { title: '开发任务-6', status: '22-05-22 18:15' },
  { title: '测试任务-2', status: '22-05-22 18:15' }
];
const doneList = [
  { title: '开发任务-2', status: '22-05-22 18:15' },
  { title: '测试任务-1', status: '22-05-22 18:15' }
];

// 循环渲染事项的组件
const KanbanCard = ({ title, status }) => {
  return (
    <li className="kanban-card">
      <div className="card-title">{title}</div>
      <div className="card-status">{status}</div>
    </li>
  );
};
// 待处理看板 -> 添加新的待办事项
const KanbanNewCard = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  // 监听输入框中值的变化
  const handleChange = (evt) => {
    // evt.target.value 是输出框输入的值
    setTitle(evt.target.value);
  };
  // 按下“enter”键后，将输入框中的值传递给 onSubmit
  // 调用父组件传递下来的回调函数（onSubmit），将 KanbanNewCard 组件变成了一个受控组件
  const handleKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title);
    }
  };

  return (
    <li className="kanban-card">
      <h3>添加新卡片</h3>
      <div className="card-title">
        <input type="text" value={ title }
          onChange={ handleChange } onKeyDown={ handleKeyDown } />
      </div>
    </li>
  );
};


function App() {
  // showAdd 的初始值为 false，改变其值的方法是 setShowAdd
  const [showAdd, setShowAdd] = useState(false);
  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    // 将新的待办事项放在最前面
    todoList.unshift({ title, status: new Date().toDateString() });
    setShowAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={ logo } className="App-logo" alt="logo" />
      </header>
      {/* main 标签呈现了文档的 <body> 或应用的主体部分 */}
      {/*  section 表示 HTML 文档中一个通用独立章节 */}
      <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理<button onClick={ handleAdd }
            disabled={ showAdd }>&#8853; 添加新卡片</button>
          </h2>
          <ul>
            {/* showAdd 为 true 时展示 KanbanNewCard 组件*/}
            { showAdd && <KanbanNewCard onSubmit={ handleSubmit } /> }
            {/* 将数组的每个对象元素展开，传递给 KanbanCard 组件*/}
            { todoList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
        <section className="kanban-column column-ongoing">
          <h2>进行中</h2>
          <ul>
            { ongoingList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
        <section className="kanban-column column-done">
          <h2>已完成</h2>
          <ul>
            { doneList.map(props => <KanbanCard {...props}/>) }
          </ul>
        </section>
      </main>
    </div>
      );
    }

export default App;