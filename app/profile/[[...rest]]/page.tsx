import {
	RedirectToSignIn,
	SignedIn,
	SignedOut,
	UserProfile,
} from '@clerk/nextjs';

const ProfilePage = () => {
	return (
		<div className='w-full h-[88vh]'>
			<div className='py-6 w-full flex justify-center'>
				<SignedIn>
					<UserProfile
						appearance={{
							elements: {
								cardBox: {
									maxHeight: '84vh',
								},
							},
						}}
					/>
				</SignedIn>
			</div>
			<SignedOut>
				<RedirectToSignIn />
			</SignedOut>
		</div>
	);
};

export default ProfilePage;
