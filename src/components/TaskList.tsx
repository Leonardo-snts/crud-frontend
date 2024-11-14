import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

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
    const [showModal, setShowModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const getTasks = async () => {
        const response = await fetchTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleAddTask = async () => {
        if (!newTask.tarefa || !newTask.valor || !newTask.data_final) {
            setError('Todos os campos precisam ser preenchidos.');
            setShowErrorModal(true); // Exibe o modal de erro
            return;
        }

        try {
            const response = await createTask({ ...newTask, ordem: tasks.length + 1 });
            setTasks([...tasks, response.data]);
            setNewTask({ tarefa: '', valor: 0, data_final: '', ordem: tasks.length + 2 });
            setError(null); // Limpar erro após adicionar com sucesso
            setShowErrorModal(false); // Fecha o modal de erro
        } catch (err) {
            setError('Já existe uma tarefa com esse nome.'); // Captura erro e exibe a mensagem
            setShowErrorModal(true); // Exibe o modal de erro
        }
    };

    const handleUpdateTask = async (task: Task) => {
        if (!task.tarefa || !task.valor || !task.data_final) {
            setError('Todos os campos precisam ser preenchidos.');
            setShowErrorModal(true); // Exibe o modal de erro
            return;
        }

        try {
            if (editingTask) {
                await updateTask(task.id, task);
                setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
                setEditingTask(null);
                setError(null); // Limpar erro após edição bem-sucedida
                setShowErrorModal(false); // Fecha o modal de erro
            }
        } catch (err) {
            setError('Já existe uma tarefa com esse nome.'); // Captura erro e exibe a mensagem
            setShowErrorModal(true); // Exibe o modal de erro
        }
    };

    const handleDeleteTask = async () => {
        if (taskToDelete !== null) {
            await deleteTask(taskToDelete);
            setTasks(tasks.filter((task) => task.id !== taskToDelete));
            setShowModal(false);
            setTaskToDelete(null);
        }
    };

    const confirmDelete = (id: number) => {
        setTaskToDelete(id);
        setShowModal(true);
    };

    const startEdit = (task: Task) => {
        setEditingTask(task);
    };

    return (
        <div className="max-w-2xl p-4 mx-auto">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Lista de Tarefas</h2>
            {showErrorModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 left-[-8px]">
                    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="mb-4 text-lg font-bold text-gray-800">Erro</h3>
                        <p className="mb-6 text-gray-600">{error}</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowErrorModal(false)}
                                className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`flex justify-between items-center p-4 border rounded-lg shadow ${task.valor >= 1000 ? 'bg-yellow-200' : 'bg-white'}`}
                    >
                        {editingTask?.id === task.id ? (
                            <div className="w-full space-y-2">
                                <h2 className="font-bold text-gray-800 text-1xl">Nome da Tarefa:</h2>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.tarefa}
                                    onChange={(e) => setEditingTask({ ...editingTask, tarefa: e.target.value })}
                                />

                                <h2 className="mb-4 font-bold text-gray-800 text-1xl">Custo:</h2>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.valor}
                                    onChange={(e) => setEditingTask({ ...editingTask, valor: parseFloat(e.target.value) })}
                                />

                                <h2 className="mb-4 font-bold text-gray-800 text-1xl">Data Limite:</h2>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded"
                                    value={editingTask.data_final}
                                    onChange={(e) => setEditingTask({ ...editingTask, data_final: e.target.value })}
                                />

                                <div className="flex space-x-2">
                                    <button
                                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                                        onClick={() => handleUpdateTask(editingTask)}
                                    >
                                        Salvar
                                    </button>
                                    <button
                                        className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
                                        onClick={() => setEditingTask(null)}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <div>
                                    <p className="text-lg font-semibold">{task.tarefa}</p>
                                    <p className="text-gray-600">R$ {task.valor}</p>
                                    <p className="text-gray-600">Data Limite: {task.data_final}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <PencilIcon
                                        className="w-5 h-5 text-yellow-500 cursor-pointer hover:text-yellow-600"
                                        onClick={() => startEdit(task)}
                                    />
                                    <TrashIcon
                                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                                        onClick={() => confirmDelete(task.id)}
                                    />
                                    {showModal && (
                                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 left-[-8px]">
                                            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
                                                <h3 className="mb-4 text-lg font-bold text-gray-800">Confirmação de Exclusão</h3>
                                                <p className="mb-6 text-gray-600">Você tem certeza que deseja excluir esta tarefa?</p>
                                                <div className="flex justify-end gap-4">
                                                    <button
                                                        onClick={() => setShowModal(false)}
                                                        className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <button
                                                        onClick={handleDeleteTask}
                                                        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                                    >
                                                        Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-4 mt-8 border rounded-lg bg-gray-50">
                <h3 className="mb-2 text-xl font-semibold">Adicionar Nova Tarefa</h3>
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
                    <button
                        className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
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
