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

import React, {type Node} from 'react';

type State = {|
  error: ?Error,
|};

type Props = {|
  fallback: Function,
  children: Node,
|};

class ErrorBoundaryWithRetry extends React.Component<Props, State> {
  state = {error: null};

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  _retry = () => {
    this.setState({error: null});
  };

  render() {
    const {children, fallback} = this.props;
    const {error} = this.state;

    if (error) {
      if (typeof fallback === 'function') {
        return fallback(error, this._retry);
      }
      return fallback;
    }
    return children;
  }
}

export default ErrorBoundaryWithRetry;
