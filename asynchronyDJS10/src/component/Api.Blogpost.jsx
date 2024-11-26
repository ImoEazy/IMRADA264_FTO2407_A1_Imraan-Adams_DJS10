// Imports react functions
import { useState, useEffect } from "react";
import { getBlogs } from "./Api.js";

//  the Main blog component
export default function ApiBlogpost() {
  // Declaring useStates
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calling and setting the useState data
  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []); // the empty dependency array to certify this effect runs once on mount

  // Renderingloading state
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Rendering error states
  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // Rendering blog posts
  return (
    <>
      <h1>Posts</h1>
      <div>
        {blogs.map(blog => (
          <div key={blog.id}>
            <h2>
              <span>{blog.id}.</span> {blog.title}
            </h2>
            <p>{blog.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}