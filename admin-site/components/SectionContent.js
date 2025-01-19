import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookOpen, CreditCard, HelpCircle } from "lucide-react";

export function SectionContent({ selectedSection, onEdit, onContentEdit }) {
  if (!selectedSection) return null;

  return (
    <Card className="mt-8 bg-gray-800">
      <CardHeader>
        <CardTitle>{selectedSection.title}</CardTitle>
        <CardDescription>Edit section content</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="content" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="flashcard" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-2" />
              Flashcard
            </TabsTrigger>
            <TabsTrigger value="question" className="flex items-center">
              <HelpCircle className="w-4 h-4 mr-2" />
              Question
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <Textarea
              className="min-h-[200px] w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedSection.content || ""}
              onChange={(e) => onContentEdit("content", e.target.value)}
              placeholder="Enter section content here..."
            />
          </TabsContent>
          <TabsContent value="flashcard">
            <Textarea
              className="min-h-[200px] w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedSection.flashcard || ""}
              onChange={(e) => onContentEdit("flashcard", e.target.value)}
              placeholder="Enter flashcard content here..."
            />
          </TabsContent>
          <TabsContent value="question">
            <Textarea
              className="min-h-[200px] w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={selectedSection.question || ""}
              onChange={(e) => onContentEdit("question", e.target.value)}
              placeholder="Enter question content here..."
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <div className="px-6 py-3 bg-gray-700 rounded-b-lg flex justify-end">
        <Button
          onClick={() => onEdit(selectedSection, "section")}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Edit Section
        </Button>
      </div>
    </Card>
  );
}
