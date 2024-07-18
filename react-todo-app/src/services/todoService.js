import { toast } from "react-toastify";
import axios from "axios";

const todoService = {
  getTodosBackend: async (setCallBackFunc) => {
    try {
      const config = {
        method: "get",
        url: `${import.meta.env.VITE_BASE_URI}/${
          import.meta.env.VITE_GET_ROOT
        }`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      console.log(res);
      setCallBackFunc(res.data.todos);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  },
  addTodoBackend: async (newTodo) => {
    try {
      const config = {
        method: "post",
        url: `${import.meta.env.VITE_BASE_URI}/${
          import.meta.env.VITE_POST_ROUTE
        }`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(newTodo),
      };
      const res = await axios(config);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  },
  deleteTodoBackend: async (todoId) => {
    try {
      const config = {
        method: "delete",
        url: `${import.meta.env.VITE_BASE_URI}/${
          import.meta.env.VITE_DELETE_ROUTE
        }/${todoId}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      console.log(res);
      toast.success(res.data.message);

      // console.log(`Todo with id ${todoId} send for deletion`);
    } catch (error) {
      toast.error(error.data.message);
    }
  },
  toggleTodoDoneBackend: async (todoId) => {
    try {
      // console.log(`ID send to backend: ${todoId}`);
      const config = {
        method: "put",
        url: `${import.meta.env.VITE_BASE_URI}/${
          import.meta.env.VITE_TODO_PUT_ROUTE
        }/${todoId}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  },
  updateTitleBackend: async (updateTitleObj) => {
    const { id: todoId, title: todoTitle } = updateTitleObj;
    //console.log(`id: ${todoId}, title: ${todoTitle}`);
    try {
      const config = {
        method: "put",
        url: `${import.meta.env.VITE_BASE_URI}/${
          import.meta.env.VITE_UPDATE_TITLE_ROUTE
        }/${todoId}/${todoTitle}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios(config);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.data.message);
    }
  },
};

export default todoService;
