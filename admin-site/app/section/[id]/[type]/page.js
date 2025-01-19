"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import FlashCardGrid from "@/components/grid/FlashCardsGrid";
import QuestionsGrid from "@/components/grid/QuestionsGrid";
import WordsGrid from "@/components/grid/WordsGrid";
import { ArrowLeft, Book, HelpCircle, BookOpen } from "lucide-react";
import { apiFetch } from "@/lib/api-fetch";
export default function SectionContent() {
  const params = useParams();
  const router = useRouter();
  const { id, type } = params;
  const [content, setContent] = useState([]);

  useEffect(() => {
    console.log(id + " " + type);
    apiFetch(`api/section/${id}/${type}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContent(data);
      });
  }, []);

  const handleEdit = (updatedItem) => {
    setContent(
      content.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    let url = "";
    switch (type) {
      case "flashcards":
        url = "admin/update-flashcard";
        break;
      case "questions":
        url = "admin/update-question";
        break;
      case "words":
        url = "admin/update-word";
        break;
    }
    console.log(url + `/${updatedItem.id}` + JSON.stringify(updatedItem));
    apiFetch(url + `/${updatedItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
  };
  const handleAdd = (addedItem) => {
    let url = "";
    switch (type) {
      case "flashcards":
        url = "admin/add-flashcard";
        break;
      case "questions":
        url = "admin/add-question";
        break;
      case "words":
        url = "admin/add-word";
        break;
    }
    console.log(addedItem);
    apiFetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...addedItem, sectionId: id }),
    });
    setContent([...content, addedItem]);
  };

  const handleDelete = (id) => {
    setContent(content.filter((data) => data.id !== id));
    let url = "";
    switch (type) {
      case "flashcards":
        url = "admin/delete-flashcard";
        break;
      case "questions":
        url = "admin/delete-question";
        break;
      case "words":
        url = "admin/delete-word";
        break;
    }
    apiFetch(url + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getIcon = () => {
    switch (type) {
      case "flashcards":
        return <Book className="mr-2 h-5 w-5 text-indigo-400" />;
      case "questions":
        return <HelpCircle className="mr-2 h-5 w-5 text-green-400" />;
      case "words":
        return <BookOpen className="mr-2 h-5 w-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-300 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
        {getIcon()}
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h1>
      {type === "flashcards" && (
        <FlashCardGrid
          sectionId={id}
          flashcards={content}
          onEdit={handleEdit}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}
      {type === "questions" && (
        <QuestionsGrid
          sectionId={id}
          questions={content}
          onEdit={handleEdit}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}
      {type === "words" && (
        <WordsGrid
          sectionId={id}
          words={content}
          onEdit={handleEdit}
          onAdd={handleAdd}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
