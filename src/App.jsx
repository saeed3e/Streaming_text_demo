import { Button } from './components/Button';
import { MessageContainer } from './components/MessageContainer';
import { useStreamedText } from './hooks/useStreamedText';

function App() {
  const {
    streamedText,
    isLoading,
    error,
    loadPosts,
    containerRef,
    hasStarted,
    isComplete
  } = useStreamedText();

  const buttonText = isLoading 
    ? 'Loading data...' 
    : isComplete
      ? 'Successfully streamed all data'
      : hasStarted 
        ? 'Continue to load more data'
        : 'Load data';

  return (
    <div className="container">
      <div className="content">
        <h1>Streaming Text Demo</h1>
        
        <div className="posts">
          <h2>Streaming Posts</h2>
          <Button 
            onClick={loadPosts}
            disabled={isLoading || isComplete}
          >
            {buttonText}
          </Button>
          
          <MessageContainer
            error={error}
            streamedText={streamedText}
            containerRef={containerRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;