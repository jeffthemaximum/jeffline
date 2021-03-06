import {
  ALL_TODOS,
  EDIT_TODO,
  CREATE_TODO,
  SINGLE_TODO,
  REMOVE_TODO,
} from './actionTypes';

import axios from 'axios';

import GraphQLSettings from '../../../graphql.json';

let GraphQLEndpoint = GraphQLSettings.development.endpoint;

if (process.env.NODE_ENV === 'production') {
  GraphQLEndpoint = GraphQLSettings.production.endpoint;
}

function getTodos() {
  let query = `
    query getTodos {
      todos {
        _id
        todo
        completed
      }
    }
  `;

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query
    }).then((result) => {
      if (result.data.errors) {
        dispatch({
          type: ALL_TODOS,
          error: result.data.errors,
        })
        return;
      }

      dispatch({
        type: ALL_TODOS,
        result: result.data.data.todos,
      });
    });
  };
}

function getTodo(variables) {
  let query = `
    query getTodo($_id: String!) {
      todo(_id: $_id) {
        _id
        todo
        completed
      }
    }
  `;

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query,
      variables,
    }).then((result) => {
      if (result.data.errors) {
        dispatch({
          type: SINGLE_TODO,
          error: result.data.errors,
        });
        return;
      }

      dispatch({
        type: SINGLE_TODO,
        result: result.data.data.todo,
      });
    })
  };
}

function createTodo(variables) {
  let query = `
    mutation createTodoMutation($todo: String!) {
      createTodo(todo: $todo) {
        _id
        todo
        completed
      }
    }
  `;

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query,
      variables,
    }).then((result) => {
      if (result.data.errors) {
        dispatch({
          type: CREATE_TODO,
          error: result.data.errors,
        })
        return;
      }

      dispatch({
        type: CREATE_TODO,
        result: result.data.data.createTodo,
      });
    });
  };
}

function updateTodo(variables) {
  let query = `
    mutation updateTodoMutation($_id: String!, $todo: String, $completed: Boolean) {
      updateTodo(_id: $_id, todo: $todo, completed: $completed) {
        _id
        todo
        completed
      }
    }
  `;

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query,
      variables,
    }).then((result) => {
      if (result.data.errors) {
        dispatch({
          type: EDIT_TODO,
          error: result.data.errors,
        })
        return;
      }

      dispatch({
        type: EDIT_TODO,
        result: result.data.data.updateTodo,
      });
    });
  };
}

function removeTodo(variables) {
  let query = `
    mutation removeTodoMutation($_id: String!) {
      removeTodo(_id: $_id) {
        _id
      }
    }
  `;

  return dispatch => {
    return axios.post(GraphQLEndpoint, {
      query,
      variables
    }).then((result) => {
      if (result.data.errors) {
        dispatch({
          type: REMOVE_TODO,
          error: result.data.errors,
        })
        return;
      }

      dispatch({
        type: REMOVE_TODO,
        result: result.data.data.removeTodo,
      });
    });
  };
}

module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  removeTodo,
};
