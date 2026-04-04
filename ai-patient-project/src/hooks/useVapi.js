
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Vapi from '@vapi-ai/web';

const PUBLIC_KEY = '';
const ASSISTANT_ID = '';

export default function useVapi() {
  const vapiRef = useRef(null);

  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [vapiError, setVapiError] = useState(null);

  useEffect(() => {
    const vapi = new Vapi.default.default(PUBLIC_KEY); // ✅ FINAL FIX
    vapiRef.current = vapi;

    vapi.on('call-start', () => setIsListening(true));
    vapi.on('call-end', () => setIsListening(false));

    vapi.on('error', (e) => {
      console.error(e);
      setIsListening(false);
      setVapiError(e?.message || 'Error');
    });

    vapi.on('message', (message) => {
      const text =
        message?.transcript ||
        message?.text ||
        message?.content;

      if (!text) return;

      setTranscript((prev) =>
        prev ? `${prev}\n${text}` : text
      );
    });

    return () => {
      try { vapi.stop(); } catch {}
    };
  }, []);

  const startCall = useCallback(() => {
    setTranscript('');
    vapiRef.current?.start(ASSISTANT_ID);
  }, []);

  const stopCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  return { startCall, stopCall, transcript, isListening, vapiError };
}