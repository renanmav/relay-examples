// @flow
import AddTodoMutation from '../mutations/AddTodoMutation';

import React from 'react';
import {useFragment, graphql, useRelayEnvironment} from 'react-relay/hooks';

import type {TodoApp_user$key} from 'relay/TodoApp_user.graphql';

import TodoList from './TodoList';
import TodoTextInput from './TodoTextInput';
import TodoListFooter from './TodoListFooter';

type Props = {|
  user: ?TodoApp_user$key,
|};

const TodoApp = (props: Props) => {
  const environment = useRelayEnvironment();

  const user = useFragment(
    graphql`
      fragment TodoApp_user on User {
        id
        userId
        totalCount
        ...TodoList_user
        ...TodoListFooter_user
      }
    `,
    props.user,
  );

  const handleTextInputSave = (text: string) => {
    AddTodoMutation.commit(environment, text, user);
    return;
  };

  const hasTodos = user.totalCount > 0;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={user} />
        {hasTodos && <TodoListFooter user={user} />}
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
