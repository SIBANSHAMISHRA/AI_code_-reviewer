import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";



  const Dashboard = ({ history, setHistory }) => {
    const navigate = useNavigate();



  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState("");

 const handleReview = () => {
  console.log("Button clicked");
  console.log("Code:", code);

  if (!code.trim()) {
    alert("Please write some code first");
    return;
  }

  setLoading(true);

  const newReview = {
    id: Date.now(),
    language: language,
    status: "Reviewed",
    date: new Date().toLocaleString(),
    code: code,
  };

  // Update history immediately
  setHistory(prev => [newReview, ...prev]);
  console.log("Updated history:", history);


  setTimeout(() => {
    setReviewResult(
      "✅ Code reviewed successfully.\n\n• No syntax errors\n• Logic looks fine"
    );
    setLoading(false);
  }, 1000);
};




  

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.title}>AI Code Reviewer</h1>
       
      </div>
      <select
         value={language}
         onChange={(e) => setLanguage(e.target.value)}
         style={styles.languageSelect}
        >
         <option value="python">Python</option>
         <option value="javascript">JavaScript</option>
         <option value="java">Java</option>
        </select>


        <Editor
          height="400px"
          language={language}
          theme="vs-dark"
          value={code}
          
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
          onChange={(value) => setCode(value || "")}
           />



     

      {/* Review Button */}
      <button style={styles.button} onClick={handleReview}>
        Review Code
      </button>

     <button
  style={styles.button}
  onClick={() => navigate("/history")}
>
  View History
</button>

      {/* Output Box */}
     <div style={styles.outputBox}>
  {loading ? (
    <p>Reviewing...</p>
  ) : (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {reviewResult || "Review output will appear here..."}
    </pre>
  )}
</div>

    </div>
  );
};

export default Dashboard;

/* ================== STYLES ================== */

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#03060f",
    color: "#e5e7eb",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #1e293b",
  },

  title: {
    margin: 0,
    fontSize: "24px",
  },

  


  editorBox: {
    border: "1px solid #334155",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#020617",
    boxShadow: "0 0 12px rgba(0,0,0,0.4)",
    marginTop: "10px",
  },

  button: {
    marginTop: "15px",
    marginRight: "10px",

    padding: "10px 18px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "15px",
  },

  outputBox: {
    marginTop: "20px",
    padding: "15px",
    border: "1px solid #334155",
    borderRadius: "8px",
    backgroundColor: "#020617",
    minHeight: "120px",
  },

  languageSelect: {
  marginBottom: "15px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #334155",
  backgroundColor: "#020617",
  color: "#e5e7eb",
  fontSize: "14px",
},

};
