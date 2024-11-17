import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask } from '../services/api';
import ButtonHome from '../components/ButtonHome';

export interface Task {
    id: number;
    tarefa: string;
    valor: number;
    data_final: string;
    ordem: number;
}

const AddTask: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState({ tarefa: '', valor: 0, data_final: '', ordem: tasks.length + 1 });
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [, setShowErrorModal] = useState(false);

    const getTasks = async () => {
        const response = await fetchTasks();
        const sortedTasks = response.data.sort((a: Task, b: Task) => a.ordem - b.ordem);
        setTasks(sortedTasks);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const reordenarTarefas = async (updatedTasks: Task[]) => {
        const reorderedTasks = updatedTasks.map((task, index) => ({ ...task, ordem: index + 1 }));
        setTasks(reorderedTasks);

        for (const task of reorderedTasks) {
            await updateTask(task.id, { ...task, ordem: task.ordem });
        }
    };

    const handleAddTask = async () => {
        if (!newTask.tarefa || !newTask.valor || !newTask.data_final) {
            setError('Todos os campos precisam ser preenchidos.');
            setShowErrorModal(true);
            return;
        }

        try {
            const response = await createTask({ ...newTask, ordem: tasks.length + 1 });
            const updatedTasks = [...tasks, response.data];
            await reordenarTarefas(updatedTasks);
            setNewTask({ tarefa: '', valor: 0, data_final: '', ordem: updatedTasks.length + 1 });
            setError(null);
            setShowErrorModal(false);
            setSuccessMessage('Tarefa salva com sucesso!');
            setTimeout(() => {
                setSuccessMessage(null);  // Limpar a mensagem de sucesso após alguns segundos
            }, 3000);
        } catch (err) {
            setError('Já existe uma tarefa com esse nome.');
            setShowErrorModal(true);
        }
    };

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className='h-screen max-h-screen p-4 '>
            <div className="max-w-md p-4 mx-auto mt-8 border rounded-lg">
                {error && (
                    <div className="p-2 mb-4 text-red-800 bg-red-200 rounded">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="p-2 mb-4 font-bold text-black bg-green-400 rounded">
                        {successMessage}
                    </div>
                )}
                <h3 className="mb-2 text-xl font-semibold">Adicionar Nova Tarefa</h3>
                <div className="space-y-2 ">
                    Nome da tarefa:
                    <input
                        type="text"
                        className="w-full p-2 bg-transparent border rounded"
                        value={newTask.tarefa}
                        onChange={(e) => setNewTask({ ...newTask, tarefa: e.target.value })}
                    /> 
                    Valor da tarefa (R$00,00):
                    <input
                        type="number"
                        className="w-full p-2 bg-transparent border rounded"
                        value={newTask.valor}
                        onChange={(e) => setNewTask({ ...newTask, valor: parseFloat(e.target.value) })}
                    />
                    Data Final da tarefa:
                    <input
                        type="date"
                        className="w-full p-2 bg-transparent border rounded"
                        min={getTodayDate()}
                        value={newTask.data_final}
                        onChange={(e) => setNewTask({ ...newTask, data_final: e.target.value })}
                    />
                    <button
                        className="w-full px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
                        onClick={handleAddTask}
                    >
                        Incluir
                    </button>
                    <ButtonHome />
                </div>
            </div>
        </div>
    );
};

export default AddTask;
