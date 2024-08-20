import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '../ui/button';
import Link from 'next/link';
import { navBarItems } from '@/data';
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignOutButton,
} from '@clerk/nextjs';
import { X } from 'lucide-react';

const MobileNavbar = () => {
	return (
		<div className='flex items-center md:hidden'>
			<Drawer>
				<DrawerTrigger>
					<img src='/menu.svg' />
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						{navBarItems.map(item => (
							<Link
								key={item.name}
								href={item.href}
								className='hover:opacity-60'
							>
								<DrawerClose>{item.name}</DrawerClose>
							</Link>
						))}
						<SignedOut>
							<SignInButton>
								<Button
									className='mt-4'
									size='sm'
								>
									<DrawerClose>Log in</DrawerClose>
								</Button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<div className='flex w-full justify-center'>
								<SignOutButton>
									<Button
										className='w-full mt-4'
										size='sm'
									>
										<DrawerClose>Log out</DrawerClose>
									</Button>
								</SignOutButton>
							</div>

							<div className='flex'>
								<Button
									asChild
									size='sm'
									variant='outline'
									className='mr-1 w-full'
								>
									<a href='/bookings'>
										<DrawerClose>Bookings</DrawerClose>
									</a>
								</Button>
								<Button
									asChild
									size='sm'
									variant='outline'
									className='w-full'
								>
									<a href='/profile'>
										<DrawerClose>Profile</DrawerClose>
									</a>
								</Button>
							</div>
						</SignedIn>
					</DrawerHeader>
					<DrawerFooter>
						<DrawerClose>
							<div className='flex w-full justify-center'>
								<X className='text-foreground/60' />
							</div>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default MobileNavbar;
