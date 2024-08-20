import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Car Rentals',
	description: 'A site to handle booking of car rentals',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<ClerkProvider>
				<Script
					id='matomo'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u="//matomo.jackbowden.co.uk/";
              _paq.push(['setTrackerUrl', u+'matomo.php']);
              _paq.push(['setSiteId', '2']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `,
					}}
				/>
				<html lang='en'>
					<body className={font.className}>
						<ToastContainer />
						<main className='min-h-full max-h-screen py-4 mx-auto max-w-6xl px-10'>
							<Navbar />
							{children}
						</main>
					</body>
				</html>
			</ClerkProvider>
		</>
	);
}
