const Input = ({ icon: Icon, ...props }) => {
	return (
		<div className='relative mb-3'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-black font-bold' />
			</div>
			<input
				{...props} required
				className='w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-black placeholder-gray-400 transition duration-200'
			/>
		</div>
	);
};
export default Input;
