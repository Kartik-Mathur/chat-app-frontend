import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditPostMutation } from "../services/api";
import { fetchPost } from "../api/posts";
import Loader from "../components/Loader";

const EditPost = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    (async function () {
      const { data } = await fetchPost(id);

      setForm({
        title: data.title,
        content: data.content,
      });

      setLoading(false);
    })();
  }, []);
  const [editPost] = useEditPostMutation();

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setForm((prevData) => ({ ...prevData, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost({ id, content: form.content, title: form.title });
    navigate("/admin");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "90vh",
      padding: "2rem",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f6f8",
    },
    form: {
      backgroundColor: "#fff",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "500px",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    heading: {
      marginBottom: "1rem",
      textAlign: "center",
      color: "#333",
    },
    input: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      transition: "border-color 0.3s",
    },
    textarea: {
      padding: "12px",
      fontSize: "1rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
      resize: "vertical",
      height: "150px",
      transition: "border-color 0.3s",
    },
    button: {
      padding: "12px",
      fontSize: "1rem",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={styles.container}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.heading}>📝 Update Existing Post</h2>
            <input
              onChange={handleChange}
              name="title"
              type="text"
              value={form.title}
              placeholder="Enter Title"
              style={styles.input}
              required
            />
            <textarea
              onChange={handleChange}
              name="content"
              value={form.content}
              placeholder="Enter Content"
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.button}>
              Update Post
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditPost;
