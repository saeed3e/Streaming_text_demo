import { useRef, useCallback } from 'react';

export const useAutoScroll = () => {
  const containerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return { containerRef, scrollToBottom };
};