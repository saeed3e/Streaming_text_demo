import { useState, useCallback, useRef } from 'react';
import { fetchPostsStream } from '../services/api';
import { useAutoScroll } from './useAutoScroll';

const CHUNK_SIZE = 50;

export const useStreamedText = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { containerRef, scrollToBottom } = useAutoScroll();
  
  const completeTextRef = useRef('');
  const isStreamingRef = useRef(false);

  const streamText = useCallback(async (text, startIndex, endIndex) => {
    const chunk = text.slice(startIndex, endIndex);
    for (const char of chunk) {
      await new Promise(resolve => setTimeout(resolve, 5));
      setDisplayedText(prev => prev + char);
      scrollToBottom();
    }
    
    // Check if we've streamed all the text
    if (endIndex >= text.length) {
      setIsComplete(true);
    }
  }, [scrollToBottom]);

  const loadPosts = useCallback(async () => {
    if (isStreamingRef.current || isComplete) return;
    
    const currentLength = displayedText.length;
    if (currentLength > 0 && currentLength < completeTextRef.current.length) {
      isStreamingRef.current = true;
      try {
        const nextChunkEnd = currentLength + CHUNK_SIZE;
        await streamText(
          completeTextRef.current, 
          currentLength, 
          Math.min(nextChunkEnd, completeTextRef.current.length)
        );
      } finally {
        isStreamingRef.current = false;
      }
      return;
    }

    isStreamingRef.current = true;
    setIsLoading(true);
    setError(null);
    setDisplayedText('');
    setIsComplete(false);
    completeTextRef.current = '';

    try {
      let fullText = '';
      for await (const char of fetchPostsStream()) {
        fullText += char;
        completeTextRef.current = fullText;
        
        if (fullText.length <= CHUNK_SIZE) {
          setDisplayedText(prev => prev + char);
          scrollToBottom();
        }
      }
      setHasStarted(true);
      
      // If the text is shorter than the chunk size, mark as complete
      if (fullText.length <= CHUNK_SIZE) {
        setIsComplete(true);
      }
    } catch (err) {
      setError('Error loading posts');
    } finally {
      setIsLoading(false);
      isStreamingRef.current = false;
    }
  }, [displayedText.length, scrollToBottom, streamText, isComplete]);

  return {
    streamedText: displayedText,
    isLoading,
    error,
    loadPosts,
    containerRef,
    hasStarted,
    isComplete
  };
};