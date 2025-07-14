import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onUpload: (url: string) => void;
  accept?: string;
  maxSize?: number;
  currentFile?: string;
}

export default function FileUpload({ 
  onUpload, 
  accept = "*", 
  maxSize = 10 * 1024 * 1024, // 10MB default
  currentFile 
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / (1024 * 1024)}MB`);
      return;
    }

    setUploading(true);
    
    try {
      // In a real app, you would upload to a file storage service
      // For now, we'll create a mock URL
      const mockUrl = URL.createObjectURL(file);
      onUpload(mockUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? "border-primary-500 bg-primary-50" 
            : "border-gray-300 hover:border-primary-500"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">
          Drag and drop your file here, or{' '}
          <label className="text-primary-900 font-medium cursor-pointer">
            browse
            <input
              type="file"
              className="hidden"
              accept={accept}
              onChange={handleInputChange}
              disabled={uploading}
            />
          </label>
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Max file size: {maxSize / (1024 * 1024)}MB
        </p>
        {uploading && (
          <div className="mt-4 text-sm text-gray-600">
            Uploading...
          </div>
        )}
      </div>
      
      {currentFile && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-700 truncate">{currentFile}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpload("")}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
