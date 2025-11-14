import './globals.css';

export const metadata = {
  title: 'STYLEHAUS',
  description: 'Modern fashion ecommerce store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        {children}
      </body>
    </html>
  );
}
