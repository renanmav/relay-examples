import React from 'react';

import {useLazyLoadQuery, graphql} from 'react-relay/hooks';

import type {TodoRootQueryResponse} from 'relay/TodoRootQuery.graphql';

const TodoRoot = () => {
  const {user}: TodoRootQueryResponse = useLazyLoadQuery(
    graphql`
      query TodoRootQuery($id: String) {
        user(id: $id) {
          id
        }
      }
    `,
    {id: 'me'},
  );
  return <div>{user.id}</div>;
};

const TodoRootWrapper = () => (
  <React.Suspense fallback={() => <div>Loading</div>}>
    <TodoRoot />
  </React.Suspense>
);

export default TodoRootWrapper;
