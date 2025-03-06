"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Video, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

export default function VideoUploader({
  video = null,
  onSuccess = () => {},
  sectionId = null,
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(video);
  const { toast } = useToast();

  const uploadVideo = async (file) => {
    try {
      setIsUploading(true);

      // This is a placeholder for the actual API call
      // You will replace this with your actual API code
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(
        `http://localhost:8080/files/upload/${sectionId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the video state with the new video URL
      // setCurrentVideo(data.videoUrl);
      setCurrentVideo(URL.createObjectURL(file)); // Temporary local URL for demo

      toast({
        title: "Video uploaded successfully",
        description: "Your video has been uploaded and is now available.",
        variant: "success",
      });

      onSuccess(currentVideo);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          "There was an error uploading your video. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading video:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteVideo = async () => {
    try {
      setIsDeleting(true);

      // This is a placeholder for the actual API call
      // You will replace this with your actual API code
      // const response = await fetch(`/api/videos/${videoId}`, {
      //   method: 'DELETE'
      // });

      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCurrentVideo(null);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Video deleted",
        description: "Your video has been removed successfully.",
        variant: "success",
      });

      onSuccess(null);
    } catch (error) {
      toast({
        title: "Deletion failed",
        description:
          "There was an error deleting your video. Please try again.",
        variant: "destructive",
      });
      console.error("Error deleting video:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadVideo(file);
    }
  };

  const handleReplaceClick = () => {
    document.getElementById("video-upload").click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Video Content</CardTitle>
          <CardDescription>
            Upload or embed a video for this lesson
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hidden file input for video upload */}
          <Input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />

          {!currentVideo ? (
            <div className="border-2 border-dashed rounded-lg p-12 text-center">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Video className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Upload a video</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop a video file or click to browse
                </p>
                <Button
                  className="mt-4"
                  onClick={() =>
                    document.getElementById("video-upload").click()
                  }
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Video
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <video className="w-full h-full rounded-lg" controls>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleReplaceClick}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Replacing...
                    </>
                  ) : (
                    "Replace Video"
                  )}
                </Button>
                <Dialog
                  open={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                      {isDeleting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Removing...
                        </>
                      ) : (
                        "Remove Video"
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Video</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this video? This action
                        cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline" disabled={isDeleting}>
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        variant="destructive"
                        onClick={deleteVideo}
                        disabled={isDeleting}
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
