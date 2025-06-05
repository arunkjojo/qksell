import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Clock, Upload as UploadIcon } from 'lucide-react';
import { FileMetadata } from '@common/types';
import { formatFileSize, truncateFilename, formatDate } from '@utils/formatters';
import ProgressBar from '@ui/ProgressBar';
import Button from '@ui/Button';

interface FileListProps {
  files: FileMetadata[];
  onRemove: (id: string) => void;
  onRetry?: (id: string) => void;
}

// Extend FileMetadata to allow local file property for preview
interface FileWithLocal extends FileMetadata {
  file?: File;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove, onRetry }) => {
  // Clean up object URLs on unmount or files change
  useEffect(() => {
    const objectUrls: string[] = [];
    (files as FileWithLocal[]).forEach((file) => {
      if (!file.url && file.file && file.type && file.type.startsWith('image')) {
        const url = URL.createObjectURL(file.file);
        objectUrls.push(url);
      }
    });
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  if (files.length === 0) {
    return null;
  }

  // Get status icon based on file status
  const getStatusIcon = (status: FileMetadata['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'uploading':
        return <UploadIcon className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get progress bar color based on file status
  const getProgressColor = (status: FileMetadata['status']) => {
    switch (status) {
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'uploading':
        return 'blue';
      default:
        return 'blue';
    }
  };
  console.log('===========files', files);

  // Helper to get preview URL for image files (local or remote)
  const getImagePreviewUrl = (file: FileWithLocal) => {
    if (file.url) return file.url;
    if (file.file && file.type && file.type.startsWith('image')) {
      return URL.createObjectURL(file.file);
    }
    return null;
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Files</h3>
      <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
        {(files as FileWithLocal[]).map((file) => {
          const previewUrl = getImagePreviewUrl(file);
          return (
            <li key={file.id} className="p-4 bg-white hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  {/* Image preview for image files (local or remote) */}
                  {file.type && file.type.startsWith('image') && previewUrl && (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="w-12 h-12 object-cover rounded mr-3 border border-gray-200"
                      loading="lazy"
                    />
                  )}
                  <div className="mr-3 flex-shrink-0">
                    {getStatusIcon(file.status)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {truncateFilename(file.name, 30)}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-xs text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    
                    <div className="mt-1">
                      <ProgressBar 
                        progress={file.progress} 
                        color={getProgressColor(file.status)} 
                        height="sm"
                      />
                    </div>
                    
                    <div className="mt-1 flex items-center text-xs text-gray-500">
                      {file.status === 'success' && file.uploadedAt && (
                        <span>Uploaded {formatDate(file.uploadedAt)}</span>
                      )}
                      {file.status === 'error' && (
                        <span className="text-red-600">{file.error || 'Upload failed'}</span>
                      )}
                      {file.status === 'uploading' && (
                        <span>Uploading... {file.progress}%</span>
                      )}
                      {file.status === 'pending' && (
                        <span>Ready to upload</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex-shrink-0 flex items-center space-x-2">
                  {file.status === 'error' && onRetry && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onRetry(file.id)}
                      aria-label="Retry upload"
                    >
                      Retry
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(file.id)}
                    aria-label="Remove file"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileList;