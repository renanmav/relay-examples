/**
 * @flow
 * @relayHash 5a897bbc3e7843e4ffa48dcf4173a051
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TodoRootQueryVariables = {|
  id?: ?string
|};
export type TodoRootQueryResponse = {|
  +user: ?{|
    +id: string
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
    id
  }
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
    "kind": "LinkedField",
    "alias": null,
    "name": "user",
    "storageKey": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "plural": false,
    "selections": [
      {
        "kind": "ScalarField",
        "alias": null,
        "name": "id",
        "args": null,
        "storageKey": null
      }
    ]
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
    "selections": (v1/*: any*/)
  },
  "operation": {
    "kind": "Operation",
    "name": "TodoRootQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": (v1/*: any*/)
  },
  "params": {
    "operationKind": "query",
    "name": "TodoRootQuery",
    "id": null,
    "text": "query TodoRootQuery(\n  $id: String\n) {\n  user(id: $id) {\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '891e99beb8d0468d5f140c041607a277';
module.exports = node;
