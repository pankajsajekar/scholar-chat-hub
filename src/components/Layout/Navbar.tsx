
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, Users, Search, Book, Award, Calendar, TrendingUp, Briefcase, GraduationCap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatDrawer from "@/components/Chat/ChatDrawer";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap text-primary">
              Scholar<span className="text-blue-500">Chat</span>Hub
            </span>
          </Link>
        </div>
        
        <div className="flex items-center md:order-2 space-x-3">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" className="hidden md:flex" onClick={() => setIsChatOpen(true)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat Assistant
          </Button>
        </div>
        
        <div className="flex items-center md:order-1">
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/courses"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/students"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/grades"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Grades
              </Link>
            </li>
            <li>
              <Link
                to="/attendance"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Attendance
              </Link>
            </li>
            <li>
              <Link
                to="/performance"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Performance
              </Link>
            </li>
            <li>
              <Link
                to="/internships"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Internships
              </Link>
            </li>
            <li>
              {/* Mobile only: Chat Assistant (should not duplicate Sheet, only open) */}
              <Button
                onClick={() => setIsChatOpen(true)}
                variant="outline"
                className="block md:hidden py-2 pr-4 pl-3 border-b border-gray-100 w-full text-left"
                type="button"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat Assistant
              </Button>
            </li>
          </ul>
        </div>
      </div>
      {/* Chat drawer should render here to be global and persistent */}
      <ChatDrawer open={isChatOpen} onOpenChange={setIsChatOpen} />
    </nav>
  );
};

export default Navbar;

