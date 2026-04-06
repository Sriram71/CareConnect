
// import { useCallback, useEffect, useRef, useState } from 'react';
// import * as Vapi from '@vapi-ai/web';

// const PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY;
// const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

// export default function useVapi() {
//   const vapiRef = useRef(null);

//   // messages = array of { role: 'assistant'|'user', text: string }
//   const [messages, setMessages] = useState([]);
//   // live partial for the current speaker (replaced word-by-word)
//   const [partial, setPartial] = useState({ role: null, text: '' });
//   const [isListening, setIsListening] = useState(false);
//   const [vapiError, setVapiError] = useState(null);

//   useEffect(() => {
//     const vapi = new Vapi.default.default(PUBLIC_KEY);
//     vapiRef.current = vapi;

//     vapi.on('call-start', () => setIsListening(true));
//     vapi.on('call-end', () => {
//       setIsListening(false);
//       setPartial({ role: null, text: '' });
//     });

//     vapi.on('error', (e) => {
//       console.error(e);
//       setIsListening(false);
//       setVapiError(e?.message || 'Error');
//     });

//     vapi.on('message', (message) => {
//       if (message?.type !== 'transcript') return;

//       const text = message?.transcript;
//       const role = message?.role; // 'assistant' or 'user'
//       if (!text || !role) return;

//       if (message.transcriptType === 'partial') {
//         setPartial({ role, text });
//       } else {
//         // Commit final sentence as a new message bubble
//         setMessages((prev) => [...prev, { role, text }]);
//         setPartial({ role: null, text: '' });
//       }
//     });

//     return () => {
//       try { vapi.stop(); } catch {}
//     };
//   }, []);

//   const startCall = useCallback(() => {
//     setMessages([]);
//     setPartial({ role: null, text: '' });
//     vapiRef.current?.start(ASSISTANT_ID);
//   }, []);

//   const stopCall = useCallback(() => {
//     vapiRef.current?.stop();
//   }, []);

//   // Plain transcript string for the report (all final messages joined)
//   const transcript = messages.map((m) => `${m.role === 'assistant' ? 'Assistant' : 'You'}: ${m.text}`).join('\n');

//   return { startCall, stopCall, transcript, messages, partial, isListening, vapiError };
// }

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Vapi from '@vapi-ai/web';

const PUBLIC_KEY   = import.meta.env.VITE_VAPI_PUBLIC_KEY;
const ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID;

export default function useVapi() {
  const vapiRef      = useRef(null);
  const messagesRef  = useRef([]);          // mirror of messages state for the call-end handler

  const [messages,    setMessages]    = useState([]);
  const [partial,     setPartial]     = useState({ role: null, text: '' });
  const [isListening, setIsListening] = useState(false);
  const [vapiError,   setVapiError]   = useState(null);

  useEffect(() => {
    const vapi = new Vapi.default.default(PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on('call-start', () => {
      setIsListening(true);
      setVapiError(null);
    });

    vapi.on('call-end', () => {
      setIsListening(false);
      setPartial({ role: null, text: '' });

      // Persist the transcript so ReportPage can read it even after a
      // hard refresh or if React Router state is lost.
      const saved = messagesRef.current
        .map((m) => `${m.role === 'assistant' ? 'Assistant' : 'You'}: ${m.text}`)
        .join('\n');
      if (saved) localStorage.setItem('transcript', saved);
    });

    vapi.on('error', (e) => {
      console.error('Vapi error:', e);
      setIsListening(false);
      setVapiError(e?.message || 'A connection error occurred. Please try again.');
    });

    vapi.on('message', (message) => {
      if (message?.type !== 'transcript') return;

      const text = message?.transcript;
      const role = message?.role;           // 'assistant' | 'user'
      if (!text || !role) return;

      if (message.transcriptType === 'partial') {
        setPartial({ role, text });
      } else {
        const newMsg = { role, text };
        setMessages((prev) => {
          const next = [...prev, newMsg];
          messagesRef.current = next;        // keep ref in sync
          return next;
        });
        setPartial({ role: null, text: '' });
      }
    });

    return () => {
      try { vapi.stop(); } catch (_) {}
    };
  }, []);

  const startCall = useCallback(() => {
    messagesRef.current = [];
    setMessages([]);
    setPartial({ role: null, text: '' });
    setVapiError(null);
    localStorage.removeItem('transcript');
    vapiRef.current?.start(ASSISTANT_ID);
  }, []);

  const stopCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  const transcript = messages
    .map((m) => `${m.role === 'assistant' ? 'Assistant' : 'You'}: ${m.text}`)
    .join('\n');

  return { startCall, stopCall, transcript, messages, partial, isListening, vapiError };
}