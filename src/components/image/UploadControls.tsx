import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@ui/Button';
import { Upload, Trash2, Goal } from 'lucide-react';
import { FileMetadata } from '@common/types';
import { base64Decode } from '@utils/base64Decode';

interface UploadControlsProps {
  files: FileMetadata[];
  isUploading: boolean;
  onUpload: () => void;
  onClearCompleted: () => void;
  successfulUploads: number;
}

const UploadControls: React.FC<UploadControlsProps> = ({
  files,
  isUploading,
  onUpload,
  onClearCompleted,
  successfulUploads
}) => {
  const navigate = useNavigate();
  const params = useParams();
  // Count of pending files
  const pendingFiles = files.filter(file => file.status === 'pending').length;
  
  // Count of completed files
  const completedFiles = files.filter(
    file => file.status === 'success' || file.status === 'error'
  ).length;
  
  const postImageContinue = () => {
    const id = base64Decode(params?.id || '');
    navigate(`/pm/${id}`);
  }
  
  // If no files, don't show controls
  if (files.length === 0 && successfulUploads === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-[15px] left-1/2 transform -translate-x-1/2 z-8 block list-none m-0 p-0 text-center transition-[bottom] duration-500 [transition-timing-function:cubic-bezier(0,1,.5,1)] w-fit">
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
      
      {(completedFiles > 0 || successfulUploads > 0) && (
        <div className="text-sm flex justify-between gap-8 w-full text-gray-500 mt-2">
          <Button
            variant="outline"
            onClick={onClearCompleted}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Button
            variant="secondary"
            onClick={postImageContinue}
          >
            <Goal className="w-4 h-4 mr-2" />
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadControls;