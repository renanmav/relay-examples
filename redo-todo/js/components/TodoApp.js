import React from 'react';

import {useFragment, graphql} from 'react-relay/hooks';

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
      }
    `,
    props.user,
  );

  return (
    <div>
      <p>id: {user.id}</p>
      <p>userId: {user.userId}</p>
      <p>totalCount: {user.totalCount}</p>
    </div>
  );
};

export default TodoApp;
