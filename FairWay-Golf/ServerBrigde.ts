import axios from 'axios';
import { Platform } from 'react-native';

// imageUri: local URI of the image (e.g., from ImagePicker)
// serverUrl: your Flask or Node server endpoint

export const uploadImage = async (imageUri: string, serverUrl: string) => {
  const formData = new FormData();

  formData.append('image', {
    uri: imageUri,
    name: 'photo.jpg', // or extract from imageUri
    type: 'image/jpeg', // adjust if needed
  } as any); // cast needed for React Native

  try {
    const response = await axios.post(serverUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Upload successful:', response.data);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

