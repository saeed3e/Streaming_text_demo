// Simulate a streaming response with text
const streamText = async function* (text) {
  const words = text.split('');
  for (const char of words) {
    await new Promise(resolve => setTimeout(resolve, 5));
    yield char;
  }
};

export const fetchPostsStream = async function* () {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    
    // Get first few posts to demonstrate chunking
    const selectedPosts = posts.slice(0, 3);
    for (const post of selectedPosts) {
      yield* streamText(`${post.title}\n\n${post.body}\n\n`);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};