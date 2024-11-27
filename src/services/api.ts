import axios from "axios";
import { Task } from "../pages/TaskList";
import { setupCache } from "axios-cache-interceptor";

const api = axios.create({
  // baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "http://localhost:8080/api/",
  baseURL: "https://django-api-431548593185.southamerica-east1.run.app/api/",
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
