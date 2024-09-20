import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Replies from './Replies'; // Import the Replies component

function PostDetail() {
  const { id } = useParams(); // Get postId from URL params
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch the post data based on the ID from the URL
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://localhost:5000/read/details', {
          params: { postId: id }, // Send the postId as query param
        });
        setPost(response.data.data); // Assuming the response contains post data in 'data'
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post details.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      
      {/* Use the Replies component to render replies */}
      <Replies replies={post.postreply} />
    </div>
  );
}

export default PostDetail;
