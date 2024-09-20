import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NotesProvider from "@/components/shared/NotesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteANote",
  description: "Simple note taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotesProvider>
          {children}
        </NotesProvider>
      </body>
    </html>
  );
}
