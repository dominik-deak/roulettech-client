import { useTodoContext } from '../hooks/useTodoContext';
import Loading from './Loading';
import ToDoItem from './ToDoItem';

export default function ToDoList() {
	const { todos, toggleTodo, deleteTodo, loading } = useTodoContext();

	if (loading) {
		return <Loading />;
	}

	if (todos.length === 0) {
		return (
			<div className='mt-6 flex items-center justify-center'>
				<p className='text-2xl text-gray-500'>No tasks available. Add a new task!</p>
			</div>
		);
	}

	return (
		<div className='mt-6 flex items-center justify-center'>
			<ul>
				{todos.map(todo => (
					<ToDoItem
						key={todo.id}
						id={todo.id}
						title={todo.title}
						completed={todo.completed}
						onToggle={toggleTodo}
						onDelete={deleteTodo}
					/>
				))}
			</ul>
		</div>
	);
}
