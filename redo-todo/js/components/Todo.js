// @flow
import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';

import React, {useState} from 'react';
import {graphql, useFragment, useRelayEnvironment} from 'react-relay/hooks';
import classnames from 'classnames';

import type {Todo_todo$key} from 'relay/Todo_todo.graphql';
import type {Todo_user$key} from 'relay/Todo_user.graphql';

import TodoTextInput from './TodoTextInput';

type Props = {|
  todo: Todo_todo$key,
  user: Todo_user$key,
|};

const Todo = (props: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const environment = useRelayEnvironment();
  const todo = useFragment(
    graphql`
      fragment Todo_todo on Todo {
        complete
        id
        text
      }
    `,
    props.todo,
  );
  const user = useFragment(
    graphql`
      fragment Todo_user on User {
        id
        userId
        totalCount
        completedCount
      }
    `,
    props.user,
  );

  const handleCompleteChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    ChangeTodoStatusMutation.commit(environment, complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    RenameTodoMutation.commit(environment, text, todo);
  };

  const removeTodo = () => RemoveTodoMutation.commit(environment, todo, user);

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}>
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
