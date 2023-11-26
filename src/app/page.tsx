import style from "./page.module.scss";
import AddTodo from "../components/addTodo/AddTodo";
import TodosList from "../components/TodosList/TodosList";

const Todo = () => {
  return (
    <main className={style.mainContainer}>
      {/* <section className={style.todosContainer}>
        <div className={style.todosContent}>
          <h1>Todo Next + TS</h1>
          <AddTodo />
          <TodosList />
        </div>
      </section> */}
      <div className={style.todosContainer}>
        <div className={style.tools}>
          <div className={style.circle}>
            <span className={style.red}></span>
          </div>
          <div className={style.circle}>
            <span className={style.yellow}></span>
          </div>
          <div className={style.circle}>
            <span className={style.green}></span>
          </div>
        </div>
        <div className={style.todosContent}>
          <h1>Todo using Next.js + TS</h1>
          <AddTodo />
          <TodosList />
        </div>
      </div>
    </main>
  );
};

export default Todo;
