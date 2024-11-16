import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface Task {
    id: number;
    tarefa: string;
    valor: number;
    data_final: string;
    ordem: number;
}

const ButtonHome: React.FC = () => {
    const navigate = useNavigate();
    const handleHomeTask = () => {
        navigate('/'); 
    };



    return (
        <div>
            <button
                className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleHomeTask}
            >
                Voltar Para Lista de Tarefas
            </button>

            
        </div>
    );
};

export default ButtonHome;
