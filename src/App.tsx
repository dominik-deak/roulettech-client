import AddToDo from './components/AddToDo';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import { TodoProvider } from './contexts/TodoContext';

export default function App() {
	return (
		<TodoProvider>
			<div className='container mx-auto mt-5'>
				<Header />
				<AddToDo />
				<ToDoList />
			</div>
		</TodoProvider>
	);
}
