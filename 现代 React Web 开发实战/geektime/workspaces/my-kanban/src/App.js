/** @jsxImportSource @emotion/react */
// 在 App.js 文件开头加入一行 JSX Pragma（编译指示），告诉 JS 编译器使用 @emotion/react 包来替代 React 原生的jsx 运行时
import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
// 从 @emotion/react 包导入 css 函数
// 利用 CSS-in-JS 技术将 React 组件的 CSS 样式也组件化（代替从 App.css 中引入的类名样式）
// 当你用 @emotion/react 的 css 属性写组件样式时，从框架设计上你可以把 React 内外的变量都插进样式代码里，包括 React 组件的 props、state 和 context。
import { css } from '@emotion/react';

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const UPDATE_INTERVAL = MINUTE;
// 循环渲染事项的组件
const KanbanCard = ({ title, status }) => {
  const [displayTime, setDisplayTime] = useState(status);
  useEffect(() => {
    // updateDisplayTime 函数作用：根据卡片创建时间计算相对时间，并每分钟一次设置到 displayTime 上，卡片随即更新。
    const updateDisplayTime = () => {
      const timePassed = new Date() - new Date(status);
      let relativeTime = '刚刚';
      if (MINUTE <= timePassed && timePassed < HOUR) {
        relativeTime = `${Math.ceil(timePassed / MINUTE)} 分钟前`;
      } else if (HOUR <= timePassed && timePassed < DAY) {
        relativeTime = `${Math.ceil(timePassed / HOUR)} 小时前`;
      } else if (DAY <= timePassed) {
        relativeTime = `${Math.ceil(timePassed / DAY)} 天前`;
      }
      setDisplayTime(relativeTime);
    };
    // setTimeout 函数用来指定某个函数或某段代码，在多少毫秒之后执行。
    // setInterval 指定 updateDisplayTime 函数每隔 60s 就执行一次，也就是无限次的定时执行。
    const intervalId = setInterval(updateDisplayTime, UPDATE_INTERVAL);
    // updateDisplayTime 作为 useEffect 第一个参数的回调函数，在组件首次挂载时会被调用。
    updateDisplayTime();

    // updateDisplayTime 回调函数的返回值是另一个 cleanup 函数，负责在组件被卸载时清除定时器。
    return function cleanup() {
      clearInterval(intervalId);
    };
  }, [status]);

  return (
    // <li className="kanban-card">
    //   <div className="card-title">{title}</div>
    //   <div className="card-status">{status}</div>
    // </li>
    <li css={kanbanCardStyle}>
      <div css={kanbanCardTitleStyle}>{title}</div>
      <div css={css`
        text-align: right;
        font-size: 0.8rem;
        color: #333;
      `} title={status}>{displayTime}</div>
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
    // <li className="kanban-card">
    //   <h3>添加新卡片</h3>
    //   <div className="card-title">
    //     <input type="text" value={ title }
    //       onChange={ handleChange } onKeyDown={ handleKeyDown } />
    //   </div>
    // </li>
    <li css={kanbanCardStyle}>
      <h3>添加新卡片</h3>
      <div css={css`
        ${kanbanCardTitleStyle}

        & > input[type="text"] {
          width: 80%;
        }
      `}>
        <input type="text" value={ title }
          onChange={ handleChange } onKeyDown={ handleKeyDown } />
      </div>
    </li>
  );
};

// 将 main 标签改写成 React 组件
// main 标签呈现了文档的 body 或应用的主体部分
const KanbanBoard = ({ children }) => (
  // <main className="kanban-board">{children}</main>
  // 将` `定义的模板字面量（Template Literals）直接拼在函数名后面是 ES6 里新加入的语法，称作带标签的模版字符串（Tagged Templates）
  <main css={css`
    flex: 10;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin: 0 1rem 1rem;
  `}>{children}</main>
);

// .kanban-card、.card-title 的样式不止被 KanbanCard 使用，还被 KanbanNewCard 使用，最直接的复用方式，就是在两个组件外部声明一个值为 css 函数执行结果的常量，然后赋给 HTML 元素的 css 属性
const kanbanCardStyle = css`
  margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  list-style: none;
  background-color: rgba(255, 255, 255, 0.4);
  text-align: left;

  // 为 kanbanCard 加上鼠标悬停效果 -> 使用伪类选择器
  &:hover {
    box-shadow: 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2), inset 0 1px #fff;
  }
`;
const kanbanCardTitleStyle = css`
  min-height: 3rem;
`;

// 三个看板的背景颜色
const COLUMN_BG_COLORS = {
  todo: '#C9AF97',
  ongoing: '#FFE799;',
  done: '#C0E8BA',
}

// 将 section 标签也写成 React 组件
// section 表示 HTML 文档中一个通用独立章节
const KanbanColumn = ({ children, bgColor, title }) => {
  // const combinedClassName = `kanban-column ${className}`;
  return (
    // <section className={combinedClassName}>
    //   <h2>{title}</h2>
    //   <ul>{children}</ul>
    // </section>

    // 用 CSS-in-JS 代替类名
    <section css={css`
      flex: 1 1;
      display: flex;
      flex-direction: column;
      border: 1px solid gray;
      border-radius: 1rem;
      background-color: ${bgColor};
      // emotion 框架的嵌套选择器
      // > 是子选择器
      & > h2 {
        margin: 0.6rem 1rem;
        padding-bottom: 0.6rem;
        border-bottom: 1px solid gray;

        & > button {
          float: right;
          margin-top: 0.2rem;
          padding: 0.2rem 0.5rem;
          border: 0;
          border-radius: 1rem;
          height: 1.8rem;
          line-height: 1rem;
          font-size: 1rem;
        }
      }

      & > ul {
        flex: 1;
        flex-basis: 0;
        overflow: auto;
        margin: 1rem;
        padding: 0;
      }
    `}>
      <h2>{title}</h2>
      <ul>{children}</ul>
    </section>
  );
};

function App() {
  // showAdd 的初始值为 false，改变其值的方法是 setShowAdd
  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '2022-11-02 18:15' },
    { title: '开发任务-3', status: '2022-11-01 18:15' },
    { title: '开发任务-5', status: '2022-05-22 18:15' },
    { title: '测试任务-3', status: '2022-05-22 18:15' }
  ]);
  const [ongoingList] = useState([
    { title: '开发任务-4', status: '2022-05-22 18:15' },
    { title: '开发任务-6', status: '2022-05-22 18:15' },
    { title: '测试任务-2', status: '2022-05-22 18:15' }
  ]);
  const [doneList] = useState([
    { title: '开发任务-2', status: '2022-05-22 18:15' },
    { title: '测试任务-1', status: '2022-05-22 18:15' }
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
        <KanbanColumn bgColor={COLUMN_BG_COLORS.todo} title={
            // 相邻的 JSX 元素必须包装在封闭标记中
            <>
            待处理<button onClick={handleAdd}
              disabled={showAdd}>&#8853; 添加新卡片</button>
            </>
          }>
            { showAdd && <KanbanNewCard onSubmit={ handleSubmit } /> }
            { todoList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.ongoing} title="处理中">
          { ongoingList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
        <KanbanColumn bgColor={COLUMN_BG_COLORS.done} title="已完成">
          { doneList.map(props => <KanbanCard key={props.title} {...props}/>) }
        </KanbanColumn>
      </KanbanBoard>

    </div>
      );
    }

export default App;