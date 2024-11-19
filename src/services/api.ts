import axios from "axios";
import { Task } from "../pages/TaskList";

const api = axios.create({
  baseURL: "http://18.228.11.240:8080/api",
});

export const fetchTasks = async () => {
  return await api.get("/tasks/");
};

export const createTask = async (task: Omit<Task, "id">) => {
  return await api.post("/tasks/", task);
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  return await api.put(`/tasks/${id}/`, task);
};

export const deleteTask = async (id: number) => {
  return await api.delete(`/tasks/${id}/`);
};
