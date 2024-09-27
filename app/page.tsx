import NotesContainer from "@/components/NotesContainer";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

export default function Home() {

  return (
    <main className="grid min-h-screen grid-cols-[65px_1fr] ">
      <Sidebar />
      <NotesContainer />
      <Toaster 
        toastOptions={{
          style: {
            color: "white",
            backgroundColor: "#222",
          }
        }}
      />
    </main>
  );
}
