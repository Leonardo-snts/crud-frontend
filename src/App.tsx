import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import TaskList from './pages/TaskList';

// Criando o contexto de tema
const ThemeContext = createContext<{
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}>({
    theme: 'light',
    toggleTheme: () => { },
});

// Corrigindo o tipo do ThemeProvider para aceitar children
interface ThemeProviderProps {
    children: ReactNode; // Adiciona o tipo correto para children
}

// Criando o provider de tema
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Componente que consome o tema
const useTheme = () => {
    return useContext(ThemeContext);
};

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
                } h-screen`} // Usando h-screen para garantir que o fundo ocupe toda a tela
        >
            <Router>
                <div className="p-4">
                    <button
                        onClick={toggleTheme}
                        className="px-4 py-2 text-white bg-blue-500 rounded-md"
                    >
                        {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                    </button>
                </div>

                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/add-task" element={<AddTask />} />
                </Routes>
            </Router>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    );
}
