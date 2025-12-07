import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUpload = async (frame_name: string, record_id: string, frame_data: string, serverUrl: string) => {
  const [status, setStatus] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!frame_data || !serverUrl) return;

    const uploadImage = async () => {
      const formData = new FormData();
      formData.append('frame', frame_data);
      formData.append('record_id', record_id);
      formData.append('seq_num', frame_name);
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.post(serverUrl, formData);
        setStatus(response.data.status === 'ok');
      } catch (err) {
        setError(err);
        setStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    uploadImage();
  }, []);

  return { status, error, isLoading };
};
