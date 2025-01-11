import { Button } from "@/components/ui/button"
import { Trash2, Edit } from 'lucide-react'

export default function Sections({ sections, onSelect, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg mt-4">
      <ul className="divide-y divide-gray-700">
        {sections.map((section) => (
          <li key={section.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-700 transition-colors duration-200">
            <div className="flex-1 cursor-pointer" onClick={() => onSelect(section)}>
              <div className="text-lg font-medium text-indigo-400">{section.title}</div>
              <div className="text-sm text-gray-400">{section.content.substring(0, 50)}...</div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(section);
                }}
                variant="outline"
                size="icon"
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(section.id);
                }}
                variant="destructive"
                size="icon"
                className="h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

