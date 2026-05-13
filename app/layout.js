export const metadata = {
  title: 'MyGPTList',
  description: 'Liste von ChatGPT Sprachmodellen'
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body style={{ margin: 0, background: '#f4f4f4' }}>
        {children}
      </body>
    </html>
  );
}
