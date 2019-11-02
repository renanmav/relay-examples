import React from 'react';

import {useLazyLoadQuery, graphql} from 'react-relay/hooks';

import type {TodoRootQueryResponse} from 'relay/TodoRootQuery.graphql';

import TodoApp from './TodoApp';

const TodoRoot = () => {
  const {user}: TodoRootQueryResponse = useLazyLoadQuery(
    graphql`
      query TodoRootQuery($id: String) {
        user(id: $id) {
          ...TodoApp_user
        }
      }
    `,
    {id: 'me'},
  );

  return <TodoApp user={user} />;
};

const Loading = () => <div>Loading</div>;

const TodoRootWrapper = () => (
  <React.Suspense fallback={Loading}>
    <TodoRoot />
  </React.Suspense>
);

export default TodoRootWrapper;
