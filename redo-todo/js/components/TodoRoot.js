// @flow
/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';

import {useLazyLoadQuery, graphql} from 'react-relay/hooks';

import type {TodoRootQueryResponse} from 'relay/TodoRootQuery.graphql';

import TodoApp from './TodoApp';
import ErrorBoundaryWithRetry from '../ErrorBoundaryWithRetry';

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
  <ErrorBoundaryWithRetry fallback={error => <div>{error.message}</div>}>
    <React.Suspense fallback={<Loading />}>
      <TodoRoot />
    </React.Suspense>
  </ErrorBoundaryWithRetry>
);

export default TodoRootWrapper;
