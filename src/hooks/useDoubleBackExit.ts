
import { useEffect, useState, useCallback } from 'react';

export const useDoubleBackExit = (timeout = 2000) => {
  const [showExitToast, setShowExitToast] = useState(false);
  const [exitAttempt, setExitAttempt] = useState(0);

  const handlePopState = useCallback(() => {
    // Prevent default back navigation logic by pushing state again immediately
    // if we want to trap the user.
    
    if (exitAttempt === 0) {
      // First attempt: Show toast and trap
      setShowExitToast(true);
      setExitAttempt(1);
      
      // Push state to keep the user on the current "page" (prevent exit)
      window.history.pushState(null, '', window.location.pathname);

      // Reset attempt after timeout
      setTimeout(() => {
        setExitAttempt(0);
        setShowExitToast(false);
      }, timeout);
    } else {
      // Second attempt within timeout: Allow exit
      // We do NOT push state here, allowing the browser to go back (exit app or navigate)
    }
  }, [exitAttempt, timeout]);

  useEffect(() => {
    // Initial push to ensure we have a state to pop
    window.history.pushState(null, '', window.location.pathname);

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [handlePopState]);

  return { showExitToast };
};
