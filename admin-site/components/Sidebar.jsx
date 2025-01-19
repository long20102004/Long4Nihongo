import { Home, Users, BookOpen } from "lucide-react";

export default function Sidebar({ setCurrentView }) {
  return (
    <div className="flex flex-col w-64 bg-gray-800 sm:rounded-lg">
      <div className="flex items-center justify-center h-16 px-4 bg-gray-900 sm:rounded-lg">
        <span className="text-lg font-semibold text-white sm:rounded-lg">
          Admin Dashboard
        </span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <a
            href="#"
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            onClick={() => setCurrentView("courses")}
          >
            <Home className="mr-3 h-6 w-6" />
            Courses
          </a>
          <a
            href="#"
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            onClick={() => setCurrentView("users")}
          >
            <Users className="mr-3 h-6 w-6" />
            Users
          </a>
        </nav>
      </div>
    </div>
  );
}
