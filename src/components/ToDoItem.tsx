import { RxCheck, RxCross2 } from 'react-icons/rx';

interface ToDoItemProps {
	id: number;
	title: string;
	completed: boolean;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
}

export default function ToDoItem({ id, title, completed, onToggle, onDelete }: ToDoItemProps) {
	return (
		<div className='mb-4 flex items-center justify-between'>
			<li className={`mr-4 p-2 text-xl ${completed ? 'text-gray-500 line-through' : ''}`}>{title}</li>
			<div className='flex gap-2'>
				<button className='btn btn-square btn-success' onClick={() => onToggle(id)}>
					<RxCheck className='h-6 w-6' />
				</button>
				<button className='btn btn-square btn-error' onClick={() => onDelete(id)}>
					<RxCross2 className='h-6 w-6' />
				</button>
			</div>
		</div>
	);
}
