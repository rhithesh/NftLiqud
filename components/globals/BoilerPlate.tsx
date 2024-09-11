import Footer from "./Footer";
import { Navbar } from "./Navbar";

export function BoilerPlate({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-900 text-white font-mono">
        <Footer />
      </footer>
    </div>
  );
}

