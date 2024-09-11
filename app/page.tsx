
import NotesContainer from "@/components/NotesContainer";
import Sidebar from "@/components/Sidebar";


export default function Home() {

  return (
    <main className="grid min-h-screen grid-cols-[65px_1fr] ">
      <Sidebar />
      <NotesContainer />
    </main>
  );
}
