"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { File, Edit, Trash2, X, Plus, ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ContentGrid({
  sectionId,
  contents,
  onEdit,
  onAdd,
  onDelete,
}) {
  const [newContent, setNewContent] = useState({
    title: "",
    file: null,
    preview: null,
  });
  const [editingContent, setEditingContent] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    // Cleanup preview URLs when component unmounts
    return () => {
      if (newContent.preview) URL.revokeObjectURL(newContent.preview);
      if (editingContent?.preview) URL.revokeObjectURL(editingContent.preview);
    };
  }, []);

  const handleFileChange = (event, isEditing = false) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create preview URL for the file
    const previewUrl = URL.createObjectURL(file);

    if (isEditing) {
      // Cleanup previous preview URL if it exists
      if (editingContent?.preview) URL.revokeObjectURL(editingContent.preview);
      setEditingContent({
        ...editingContent,
        file,
        preview: previewUrl,
        fileType: file.type.startsWith("image/") ? "image" : "video",
      });
    } else {
      // Cleanup previous preview URL if it exists
      if (newContent.preview) URL.revokeObjectURL(newContent.preview);
      setNewContent({
        ...newContent,
        file,
        preview: previewUrl,
        fileType: file.type.startsWith("image/") ? "image" : "video",
      });
    }
  };

  const handleSubmit = async (event, isEditing = false) => {
    event.preventDefault();
    if (isEditing) {
      await onEdit(editingContent);
      if (editingContent.preview) URL.revokeObjectURL(editingContent.preview);
      setEditingContent(null);
      setIsEditOpen(false);
    } else {
      await onAdd(newContent);
      if (newContent.preview) URL.revokeObjectURL(newContent.preview);
      setNewContent({ title: "", file: null, preview: null });
      setIsAddOpen(false);
    }
  };

  const FilePreview = ({ file, preview, fileType }) => {
    if (!file && !preview) return null;

    return (
      <div className="mt-4 rounded-lg overflow-hidden bg-gray-800 w-full max-w-xs mx-auto">
        {fileType === "image" ? (
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-32 object-cover"
          />
        ) : (
          <video src={preview} className="w-full h-32 object-cover" controls />
        )}
      </div>
    );
  };

  const UploadArea = ({ onChange, preview, fileType, id }) => (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium text-gray-200">
        File
      </Label>
      <div className="flex flex-col items-center gap-4">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-700 bg-gray-800 hover:bg-gray-700">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <File className="w-8 h-8 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">Images or videos up to 10MB</p>
          </div>
          <Input
            id={id}
            type="file"
            className="hidden"
            onChange={onChange}
            accept="image/*,video/*"
          />
        </label>
        {preview && <FilePreview preview={preview} fileType={fileType} />}
      </div>
    </div>
  );

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "image":
        return <ImageIcon className="w-6 h-6" />;
      case "video":
        return <Video className="w-6 h-6" />;
      default:
        return <File className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Content</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
            <DialogHeader>
              <div className="flex justify-between items-center">
                <DialogTitle className="text-xl font-semibold">
                  Add New Content
                </DialogTitle>
                <DialogClose className="absolute right-4 top-4" />
              </div>
            </DialogHeader>
            <form
              onSubmit={(e) => handleSubmit(e, false)}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="new-title"
                  className="text-sm font-medium text-gray-200"
                >
                  Title
                </Label>
                <Input
                  id="new-title"
                  value={newContent.title}
                  onChange={(e) =>
                    setNewContent({ ...newContent, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Enter content title"
                  required
                />
              </div>
              <UploadArea
                id="new-file"
                onChange={(e) => handleFileChange(e, false)}
                preview={newContent.preview}
                fileType={newContent.fileType}
              />
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Add Content
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content, id) => (
          <Card
            key={id}
            className="group bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="relative">
                {content?.videoUrl}
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8 bg-gray-900/80 hover:bg-gray-800"
                        onClick={() => setEditingContent(content)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
                      <DialogHeader>
                        <div className="flex justify-between items-center">
                          <DialogTitle className="text-xl font-semibold">
                            Edit Content
                          </DialogTitle>
                          <DialogClose className="absolute right-4 top-4" />
                        </div>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => handleSubmit(e, true)}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="edit-title"
                            className="text-sm font-medium text-gray-200"
                          >
                            Title
                          </Label>
                          <Input
                            id="edit-title"
                            value={editingContent?.title || ""}
                            onChange={(e) =>
                              setEditingContent({
                                ...editingContent,
                                title: e.target.value,
                              })
                            }
                            className="bg-gray-800 border-gray-700 text-white"
                            required
                          />
                        </div>
                        <UploadArea
                          id="edit-file"
                          onChange={(e) => handleFileChange(e, true)}
                          preview={editingContent?.preview}
                          fileType={editingContent?.fileType}
                        />
                        <Button
                          type="submit"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                        >
                          Save Changes
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 bg-red-600/80 hover:bg-red-700"
                    onClick={() => onDelete(content.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getFileIcon(content?.fileType)}
                  <h3 className="font-semibold text-lg text-white">
                    Video Url: {content}
                  </h3>
                </div>
                <p className="text-sm text-gray-400">{content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
