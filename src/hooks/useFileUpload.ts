import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { FileMetadata } from '@common/types';
import { uploadPostImageReference } from '@api/index';
import { uploadFileToFirebase } from '@services/uploadService';
import { base64Decode } from '@utils/base64Decode';

export const useFileUpload = () => {
  const params = useParams()
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdatedToDb, setIsUpdatedToDb] = useState(false);
  const uploadQueue = useRef<string[]>([]);
  const isProcessing = useRef(false);

  const updateFile = useCallback((id: string, data: Partial<FileMetadata>) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, ...data } : file
      )
    );
  }, []);

  const uploadFile = useCallback(async (fileData: FileMetadata & { file: File }) => {
    try {
      updateFile(fileData.id, { status: 'uploading', progress: 0 });
      
      const result = await uploadFileToFirebase(
        fileData.file,
        (progress) => {
          updateFile(fileData.id, { progress });
        }
      );
      
      const uploadedAt = new Date();
      updateFile(fileData.id, { 
        status: 'success', 
        progress: 100,
        url: result.fileUrl,
        reference: result.reference,
        uploadedAt
      });

      const fileDetails = {
        id: fileData.id,
        status: 'success',
        progress: 100,
        url: result.fileUrl,
        reference: result.reference,
        uploadedAt,
        name: fileData.file.name,
        size: fileData.file.size,
        type: fileData.file.type
      }

      const updates = await uploadPostImageReference(
        base64Decode(params?.id ?? ''),
        result.fileUrl,
        JSON.stringify(fileDetails)
      );
      setIsUpdatedToDb(updates?.success || false);
      return { success: updates?.success, fileId: fileData.id };
    } catch (error) {
      updateFile(fileData.id, { 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Upload failed'
      });
      
      return { success: false, fileId: fileData.id, error };
    }
  }, [params?.id, updateFile]);

  const processQueue = useCallback(async () => {
    if (isProcessing.current || uploadQueue.current.length === 0) return;

    isProcessing.current = true;
    setIsUploading(true);

    while (uploadQueue.current.length > 0) {
      const fileId = uploadQueue.current[0];
      const fileData = files.find(f => f.id === fileId) as (FileMetadata & { file: File }) | undefined;

      if (fileData?.file) {
        try {
          await uploadFile(fileData);
        } catch (error) {
          console.error(`Failed to upload file ${fileData.name}:`, error);
        }
      }

      uploadQueue.current.shift();
    }

    isProcessing.current = false;
    setIsUploading(false);
  }, [files, uploadFile]);

  const addFiles = useCallback((newFiles: File[]) => {
    const fileMetadata: FileMetadata[] = newFiles.map(file => ({
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
      file
    } as FileMetadata & { file: File }));

    setFiles(prev => [...prev, ...fileMetadata]);

    // Add new files to upload queue
    const newIds = fileMetadata.map(f => f.id);
    uploadQueue.current.push(...newIds);

    // Start processing queue if not already processing
    processQueue();

    return newIds;
  }, [processQueue]);

  const uploadFiles = useCallback(() => {
    const pendingFiles = files.filter(
      file => file.status === 'pending'
    );
    
    if (pendingFiles.length === 0) return;
    
    // Add pending files to queue
    const pendingIds = pendingFiles.map(f => f.id);
    uploadQueue.current.push(...pendingIds);
    
    // Start processing queue
    processQueue();
  }, [files, processQueue]);

  const clearCompleted = useCallback(() => {
    setFiles(prev => 
      prev.filter(file => 
        !['success', 'error'].includes(file.status)
      )
    );
  }, []);

  const removeFile = useCallback(async (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    uploadQueue.current = uploadQueue.current.filter(queueId => queueId !== id);
  }, []);

  return {
    files,
    isUploading,
    addFiles,
    uploadFile,
    uploadFiles,
    updateFile,
    clearCompleted,
    removeFile,
    isUpdatedToDb
  };
};