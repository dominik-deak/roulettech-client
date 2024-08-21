export default function Loading() {
	return (
		<div className='mt-6 flex items-center justify-center'>
			<div className='m-5 flex gap-2'>
				<span className='loading loading-spinner' />
				<p>Loading...</p>
			</div>
		</div>
	);
}
