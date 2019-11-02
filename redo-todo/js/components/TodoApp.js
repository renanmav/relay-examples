import React from 'react';
import {useFragment, graphql} from 'react-relay/hooks';

import TodoList from './TodoList';

import type {TodoApp_user$key} from 'relay/TodoApp_user.graphql';

type Props = {|
  user: TodoApp_user$key,
|};

const TodoApp = (props: Props) => {
  const user = useFragment(
    graphql`
      fragment TodoApp_user on User {
        id
        userId
        totalCount
        ...TodoList_user
      }
    `,
    props.user,
  );

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          {/* <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          /> */}
        </header>

        <TodoList user={user} />
        {/* {hasTodos && <TodoListFooter user={user} />} */}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{' '}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default TodoApp;
