import React, { useState } from "react";

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[\W_]/.test(password)) score++;

  if (!password) return { label: "", color: "#444", score: 0 };
  if (score <= 1) return { label: "Weak", color: "#ff5b57", score: 1 };
  if (score === 2) return { label: "Fair", color: "#ffae42", score: 2 };
  if (score === 3) return { label: "Good", color: "#3c89e8", score: 3 };
  if (score === 4) return { label: "Strong", color: "#23d160", score: 4 };
  return { label: "", color: "#444", score: 0 };
};

const suggestions = [
  "Use at least 8 characters",
  "Include uppercase letters",
  "Add numbers",
  "Use special characters",
];

const PasswordCopilot = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const strength = getPasswordStrength(password);

  // Suggestion fulfillment
  const tips = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[\W_]/.test(password),
  ];

  return (
    <div style={styles.page}>
      <div style={styles.centeredCard}>
        <h1 style={styles.heading}>Hey, how strong is your password?</h1>
        <div style={styles.inputCard}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            spellCheck="false"
            autoComplete="off"
            aria-label="Password input"
          />
          <button
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={styles.showBtn}
            tabIndex={-1}
          >
            {showPassword ? (
              <span role="img" aria-label="Hide">🙈</span>
            ) : (
              <span role="img" aria-label="Show">👁️</span>
            )}
          </button>
        </div>

        <div style={styles.progressBarBg}>
          <div
            style={{
              ...styles.progressBar,
              width: `${(strength.score / 4) * 100}%`,
              background: strength.color,
            }}
          />
        </div>
        <div style={styles.strengthRow}>
          <span style={{
            color: strength.color,
            fontWeight: 700,
            fontSize: "1.1rem"
          }}>
            {password ? strength.label : ""}
          </span>
        </div>

        <div style={styles.suggestionRow}>
          {suggestions.map((suggestion, i) => (
            <div
              key={i}
              style={{
                ...styles.suggestionChip,
                background: tips[i] ? "rgba(35, 209, 96, 0.16)" : "rgba(68,70,84,.3)",
                color: tips[i] ? "#23d160" : "#eee",
                borderColor: tips[i] ? "#23d160" : "#444",
              }}
            >
              {tips[i] && <span style={{ fontSize: "1rem", marginRight: 4 }}>✓</span>}
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #101225 0%, #22243d 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, Segoe UI, Arial, sans-serif",
  },
  centeredCard: {
    minWidth: 380,
    maxWidth: 420,
    background: "linear-gradient(120deg, rgba(38,40,56,0.75) 80%, rgba(68,70,84,0.8) 100%)",
    borderRadius: "24px",
    boxShadow: "0 8px 32px rgb(10 16 35 / 50%)",
    padding: "2.75rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1.5px solid rgba(100,100,120,0.14)",
    backdropFilter: "blur(2px)"
  },
  heading: {
    color: "#f2f2f6",
    fontWeight: 700,
    margin: "0 0 2.1rem",
    fontSize: "1.45rem",
    letterSpacing: "0.01em",
    textAlign: "center"
  },
  inputCard: {
    background: "#23253b",
    borderRadius: "1.6em",
    boxShadow: "0 2px 24px rgb(32, 35, 58, 0.15)",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "1.1rem 1.7rem",
    marginBottom: "1.5rem",
    marginTop: "0rem",
    position: "relative",
    border: "1.3px solid #292b45"
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: "1.17rem",
    color: "#e9e9f0",
    fontWeight: 500,
    letterSpacing: "0.02em"
  },
  showBtn: {
    background: "transparent",
    border: "none",
    color: "#9498ad",
    fontSize: "1.05rem",
    position: "absolute",
    right: "1.2rem",
    cursor: "pointer",
    top: "50%",
    transform: "translateY(-50%)"
  },
  progressBarBg: {
    width: "100%",
    height: "6px",
    background: "rgba(85,89,116,.22)",
    borderRadius: "6px",
    marginBottom: "0.75rem"
  },
  progressBar: {
    height: "6px",
    borderRadius: "6px",
    transition: "width 0.45s cubic-bezier(0.4,0,0.2,1)"
  },
  strengthRow: {
    width: "100%",
    minHeight: "1.6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    letterSpacing: "0.09em"
  },
  suggestionRow: {
    width: "100%",
    marginTop: "1.6rem",
    display: "flex",
    gap: "0.7rem",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  suggestionChip: {
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    fontSize: "0.96rem",
    color: "#eee",
    borderRadius: "18px",
    border: "1px solid #444",
    padding: "0.45em 1.08em",
    background: "rgba(68,70,84,.32)",
    transition: "all .22s cubic-bezier(.36,.01,.32,1.01)",
    boxShadow: "0 1px 4px rgba(72, 255, 155, 0.09)",
    marginBottom: "0.3rem"
  },
};

export default PasswordCopilot;
