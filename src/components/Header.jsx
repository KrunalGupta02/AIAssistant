import React from "react";
import { Menu } from "lucide-react";

function Header({ setSidebarOpen }) {
  return (
    <header className="bg-white shadow-sm p-4 flex items-center">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mr-4 hover:bg-gray-100 p-2 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>
      <h1 className="text-xl font-semibold">AI Assistant</h1>
    </header>
  );
}

export default Header;
