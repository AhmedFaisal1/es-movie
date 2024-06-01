import React,  { ReactNode } from "react";
import Navbar from "@/app/components/Navbar"; 
import Footer from "@/app/components/Footer"; 

interface NavbarFooterProps {
  children: ReactNode;
}
const NavbarFooterIncluded: React.FC<NavbarFooterProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default NavbarFooterIncluded;
