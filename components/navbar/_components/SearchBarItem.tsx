interface SearchBarItemProps {
	title: string;
	subtitle: string;
}

const SearchBarItem = ({ title, subtitle }: SearchBarItemProps) => {
	return (
		<div className='flex flex-col cursor-pointer hover:font-semibold transition-all '>
			<div className='flex'>
				<img
					src='/icons/date.svg'
					className='mr-1.5'
				/>
				<p>{title}</p>
			</div>

			<p className='text-sm text-secondary-foreground truncate text-left'>
				{subtitle}
			</p>
		</div>
	);
};

export default SearchBarItem;
