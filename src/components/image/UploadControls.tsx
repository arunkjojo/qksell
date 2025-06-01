import React from 'react';
import Button from '@ui/Button';
import { Upload, Check, Trash2 } from 'lucide-react';
import { FileMetadata } from '@common/types';

interface UploadControlsProps {
  files: FileMetadata[];
  isUploading: boolean;
  onUpload: () => void;
  onClearCompleted: () => void;
}

const UploadControls: React.FC<UploadControlsProps> = ({
  files,
  isUploading,
  onUpload,
  onClearCompleted
}) => {
  // Count of pending files
  const pendingFiles = files.filter(file => file.status === 'pending').length;
  
  // Count of completed files
  const completedFiles = files.filter(
    file => file.status === 'success' || file.status === 'error'
  ).length;
  
  // If no files, don't show controls
  if (files.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {pendingFiles > 0 && (
        <Button
          onClick={onUpload}
          disabled={isUploading || pendingFiles === 0}
          isLoading={isUploading}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload {pendingFiles} {pendingFiles === 1 ? 'File' : 'Files'}
        </Button>
      )}
      
      {completedFiles > 0 && (
        <Button
          variant="outline"
          onClick={onClearCompleted}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Completed
        </Button>
      )}
      
      {files.length > 0 && !isUploading && files.every(file => file.status === 'success') && (
        <div className="ml-3 text-sm text-green-600 flex items-center">
          <Check className="w-4 h-4 mr-1" />
          All files uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default UploadControls;