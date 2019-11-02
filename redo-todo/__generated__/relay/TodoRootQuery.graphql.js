/**
 * @flow
 * @relayHash 194bf8f1e31c800dbc3f1706a8317750
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
import type { TodoApp_user$ref } from "./TodoApp_user.graphql";
export type TodoRootQueryVariables = {|
  id?: ?string
|};
export type TodoRootQueryResponse = {|
  +user: ?{|
    +$fragmentRefs: TodoApp_user$ref
  |}
|};
export type TodoRootQuery = {|
  variables: TodoRootQueryVariables,
  response: TodoRootQueryResponse,
|};
*/


/*
query TodoRootQuery(
  $id: String
) {
  user(id: $id) {
    ...TodoApp_user
    id
  }
}

fragment TodoApp_user on User {
  id
  userId
  totalCount
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "id",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "TodoRootQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TodoApp_user",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TodoRootQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "user",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "id",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "userId",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "totalCount",
            "args": null,
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "TodoRootQuery",
    "id": null,
    "text": "query TodoRootQuery(\n  $id: String\n) {\n  user(id: $id) {\n    ...TodoApp_user\n    id\n  }\n}\n\nfragment TodoApp_user on User {\n  id\n  userId\n  totalCount\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4a0c414db4a5906cac33969b08db00ed';
module.exports = node;
