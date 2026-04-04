
import { useCallback, useEffect, useRef, useState } from 'react';
import * as Vapi from '@vapi-ai/web';

const PUBLIC_KEY = '';
const ASSISTANT_ID = '';

export default function useVapi() {
  const vapiRef = useRef(null);

  // messages = array of { role: 'assistant'|'user', text: string }
  const [messages, setMessages] = useState([]);
  // live partial for the current speaker (replaced word-by-word)
  const [partial, setPartial] = useState({ role: null, text: '' });
  const [isListening, setIsListening] = useState(false);
  const [vapiError, setVapiError] = useState(null);

  useEffect(() => {
    const vapi = new Vapi.default.default(PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => setIsListening(true));
    vapi.on('call-end', () => {
      setIsListening(false);
      setPartial({ role: null, text: '' });
    });

    vapi.on('error', (e) => {
      console.error(e);
      setIsListening(false);
      setVapiError(e?.message || 'Error');
    });

    vapi.on('message', (message) => {
      if (message?.type !== 'transcript') return;

      const text = message?.transcript;
      const role = message?.role; // 'assistant' or 'user'
      if (!text || !role) return;

      if (message.transcriptType === 'partial') {
        setPartial({ role, text });
      } else {
        // Commit final sentence as a new message bubble
        setMessages((prev) => [...prev, { role, text }]);
        setPartial({ role: null, text: '' });
      }
    });

    return () => {
      try { vapi.stop(); } catch {}
    };
  }, []);

  const startCall = useCallback(() => {
    setMessages([]);
    setPartial({ role: null, text: '' });
    vapiRef.current?.start(ASSISTANT_ID);
  }, []);

  const stopCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  // Plain transcript string for the report (all final messages joined)
  const transcript = messages.map((m) => `${m.role === 'assistant' ? 'Assistant' : 'You'}: ${m.text}`).join('\n');

  return { startCall, stopCall, transcript, messages, partial, isListening, vapiError };
}