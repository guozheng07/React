import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';

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

// 将 main 标签也写成 React 组件
// main 标签呈现了文档的 body 或应用的主体部分
const KanbanBoard = ({ children }) => (
  <main className="kanban-board">{children}</main>
);

// 将 section 标签也写成 React 组件
// section 表示 HTML 文档中一个通用独立章节
const KanbanColumn = ({ children, className, title }) => {
  const combinedClassName = `kanban-column ${className}`;
  return (
    <section className={combinedClassName}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};

function App() {
  // showAdd 的初始值为 false，改变其值的方法是 setShowAdd
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' }
  ]);
  const [ongoingList] = useState([
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' }
  ]);
  const [doneList] = useState([
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' }
  ]);

  const handleAdd = (evt) => {
    setShowAdd(true);
  };
  const handleSubmit = (title) => {
    // 将新的待办事项放在最前面
    setTodoList(currentTodoList => [
      { title, status: new Date().toDateString() },
       ...currentTodoList 
    ]);
    // setShowAdd(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>我的看板</h1>
        <img src={ logo } className="App-logo" alt="logo" />
      </header>

      {/* 初始版本 */}
      {/* <main className="kanban-board">
        <section className="kanban-column column-todo">
          <h2>待处理<button onClick={ handleAdd }
            disabled={ showAdd }>&#8853; 添加新卡片</button>
          </h2>
          <ul>
            { showAdd && <KanbanNewCard onSubmit={ handleSubmit } /> }
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
      </main> */}

      {/* 改进版本 */}
      <KanbanBoard>
        {/* HTML 元素抽取成组件 props 时，要在外层加 Fragment */}
        <KanbanColumn className="column-todo" title={
            // 相邻的 JSX 元素必须包装在封闭标记中
            <>
            待处理<button onClick={handleAdd}
              disabled={showAdd}>&#8853; 添加新卡片</button>
            </>
          }>
            { showAdd && <KanbanNewCard onSubmit={ handleSubmit } /> }
            { todoList.map(props => <KanbanCard {...props}/>) }
        </KanbanColumn>
        <KanbanColumn className="column-ongoing" title="处理中">
          { ongoingList.map(props => <KanbanCard {...props}/>) }
        </KanbanColumn>
        <KanbanColumn className="column-done" title="已完成">
          { doneList.map(props => <KanbanCard {...props}/>) }
        </KanbanColumn>
      </KanbanBoard>

    </div>
      );
    }

export default App;