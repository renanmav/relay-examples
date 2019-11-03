// @flow
import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation';

import React from 'react';
import {graphql, useFragment, useRelayEnvironment} from 'react-relay/hooks';

import type {
  TodoListFooter_user$key,
  TodoListFooter_user,
} from 'relay/TodoListFooter_user.graphql';

type Todos = $NonMaybeType<$ElementType<TodoListFooter_user, 'todos'>>;
type Edges = $NonMaybeType<$ElementType<Todos, 'edges'>>;
type Edge = $NonMaybeType<$ElementType<Edges, number>>;

type Props = {|
  user: TodoListFooter_user$key,
|};

const TodoListFooter = (props: Props) => {
  const environment = useRelayEnvironment();

  const user = useFragment(
    graphql`
      fragment TodoListFooter_user on User {
        id
        userId
        completedCount
        todos(
          first: 2147483647 # max GraphQLInt
        ) @connection(key: "TodoList_todos") {
          edges {
            node {
              id
              complete
            }
          }
        }
        totalCount
      }
    `,
    props.user,
  );

  const {todos, completedCount, totalCount} = user;

  const completedEdges: $ReadOnlyArray<?Edge> =
    todos && todos.edges
      ? todos.edges.filter(
          (edge: ?Edge) => edge && edge.node && edge.node.complete,
        )
      : [];

  const handleRemoveCompletedTodosClick = () => {
    RemoveCompletedTodosMutation.commit(
      environment,
      {
        edges: completedEdges,
      },
      user,
    );
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? '' : 's'} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}>
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoListFooter;
