import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaPlus, FaUserCircle, FaBars } from "react-icons/fa";
import { reviewCode, getSuggestion } from "../Services/api";

 const Dashboard = ({ history, setHistory }) => {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const [suggestion, setSuggestion] = useState("");




  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [reviewResult, setReviewResult] = useState("");
  const handleTestCode = () => {
  if (!code.trim()) {
    alert("Write code first");
    return;
  }

  alert("Test cases feature will run here");
};


 const handleReview = async () => {
  if (!code.trim()) {
    alert("Please write some code first");
    return;
  }

  try {
    setLoading(true);

    const response = await reviewCode(code);

    setReviewResult(response.review);

    const newReview = {
      id: Date.now(),
      language: language,
      status: "Reviewed",
      date: new Date().toLocaleString(),
      code: code,
    };

    setHistory(prev => [newReview, ...prev]);

  } catch (error) {
    console.error(error);
    setReviewResult("❌ Error reviewing code");
  } finally {
    setLoading(false);
  }
};

 const handleSuggestion = async (type) => {
  if (!code.trim()) {
    alert("Write code first");
    return;
  }

  try {
    const response = await getSuggestion(code, type);
    setSuggestion(response.result);

  } catch (error) {
    console.error(error);
    setSuggestion("Error getting suggestion");
  }
};

 return (
  <div style={styles.appLayout}>
    
    {/* Sidebar */}
    <div style={{
  ...styles.sidebar,
  width: collapsed ? "70px" : "220px"
}}>

  <div style={styles.topBar}>
  <h2 style={styles.logo}>
    {collapsed ? "CR" : "Code Reviewer"}
  </h2>

  <button
    style={styles.menuBtn}
    onClick={() => setCollapsed(!collapsed)}
  >
    <FaBars />
  </button>
</div>

{/* New Review */}
  <button
    style={styles.sidebarBtn}
    onClick={() => navigate("/dashboard")}
  >
    <FaPlus /> {!collapsed && "New Review"}
  </button>

  {/* History */}
  <button
    style={styles.sidebarBtn}
    onClick={() => navigate("/history")}
  >
    <FaHistory /> {!collapsed && "History"}
  </button>

  <button
  style={styles.sidebarBtn}
  onClick={() => navigate("/statistics")}
>
  Statistics

</button>

{/* Suggestions */}
<div style={styles.sidebarSection}>

  {!collapsed && <p style={styles.sectionTitle}>AI Tools</p>}

  <button onClick={() => handleSuggestion("analyze")} style={styles.sidebarBtn}>
    Analyze
  </button>

  <button onClick={() => handleSuggestion("optimize")} style={styles.sidebarBtn}>
    Optimize
  </button>

  <button onClick={() => handleSuggestion("bugs")} style={styles.sidebarBtn}>
    Bugs
  </button>

</div>



  {/* User Profile */}
  <div style={styles.profile}>
    <FaUserCircle size={28} />
    {!collapsed && <span>Sampada</span>}
  </div>

  {/* Logout */}
  <button
    style={styles.logoutBtn}
    onClick={() => navigate("/")}
  >
    Logout
  </button>

</div>



    {/* Main Content */}
    <div style={styles.mainContent}>

      <h1>AI Code Reviewer</h1>

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
  onChange={(value) => {
    setCode(value || "");
  }}
  options={{
    fontSize: 14,
    minimap: { enabled: false },
    wordWrap: "on",
    scrollBeyondLastLine: false,
  }}
/>
<div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>

  <button
  style={styles.button}
  onClick={handleTestCode}
>
  Test Code
</button>

  <button
    style={styles.button}
    onClick={handleReview}
  >
    Review Code
  </button>

</div>



     <div style={styles.outputBox}>
  <p>{loading ? "Reviewing..." : reviewResult || "Review output will appear here..."}</p>
</div>
  

  {/* Suggestions Panel */}
<div style={styles.suggestionBox}>

  <h3>AI Suggestions</h3>

  <div style={styles.suggestionBtns}>
    <button onClick={() => handleSuggestion("analyze")}>Analyze</button>
    <button onClick={() => handleSuggestion("optimize")}>Optimize</button>
    <button onClick={() => handleSuggestion("bugs")}>Find Bugs</button>
    <button onClick={() => handleSuggestion("readability")}>Readability</button>
    <button onClick={() => handleSuggestion("comments")}>Add Comments</button>
  </div>

<div style={styles.suggestionOutput}>
    {suggestion || "Suggestions will appear here..."}
  </div>


 

</div>


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

appLayout: {
  display: "flex",
  height: "100vh",
  backgroundColor: "#03060f",
  color: "#e5e7eb",
},

sidebar: {
 
  backgroundColor: "#020617",
  color: "#fff",
  height: "100vh",
  padding: "15px",
  display: "flex",
  flexDirection: "column",


},

topBar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"
},

logo: {
  color: "white",
  fontSize: "20px",
  margin: 0
},

menuBtn: {
  background: "transparent",
  border: "none",
  color: "white",
  fontSize: "20px",
  cursor: "pointer"
},

sidebarBtn: {
  backgroundColor: "transparent",
  color: "#e5e7eb",
  border: "none",
  padding: "10px",
  textAlign: "left",
  cursor: "pointer",
  borderRadius: "6px",
  marginBottom: "10px",
},

logoutBtn: {
  marginTop: "auto",
  backgroundColor: "#ff3b3b",
  border: "none",
  padding: "10px",
  borderRadius: "6px",
  color: "#fff",
  cursor: "pointer",
},

mainContent: {
  flex: 1,
  padding: "20px",
  overflowY: "auto",
},


profile: {
  marginTop: "auto",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px",
  borderTop: "1px solid #334155",
},


suggestionBox: {
  marginTop: "20px",
  padding: "15px",
  border: "1px solid #334155",
  borderRadius: "8px",
  backgroundColor: "#020617",
},

suggestionBtns: {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginBottom: "10px",
},

suggestionOutput: {
  padding: "10px",
  border: "1px solid #334155",
  borderRadius: "6px",
  backgroundColor: "#010409",
  minHeight: "60px",
},

sidebarSection: {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
},

sectionTitle: {
  fontSize: "12px",
  color: "#94a3b8",
  marginBottom: "5px",
},



};
