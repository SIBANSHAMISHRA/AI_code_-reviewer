import Editor from "@monaco-editor/react";

const History = ({ history }) => {
  return (
    <div style={styles.container}>
      <h2>Review History</h2>

      {history.length === 0 && <p>No reviews yet</p>}

      {history.map((item) => (
        <div key={item.id} style={styles.card}>
          <p><b>Date:</b> {item.date}</p>
          <p><b>Language:</b> {item.language}</p>
          <p><b>Status:</b> {item.status}</p>

          <Editor
            height="200px"
            language="python"
            value={item.code}
            theme="vs-dark"
            options={{ readOnly: true, minimap: { enabled: false } }}
          />
        </div>
      ))}
    </div>
  );
};

export default History;

/* styles */
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#03060f",
    color: "#e5e7eb",
    padding: "20px",
  },
  card: {
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    backgroundColor: "#020617",
  },
};
