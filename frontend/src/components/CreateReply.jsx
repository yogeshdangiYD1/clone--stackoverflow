import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


function CreateReply() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event, editor) => {
    setContent(editor.getData());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    setIsSubmitting(true); // Set submission state to true

    const validationErrors = [];
    if (!title || title.length < 4) {
      validationErrors.push('Title is required and must be at least 4 characters long.');
    }
    if (!content || content.length < 20) {
      validationErrors.push('Content is required and must be at least 20 characters long.');
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      const userId = localStorage.getItem('userId'); // Get user ID from localStorage
      const currentDate = new Date().toISOString(); // Generate current date/time
      console.log(userId, currentDate);

      try {
        const response = await axios.post("http://localhost:5000/post/reply", {
          title,
          content,
          createdBy: userId,
          createdAt: currentDate,
          updatedAt: currentDate, 
        });

        console.log('Form submitted successfully! Response:', response.data);
        const {error} = response.data;
        if(error){
            toast.error("and error occured");
        }
        toast.success("post created successfully")
        setTitle(''); 
        setContent('');
      } catch (error) {
        console.error('Error submitting post:', error);
        setIsSubmitting(false); // Reset submission state on error
      } finally {
        setIsSubmitting(false); // Reset submission state regardless of success or error
      }
    }
  };

  return (
    <form className="m-5 p-2 outline- rounded shadow-zinc-400 shadow-xl" onSubmit={handleSubmit}>
      
      <h2 className="font-serif text-xl">Reply</h2>
      {errors.length > 0 && (
        <div className="error-messages">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <label htmlFor="content">Reply:</label>
      <CKEditor className="min-h-10"
        editor={ClassicEditor}
        data={content}
        onChange={handleContentChange}
        disabled={isSubmitting} // Disable CKEditor while submitting
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default CreateReply;