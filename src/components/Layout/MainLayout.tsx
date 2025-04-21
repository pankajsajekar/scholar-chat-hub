
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8 px-4 md:px-8">
        <main className="container mx-auto pt-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
