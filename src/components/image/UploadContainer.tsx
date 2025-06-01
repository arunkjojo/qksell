import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFileUpload } from '@hooks/useFileUpload';
import { FileMetadata, PostAssets } from '@common/types';
import { deletePostAsset, fetchPostImageById } from '@common/api';
import { deleteFileFromFirebase } from '@services/uploadService';
import { base64Decode } from '@utils/base64Decode';
import UploadDropzone from './UploadDropzone';
import FileList from './FileList';
import UploadControls from './UploadControls';
import FilePreview from './FilePreview';
import Button from '@ui/Button';
import { Goal } from 'lucide-react';

const UploadContainer: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [images, setImages] = useState<PostAssets[]>([]);

  const {
    files,
    isUploading,
    addFiles,
    uploadFiles,
    uploadFile,
    removeFile,
    clearCompleted,
    isUpdatedToDb
  } = useFileUpload();

  // Handle adding files from dropzone
  const handleFilesAdded = useCallback((newFiles: File[]) => {
    addFiles(newFiles);
  }, [addFiles]);

  // Handle retry for failed uploads
  const handleRetry = useCallback((id: string) => {
    const fileToRetry = files.find(f => f.id === id) as (FileMetadata & { file: File }) | undefined;
    
    if (fileToRetry && fileToRetry.file) {
      uploadFile(fileToRetry);
    }
  }, [files, uploadFile]);

  const handleDelete = useCallback(async (file: PostAssets) => {
    if (file?.FileDetails?.reference) {
      const firebaseDeleted = await deleteFileFromFirebase(file?.FileDetails?.reference);
      if (!firebaseDeleted) {
        console.error('Failed to delete file from Firebase');
        return;
      }
    }
    const assetId = file?.Id;
    const dbDeleted = await deletePostAsset(base64Decode(params?.id ?? ''), assetId);
    if (!dbDeleted) {
      console.error('Failed to delete file from database');
      return;
    }

    // Remove from local state
    removeFile(file?.FileDetails?.id);
    setImages(prev => prev?.filter((img: PostAssets) => img?.Id !== assetId));
  }, [params?.id, removeFile]);

  useEffect(() => {
    const loadPostImages = async () => {
      if (params?.id) {
        const response = await fetchPostImageById(base64Decode(params?.id ?? ''));
        // console.log('==========res', Array.isArray(response) ? response : []);
        setImages(() => {
          return Array.isArray(response)
            ? response.map(item => ({
              ...item,
              FileDetails: item?.FileDetails ? JSON.parse(item?.FileDetails) : null
            }))
            : [];
        });
      }
    };
    loadPostImages();
  }, [params?.id, isUpdatedToDb]);

  const postImageContinue = () => {
    const id = base64Decode(params?.id || '');
    navigate(`/pm/${id}`);
  }

  const successfulUploads = images // ?.filter(file => file?.FileDetails?.status === 'success');
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upload Images
        </h2>
        
        <p className="text-gray-600 mb-6">
          Drag and drop your images for automatic upload and compression. 
          All sizes are supported and will be optimized.
        </p>
        
        <UploadDropzone 
          onFilesAdded={handleFilesAdded} 
          disabled={isUploading}
        />
        
        <FileList 
          files={files} 
          onRemove={removeFile} 
          onRetry={handleRetry}
        />

        {successfulUploads.length > 0 && (
          <div className="mt-8 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {successfulUploads.map((file) => (
                <FilePreview
                  key={file?.Id}
                  file={file}
                  className="aspect-square w-full"
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
        {successfulUploads.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={postImageContinue}
            >
              <Goal className="w-4 h-4 mr-2" />
              Continue
            </Button>
          </div>
        )}
        
        <UploadControls 
          files={files}
          isUploading={isUploading}
          onUpload={uploadFiles}
          onClearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
};

export default UploadContainer;