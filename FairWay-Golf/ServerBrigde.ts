import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUpload = (sequence: number, run_id: string, imageUri: string, serverUrl: string) => {
  const [status, setStatus] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imageUri || !serverUrl) return;

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);
      formData.append('run_id',run_id);
      formData.append('sequence', sequence.toString());


      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(serverUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setStatus(response.data.status === 'ok');
      } catch (err) {
        setError(err);
        setStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    uploadImage();
  }, [sequence, imageUri]);

  return { status, error, isLoading };
};

export const usePrediction = (sequence: number, run_id: string, serverUrl: string) => {
  const [status, setStatus] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!run_id || !serverUrl) return;

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('sequence', sequence.toString());
      formData.append('run_id', run_id);

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(serverUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setStatus(response.data.status === 'ok');
      } catch (err) {
        setError(err);
        setStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    uploadImage();
  }, [sequence]);

  return { status, error, isLoading };
};
