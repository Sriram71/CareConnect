import { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

function useVapi() {
  const [vapi, setVapi] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [vapiError, setVapiError] = useState(null);

  useEffect(() => {
    try {
      const vapiInstance = new Vapi({ apiKey: import.meta.env.VITE_VAPI_API_KEY });
      setVapi(vapiInstance);
    } catch (error) {
      console.error('Failed to initialize Vapi:', error);
      setVapiError('Failed to initialize Vapi. Please check your API key.');
    }
  }, []);

  const startCall = async () => {
    if (!vapi) {
      setVapiError('Vapi is not initialized.');
      return;
    }

    try {
      await vapi.start();
      setIsListening(true);
      vapi.on('transcript', (data) => {
        setTranscript((prev) => `${prev} ${data}`);
      });
    } catch (error) {
      console.error('Error starting Vapi call:', error);
      setVapiError('Error starting Vapi call.');
    }
  };

  const stopCall = async () => {
    if (!vapi) {
      setVapiError('Vapi is not initialized.');
      return;
    }

    try {
      await vapi.stop();
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping Vapi call:', error);
      setVapiError('Error stopping Vapi call.');
    }
  };

  return {
    startCall,
    stopCall,
    transcript,
    isListening,
    vapiError,
  };
}

export default useVapi;