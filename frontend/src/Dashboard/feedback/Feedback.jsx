import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";

const Feedback = () => {
  const auth = useSelector((state) => state.auth);
  const { id: userId, name, email } = auth;

  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackMessage) {
      setError("Please provide your feedback.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_APP_BACKEND_URL}/feedback/write-feedback`,
        {
          userId,
          name,
          email,
          message: feedbackMessage,
        }
      );
      setSuccess("Your feedback has been submitted successfully.");
      toast.success("Your feedback has been submitted successfully.");
      setFeedbackMessage("");
      setError("");
    } catch (err) {
      setError("Failed to submit feedback. Please try again later.");
      toast.error("Failed to submit feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-gray-800 to-gray-950 p-4">
      <div className="w-full max-w-3xl bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white border-b border-cyan-600 pb-3 text-center">
          Submit Your Feedback
        </h1>

        <form onSubmit={handleFeedbackSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-white mb-2">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              rows="6"
              placeholder="Write your feedback here..."
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-cyan-600 text-white rounded-md flex items-center justify-center gap-2 transition-all duration-300 hover:bg-cyan-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
            <FaPaperPlane />
          </button>

          {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-3 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Feedback;
