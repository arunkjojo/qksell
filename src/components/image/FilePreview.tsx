import React from 'react';
import { PostAssets } from '@common/types';
import { Image, File, Trash2 } from 'lucide-react';
import Button from '@ui/Button';

interface FilePreviewProps {
  file: PostAssets & { file?: File };
  className?: string;
  onDelete?: (file: PostAssets) => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ file, className, onDelete }) => {
  
  if (!file) {
    return null;
  }

  // If we have a preview URL or final URL, show image
  if (file?.FileDetails?.url || file?.AssetUrl) {
    return (
      <div className={`relative overflow-hidden rounded-lg shadow-md bg-gray-100 group ${className}`}>
        <img
          src={file?.FileDetails?.url || file?.AssetUrl || ''}
          alt={file?.FileDetails?.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200" />

        {onDelete && file?.FileDetails?.reference && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => onDelete(file)}
            aria-label="Delete image"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    );
  }

  // Otherwise show placeholder
  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
      {file?.FileDetails?.type.startsWith('image/') ? (
        <Image className="w-8 h-8 text-gray-400" />
      ) : (
        <File className="w-8 h-8 text-gray-400" />
      )}
    </div>
  );
};

export default FilePreview;