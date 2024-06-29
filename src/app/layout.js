import '../styles/globals.css';

export const metadata = {
  title: 'Valéria Shopper',
  description: 'Landing page for Valéria Shopper',
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
