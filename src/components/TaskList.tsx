import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

export interface Task {
    id: number;
    tarefa: string;
    valor: number;
    data_final: string;
    ordem: number;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [newTask, setNewTask] = useState({ tarefa: '', valor: 0, data_final: '', ordem: tasks.length + 1 });

    const getTasks = async () => {
        const response = await fetchTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleAddTask = async () => {
        const response = await createTask({ ...newTask, ordem: tasks.length + 1 });
        setTasks([...tasks, response.data]);
        setNewTask({ tarefa: '', valor: 0, data_final: '', ordem: tasks.length + 2 });
    };

    const handleUpdateTask = async (task: Task) => {
        if (editingTask) {
            await updateTask(task.id, task);
            setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
            setEditingTask(null);
        }
    };

    const handleDeleteTask = async (id: number) => {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const startEdit = (task: Task) => {
        setEditingTask(task);
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Tarefas</h2>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 border rounded-lg shadow ${
                            task.valor >= 1000 ? 'bg-yellow-200' : 'bg-white'
                        }`}
                    >
                        {editingTask?.id === task.id ? (
                            <div className="space-y-2">

                                <h2 className="text-1xl font-bold text-gray-800">Nome da Tarefa:</h2>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.tarefa}
                                    onChange={(e) => setEditingTask({ ...editingTask, tarefa: e.target.value })}
                                />

                                <h2 className="text-1xl font-bold text-gray-800 mb-4">Custo:</h2>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.valor}
                                    onChange={(e) => setEditingTask({ ...editingTask, valor: parseFloat(e.target.value) })}
                                />

                                <h2 className="text-1xl font-bold text-gray-800 mb-4">Data Limite:</h2>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.data_final}
                                    onChange={(e) => setEditingTask({ ...editingTask, data_final: e.target.value })}
                                />
                                
                                <h2 className="text-1xl font-bold text-gray-800 mb-4">Posição de Ordem:</h2>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.ordem}
                                    onChange={(e) => setEditingTask({ ...editingTask, ordem: parseInt(e.target.value) })}
                                />

                                <div className="flex space-x-2">
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => handleUpdateTask(editingTask)}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        onClick={() => setEditingTask(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-semibold">{task.tarefa}</p>
                                <p className="text-gray-600">R$ {task.valor}</p>
                                <p className="text-gray-600">Data Limite: {task.data_final}</p>
                                {/* <p className="text-gray-600">Ordem: {task.ordem}</p> */}
                                <div className="flex space-x-2 mt-2">
                                    <button
                                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                        onClick={() => startEdit(task)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                <h3 className="text-xl font-semibold mb-2">Adicionar Nova Tarefa</h3>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Nome da tarefa"
                        className="w-full p-2 border rounded"
                        value={newTask.tarefa}
                        onChange={(e) => setNewTask({ ...newTask, tarefa: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Custo (R$)"
                        className="w-full p-2 border rounded"
                        value={newTask.valor}
                        onChange={(e) => setNewTask({ ...newTask, valor: parseFloat(e.target.value) })}
                    />
                    <input
                        type="date"
                        className="w-full p-2 border rounded"
                        value={newTask.data_final}
                        onChange={(e) => setNewTask({ ...newTask, data_final: e.target.value })}
                    />
                    {/* <input
                        type="number"
                        placeholder="Ordem"
                        className="w-full p-2 border rounded"
                        value={newTask.ordem}
                        onChange={(e) => setNewTask({ ...newTask, ordem: parseInt(e.target.value) })}
                    /> */}
                    <button
                        className="w-full px-4 py-2 mt-4 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={handleAddTask}
                    >
                        Incluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskList;
