import { Bell, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-100">Japanese Learning Admin</h1>
        <div className="flex items-center">
          <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          <button className="ml-3 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open settings</span>
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

