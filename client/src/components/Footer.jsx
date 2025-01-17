import React from "react";
import { MessageSquare,  } from "lucide-react";
import { socialLinks } from "../lib/constants";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6" />
            <span className="text-xl font-bold">VChat</span>
          </div>

          <div className="flex space-x-6">
            {
              socialLinks.map((link, index) => (
                <a key={index} href={link.url} className="hover:text-blue-200 transition-colors">
                  {
                    React.createElement(link.icon, { className: "h-5 w-5" })
                  }
                </a>
              ))
            }
          </div>

          <p className="text-sm">© {new Date().getFullYear()} VChat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
