"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Plus, Image, Grip, Trash, Clipboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog";
import { updateMultipleFlashcard } from "@/lib/api";

export default function FlashcardEditor({
  params,
  flashcards: initialFlashcards = [],
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [flashcards, setFlashcards] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState(null);
  const [focusedCardId, setFocusedCardId] = useState(null);

  useEffect(() => {
    if (initialFlashcards.length > 0) {
      setFlashcards(initialFlashcards);
    }
    setIsLoading(false);
  }, [initialFlashcards]);

  // Add global paste event listener
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      if (!focusedCardId) return;

      handlePasteImage(focusedCardId, e);
    };

    window.addEventListener("paste", handleGlobalPaste);

    return () => {
      window.removeEventListener("paste", handleGlobalPaste);
    };
  }, [focusedCardId]); // Only depend on focusedCardId

  if (!params || isLoading) return <p>Loading...</p>;

  const { courseId, lessonId, sectionId } = params;

  const addFlashcard = () => {
    const newFlashcard = {
      tempId: Date.now(),
      sectionId: sectionId,
      word: "",
      meaning: "",
      example: "",
      imgUrl: "",
      imageFile: null,
      imagePreview: null,
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const updateFlashcard = (id, field, value) => {
    setFlashcards(
      flashcards.map((card) =>
        card.id === id || card.tempId === id
          ? { ...card, [field]: value }
          : card
      )
    );
  };

  const handleImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);

    setFlashcards(
      flashcards.map((card) =>
        card.id === id || card.tempId === id
          ? {
              ...card,
              imageFile: file,
              imagePreview: previewUrl,
            }
          : card
      )
    );
  };

  const handlePasteImage = (id, e) => {
    const clipboardItems = e.clipboardData.items;
    const items = [...clipboardItems].filter(
      (item) => item.type.indexOf("image") !== -1
    );

    if (items.length === 0) return;

    const item = items[0];
    const blob = item.getAsFile();

    if (!blob) return;

    // Create a preview URL for the pasted image
    const previewUrl = URL.createObjectURL(blob);

    // Generate a filename for the pasted image
    const timestamp = new Date().getTime();
    const filename = `pasted-image-${timestamp}.png`;

    // Create a File object from the blob
    const file = new File([blob], filename, { type: blob.type });

    setFlashcards(
      flashcards.map((card) =>
        card.id === id || card.tempId === id
          ? {
              ...card,
              imageFile: file,
              imagePreview: previewUrl,
            }
          : card
      )
    );
  };

  const openDeleteDialog = (id) => {
    setFlashcardToDelete(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setFlashcardToDelete(null);
  };

  const confirmDelete = () => {
    if (flashcardToDelete) {
      setFlashcards(
        flashcards.filter(
          (card) =>
            card.id !== flashcardToDelete && card.tempId !== flashcardToDelete
        )
      );
      closeDeleteDialog();
    }
  };

  const saveFlashcards = async () => {
    try {
      // Create FormData for multipart upload
      const formData = new FormData();

      // Prepare flashcards data without temporary fields
      const flashcardsData = flashcards.map((card, index) => {
        const { tempId, imageFile, imagePreview, ...flashcardData } = card;

        // If there's an image file, add it to FormData with a unique field name
        if (imageFile) {
          formData.append(`flashcard_image_${index}`, imageFile);
          // Set a reference to the image in the flashcard data
          flashcardData.imageReference = `flashcard_image_${index}`;
        }

        return flashcardData;
      });

      // Add the JSON data of all flashcards
      formData.append("flashcards", JSON.stringify(flashcardsData));

      updateMultipleFlashcard(formData);
      flashcards.forEach((card) => {
        if (card.imagePreview) {
          URL.revokeObjectURL(card.imagePreview);
        }
      });
    } catch (error) {
      console.error("Error saving flashcards:", error);
      // You can add error handling here
    }
  };

  const removeImage = (id) => {
    setFlashcards(
      flashcards.map((card) => {
        if (card.id === id || card.tempId === id) {
          // Clean up the object URL to prevent memory leaks
          if (card.imagePreview) {
            URL.revokeObjectURL(card.imagePreview);
          }

          return {
            ...card,
            imageFile: null,
            imagePreview: null,
            imgUrl: null,
          };
        }
        return card;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Flashcards</h2>
        <Button size="sm" onClick={addFlashcard}>
          <Plus className="mr-2 h-4 w-4" />
          Add Flashcard
        </Button>
      </div>
      {flashcards.map((card, index) => (
        <Card
          key={card.id || card.tempId}
          className={`relative ${
            focusedCardId === (card.id || card.tempId)
              ? "ring-2 ring-primary"
              : ""
          }`}
        >
          <div className="absolute left-0 top-0 bottom-0 flex items-center px-2 cursor-move">
            <Grip className="h-5 w-5 text-muted-foreground" />
          </div>
          <CardHeader className="pb-2 pl-10">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Flashcard {index + 1}</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => openDeleteDialog(card.id || card.tempId)}
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete flashcard</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pl-10">
            {["word", "meaning", "example"].map((field) => (
              <div key={field} className="grid gap-2">
                <label className="text-sm font-medium">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <Textarea
                  value={card[field] || ""}
                  onChange={(e) =>
                    updateFlashcard(
                      card.id || card.tempId,
                      field,
                      e.target.value
                    )
                  }
                  placeholder={`Enter the ${field}`}
                />
              </div>
            ))}

            {/* Image upload section with paste support */}
            <div
              className="grid gap-2"
              onFocus={() => setFocusedCardId(card.id || card.tempId)}
              tabIndex={0} // Make the div focusable
            >
              <label className="text-sm font-medium">Image</label>
              <div className="space-y-2">
                {card.imagePreview || card.imgUrl ? (
                  <div className="relative w-full h-40 bg-muted rounded-md overflow-hidden">
                    <img
                      src={
                        card.imagePreview || card.imgUrl || "/placeholder.svg"
                      }
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-md p-8 text-center cursor-pointer flex flex-col items-center justify-center"
                    onClick={() =>
                      document
                        .getElementById(
                          `image-upload-${card.id || card.tempId}`
                        )
                        .click()
                    }
                    onFocus={() => setFocusedCardId(card.id || card.tempId)}
                    tabIndex={0}
                  >
                    <Clipboard className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload or paste an image here
                    </p>
                  </div>
                )}
                <div
                  className="flex items-center gap-2"
                  onFocus={() => setFocusedCardId(card.id || card.tempId)}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document
                        .getElementById(
                          `image-upload-${card.id || card.tempId}`
                        )
                        .click()
                    }
                    onFocus={() => setFocusedCardId(card.id || card.tempId)}
                  >
                    <Image className="mr-2 h-4 w-4" />
                    {card.imagePreview || card.imgUrl
                      ? "Change Image"
                      : "Upload Image"}
                  </Button>
                  {(card.imagePreview || card.imgUrl) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeImage(card.id || card.tempId)}
                      onFocus={() => setFocusedCardId(card.id || card.tempId)}
                    >
                      Remove
                    </Button>
                  )}
                  <input
                    id={`image-upload-${card.id || card.tempId}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(card.id || card.tempId, e)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      <CardFooter className="border-t bg-muted/50 flex justify-end gap-2 pl-10">
        <Button variant="outline" size="sm">
          Preview
        </Button>
        <Button size="sm" onClick={saveFlashcards}>
          Save
        </Button>
      </CardFooter>

      <DeleteConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        title="Delete Flashcard"
        description="Are you sure you want to delete this flashcard? This action cannot be undone."
      />
    </div>
  );
}
