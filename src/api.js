// Simulate a streaming response with text
export async function* streamText(text) {
  const words = text.split('');
  for (const char of words) {
    await new Promise(resolve => setTimeout(resolve, 5)); // Adjust speed as needed
    yield char;
  }
}

export async function* fetchPostsStream() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  
  for (const post of posts) {
    const text = `${post.title}\n\n${post.body}`;
    yield* streamText(text);
  }
}