import { useState } from 'react';
import { useTodoContext } from '../hooks/useTodoContext';

export default function AddToDo() {
	const { addTodo, error, setError } = useTodoContext();
	const [todo, setTodo] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (todo.trim() === '') {
			setError('Task cannot be empty');
			return;
		}
		if (todo.length > 100) {
			setError('Task cannot exceed 100 characters');
			return;
		}

		setLoading(true);
		setError(null);
		try {
			addTodo({ id: 0, title: todo, completed: false });
			setTodo('');
		} catch (error) {
			setError(error as string);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className='mt-6 flex items-center justify-center'>
			<form onSubmit={handleSubmit}>
				<h2 className='text-2xl'>Enter Task</h2>

				<div className='flex gap-2'>
					<input
						type='text'
						placeholder='Enter task'
						className='input input-bordered input-primary w-full max-w-xs'
						required
						disabled={loading}
						value={todo}
						onChange={e => setTodo(e.target.value)}
					/>

					<button type='submit' className='btn btn-square btn-primary' disabled={loading}>
						{loading ? 'Adding...' : 'Add'}
					</button>
				</div>

				{error && <p className='mt-2 text-red-500'>{error}</p>}
			</form>
		</div>
	);
}
