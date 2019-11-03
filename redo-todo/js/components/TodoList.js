// @flow
import MarkAllTodosMutation from '../mutations/MarkAllTodosMutation';

import React from 'react';
import {useFragment, graphql, useRelayEnvironment} from 'react-relay/hooks';

import Todo from './Todo';

import type {
  TodoList_user$key,
  TodoList_user,
} from 'relay/TodoList_user.graphql';

type Todos = $NonMaybeType<$ElementType<TodoList_user, 'todos'>>;
type Edges = $NonMaybeType<$ElementType<Todos, 'edges'>>;
type Edge = $NonMaybeType<$ElementType<Edges, number>>;
type Node = $NonMaybeType<$ElementType<Edge, 'node'>>;

type Props = {|
  user: TodoList_user$key,
|};

const TodoList = (props: Props) => {
  const environment = useRelayEnvironment();

  const user: TodoList_user = useFragment(
    graphql`
      fragment TodoList_user on User {
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
              ...Todo_todo
            }
          }
        }
        id
        userId
        completedCount
        totalCount
        ...Todo_user
      }
    `,
    props.user,
  );

  const {todos, totalCount, completedCount} = user;

  const handleMarkAllChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;

    if (todos) {
      MarkAllTodosMutation.commit(environment, complete, todos, user);
    }
  };

  const nodes: $ReadOnlyArray<Node> =
    todos && todos.edges
      ? todos.edges
          .filter(Boolean)
          .map((edge: Edge) => edge.node)
          .filter(Boolean)
      : [];

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node: Node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
