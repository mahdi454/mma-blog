"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { setUsernameDb } from "./action";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SetupUsernamePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/admin";
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (1 MB limit)
      if (file.size > 1 * 1024 * 1024) {
        setError("File size exceeds the allowed limit (1 MB).");
        setProfileImage(null); // Clear the selected file
        setPreview(null); // Clear the preview
        setFileName(null); // Clear the file name
      } else {
        setError(null); // Clear any previous error
        setFileName(file.name);
        setProfileImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any previous error

    // Validate file size again before submitting
    if (profileImage && profileImage.size > 1 * 1024 * 1024) {
      setError("File size exceeds the allowed limit (1 MB).");
      return;
    }

    try {
      // Call the Server Action
      const { data, error: actionError } = await setUsernameDb(username, profileImage);

      if (actionError) {
        // Handle the error returned by the Server Action
        setError(actionError);
      } else {
        // Handle success
        router.push(redirectPath); // Redirect to the intended location
      }
    } catch (err) {
      // Handle unexpected errors
      setError(err instanceof Error ? err.message : "Failed to set username.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white px-2 sm:px-0 pb-16">
      <h1 className="text-2xl font-bold mb-6">Set Your Username</h1>
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full max-w-sm rounded-lg shadow-md">
            <label htmlFor="username" className="block text-sm font-medium text-gray-50 mb-2">
              Username
            </label>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="px-4 h-12 bg-gray-900 rounded-lg border-gray-700 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="w-full max-w-sm rounded-lg shadow-md">
            <label htmlFor="picture" className="block text-sm font-medium text-gray-50 mb-2">
              Upload Picture
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                {preview ? (
                  <img
                    src={preview || "/placeholder.svg"}
                    alt="Preview"
                    className="mx-auto h-40 w-48 object-cover rounded-md"
                  />
                ) : (
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="flex justify-center items-center gap-2 text-sm text-gray-50">
                  <label
                    htmlFor="file-upload"
                    className="bg-blue-600 px-2 py-1 rounded-md  hover:cursor-pointer hover:bg-blue-700"
                  >
                    Choose file
                    <Input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p>or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">{fileName ? fileName : "PNG, JPG, GIF up to 1MB"}</p>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            
            </div>
            
          </div>
          <Button
            type="submit"
            disabled={error !== null}
            className="w-full h-12 font-medium text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}