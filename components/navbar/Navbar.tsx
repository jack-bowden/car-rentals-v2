import Link from 'next/link';
import MobileNavbar from '../mobileNavbar/MobileNavbar';
import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { navBarItems } from '@/data';
import {
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from '../ui/dropdown-menu';

const Navbar = () => {
	return (
		<div className='w-full flex flex-col'>
			<div className='flex w-full justify-between items-center'>
				<div>
					<img src='/logo.svg' />
				</div>
				<div className='space-x-4 hidden md:flex items-center'>
					{navBarItems.map(item => (
						<Link
							key={item.name}
							href={item.href}
							className='hover:opacity-60 transition-all'
						>
							<p>{item.name}</p>
						</Link>
					))}

					<SignedOut>
						<SignInButton>
							<p className='cursor-pointer text-primary hover:text-red-300 transition-all'>
								Log in
							</p>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<SignOutButton>
							<p className='cursor-pointer text-primary hover:text-red-300 transition-all'>
								Log out
							</p>
						</SignOutButton>
						<DropdownMenu>
							<DropdownMenuTrigger className='focus:outline-none focus:bg-transparent'>
								<p className='cursor-pointer text-primary hover:text-red-300 transition-all'>
									Account
								</p>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<Link href='/bookings'>Bookings</Link>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Link href='/profile'>Profile</Link>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SignedIn>
				</div>

				<MobileNavbar />
			</div>
		</div>
	);
};

export default Navbar;
