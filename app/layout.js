import "./globals.css";

export const metadata = {
  title: "Bookworm — a personal book manager",
  description:
    "Log your books, track your reading, and rediscover your favorite authors.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      {/* eslint-disable @next/next/no-page-custom-font -- App Router root layout, not pages/_document */}
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* eslint-enable @next/next/no-page-custom-font */}
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
