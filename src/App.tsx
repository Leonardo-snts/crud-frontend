import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddTask from './pages/AddTask';
import TaskList from './pages/TaskList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const ThemeContext = createContext<{
    theme: 'dark' | 'light';
    toggleTheme: () => void;
}>({
    theme: 'dark',
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: ReactNode;
}

const getTheme = (): 'dark' | 'light' => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
};

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>(getTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            return newTheme;
        });
    };

    useEffect(() => {
        // Atualiza o localStorage quando o tema é alterado
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    return useContext(ThemeContext);
};

function App() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            className={`${
                theme === 'light'
                    ? 'bg-white text-black border-black'
                    : 'bg-gray-900 text-gray-100 border-gray-100'
            } h-full`}
        >
            <Router>
                <div className="p-4">
                    <button
                        onClick={toggleTheme}
                        className={`fixed top-4 right-4 flex items-center justify-center px-4 py-2 rounded-full shadow-lg transition-transform duration-300  
                            ${
                                theme === 'light'
                                    ? 'bg-blue-700 text-blue-100 hover:bg-blue-800'
                                    : 'bg-yellow-900 text-gray-100 hover:bg-yellow-500'
                            }`}
                    >
                        {theme === 'light' ? '🌙' : '☀'}
                        <span className="ml-2">{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
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
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    );
}
