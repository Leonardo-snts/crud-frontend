import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonAddTask = () => {
    const navigate = useNavigate();

    const handleAddTask = () => {
        navigate('/add-task'); 
    };

    return (
        <button
            className="sticky px-4 py-2 text-white transform -translate-x-1/2 bg-green-500 rounded-full shadow-lg bottom-4 left-1/2 hover:bg-green-600 focus:outline-none"
            onClick={handleAddTask}
        >
            Adicionar Tarefa
        </button>
    );
};

export default ButtonAddTask;
