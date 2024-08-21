import axios from 'axios';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { API } from '../config';
import { Todo } from '../types/Todo';

interface TodoContextType {
	todos: Todo[];
	addTodo: (todo: Todo) => void;
	toggleTodo: (id: number) => void;
	deleteTodo: (id: number) => void;
	loading: boolean;
	error: string | null;
	setError: (error: string | null) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function getTodos() {
			try {
				const response = await axios.get(`${API}/todos/`);
				setTodos(response.data);
			} catch (error) {
				setError((error as string) || 'An unexpected error occurred.');
			} finally {
				setLoading(false);
			}
		}

		getTodos();
	}, []);

	async function addTodo(todo: Todo) {
		try {
			const response = await axios.post(`${API}/todos/`, { title: todo.title });
			setTodos([...todos, response.data]);
		} catch (error) {
			setError((error as string) || 'Failed to add to-do item.');
		}
	}

	async function toggleTodo(id: number) {
		const todo = todos.find(todo => todo.id === id);
		if (todo) {
			try {
				const response = await axios.put(`${API}/todos/${id}/`, { ...todo, completed: !todo.completed });
				setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
			} catch (error) {
				setError((error as string) || 'Failed to update to-do item.');
			}
		}
	}

	async function deleteTodo(id: number) {
		try {
			await axios.delete(`${API}/todos/${id}/`);
			setTodos(todos.filter(todo => todo.id !== id));
		} catch (error) {
			setError((error as string) || 'Failed to delete to-do item.');
		}
	}

	return (
		<TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, loading, error, setError }}>
			{children}
		</TodoContext.Provider>
	);
}
