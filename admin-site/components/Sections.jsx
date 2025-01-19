"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Book, HelpCircle, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditSectionForm from "./EditSectionForm";
export default function Sections({ sections, onEdit, onDelete }) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <Card
          key={section.id}
          className="bg-gray-800 text-gray-100 hover:bg-gray-700 transition-colors duration-200"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Book className="mr-2 h-5 w-5 text-indigo-400" />
              {section.name}
            </CardTitle>
            <div className="flex space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                  </DialogHeader>
                  <EditSectionForm section={section} onEdit={onEdit} />
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => onDelete(section.id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 hover:bg-gray-600"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2 mt-2">
              <Button
                onClick={() => {
                  setSelectedSection(section.id);
                  setSelectedType("flashcards");
                }}
                variant="outline"
                size="sm"
                className="text-indigo-400 border-indigo-400 hover:bg-indigo-400 hover:text-white"
              >
                <Book className="mr-2 h-4 w-4" />
                Flashcards
              </Button>
              <Button
                onClick={() => {
                  setSelectedSection(section.id);
                  setSelectedType("questions");
                }}
                variant="outline"
                size="sm"
                className="text-green-400 border-green-400 hover:bg-green-400 hover:text-white"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Questions
              </Button>
              <Button
                onClick={() => {
                  setSelectedSection(section.id);
                  setSelectedType("words");
                }}
                variant="outline"
                size="sm"
                className="text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-white"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Words
              </Button>
            </div>
            {selectedType && selectedSection === section.id && (
              <Link href={`/section/${section.id}/${selectedType}`}>
                <Button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  View {selectedType}
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
