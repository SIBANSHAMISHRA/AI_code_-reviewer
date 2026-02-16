import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { FaCode, FaChartPie, FaClock } from "react-icons/fa";

const Statistics = ({ history }) => {
  const totalReviews = history.length;

  // Language Count
  const languageCount = history.reduce((acc, item) => {
    acc[item.language] = (acc[item.language] || 0) + 1;
    return acc;
  }, {});

  const languageData = Object.keys(languageCount).map((lang) => ({
    name: lang,
    value: languageCount[lang],
  }));

  const timeData = history.map((item, index) => ({
    name: `R${index + 1}`,
    reviews: 1,
  }));

  const lastReview =
    history.length > 0 ? history[0].date : "No reviews yet";

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Project Analytics</h1>

      {/* TOP CARDS */}
      <div style={styles.cardGrid}>
        <div style={styles.card}>
          <FaCode size={28} />
          <h3>Total Reviews</h3>
          <p style={styles.number}>{totalReviews}</p>
        </div>

        <div style={styles.card}>
          <FaChartPie size={28} />
          <h3>Languages Used</h3>
          <p style={styles.number}>{Object.keys(languageCount).length}</p>
        </div>

        <div style={styles.card}>
          <FaClock size={28} />
          <h3>Last Review</h3>
          <p>{lastReview}</p>
        </div>
      </div>

      {/* PIE CHART */}
      <div style={styles.chartCard}>
        <h2>Language Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={languageData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {languageData.map((entry, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div style={styles.chartCard}>
        <h2>Review Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="reviews" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "30px",
    background: "linear-gradient(135deg,#020617,#03060f)",
    minHeight: "100vh",
    color: "#e5e7eb",
    fontFamily: "Arial",
  },

  heading: {
    marginBottom: "25px",
    fontSize: "28px",
    fontWeight: "600",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    background: "rgba(15,23,42,0.7)",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },

  number: {
    fontSize: "26px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  chartCard: {
    background: "rgba(15,23,42,0.7)",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
    backdropFilter: "blur(8px)",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },
};
