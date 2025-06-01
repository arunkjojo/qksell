import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, AlertCircle } from 'lucide-react';
import { cn } from '@utils/cn';

interface UploadDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFilesAdded,
  maxSize = 1024 * 1024 * 1024, // Default to 1GB
  disabled = false,
  className
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      onFilesAdded(acceptedFiles);
    }
  }, [onFilesAdded]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections
  } = useDropzone({
    onDrop,
    disabled,
    maxSize,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/tiff': [],
      'image/webp': [],
      'image/heif': [],
      'image/heic': []
    }
  });

  // Show error message if files are rejected
  const errorMessage = fileRejections.length > 0 
    ? fileRejections[0].errors[0].message 
    : '';

  return (
    <div className={cn("w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out cursor-pointer",
          "flex flex-col items-center justify-center text-center",
          {
            "border-gray-300 bg-gray-50": !isDragActive,
            "border-blue-400 bg-blue-50": isDragActive && !isDragReject,
            "border-red-400 bg-red-50": isDragReject,
            "opacity-50 cursor-not-allowed": disabled
          }
        )}
      >
        <input {...getInputProps()} />
        
        <div className="mb-4">
          {isDragReject ? (
            <AlertCircle className="w-12 h-12 text-red-500" />
          ) : (
            <Upload className="w-12 h-12 text-blue-500" />
          )}
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">
            {isDragActive
              ? isDragReject
                ? "Unsupported file type"
                : "Drop the files here..."
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-xs text-gray-500">
            Supports image files (JPEG, JPG, PNG, TIFF, HEIF)
          </p>
        </div>
        
        {errorMessage && (
          <p className="mt-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadDropzone;