import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../lib/firebase';
import { UploadResponse } from '@common/types';
import { v4 as uuidv4 } from 'uuid';
import Resizer from 'react-image-file-resizer';

const resizeImage = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1920, // max width
      1080, // max height
      'JPEG',
      80, // quality
      0, // rotation
      (uri) => {
        // Convert base64 back to File object
        const resizedFile = new File(
          [dataURItoBlob(uri as string)],
          file.name,
          { type: 'image/jpeg' }
        );
        resolve(resizedFile);
      },
      'base64'
    );
  });
};

const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
};

export const uploadFileToFirebase = async (
  file: File, 
  onProgress: (progress: number) => void,
  folder = 'posts'
): Promise<UploadResponse> => {
  try {
    // Resize image before upload if it's an image
    const processedFile = file.type.startsWith('image/') 
      ? await resizeImage(file)
      : file;

    // Create a unique file name
    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, `${folder}/${uniqueFileName}`);
    
    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, processedFile);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(progress);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject({ success: false, error: error.message });
        },
        async () => {
          try {
            const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const reference = uploadTask.snapshot.ref.fullPath;
            
            resolve({
              success: true,
              fileUrl: downloadUrl,
              reference: reference
            });
          } catch (error) {
            console.error('Failed to get download URL:', error);
            reject({ 
              success: false, 
              error: 'Failed to get download URL' 
            });
          }
        }
      );
    });
  } catch (error) {
    console.error('Upload initialization failed:', error);
    throw { success: false, error: 'Upload initialization failed' };
  }
};

export const deleteFileFromFirebase = async (reference: string): Promise<boolean> => {
  try {
    const fileRef = ref(storage, reference);
    await deleteObject(fileRef);
    return true;
  } catch (error) {
    console.error('Error deleting file from Firebase:', error);
    return false;
  }
};