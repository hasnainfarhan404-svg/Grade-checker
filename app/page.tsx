"use client";

import { useState } from "react";

const subjects = [
  "English",
  "Mathematics",
  "Science",
  "Computer",
  "Urdu",
];

type Result = {
  name: string;
  roll: string;
  marks: number[];
  total: number;
  percentage: number;
  grade: string;
  status: string;
};

export default function Home() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [marks, setMarks] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  function updateMark(index: number, value: string) {
    if (
      value !== "" &&
      (!/^\d+$/.test(value) ||
        Number(value) < 0 ||
        Number(value) > 100)
    ) {
      return;
    }

    setMarks((previous) =>
      previous.map((mark, i) =>
        i === index ? value : mark
      )
    );

    setResult(null);
    setError("");
  }

  function checkResult() {
    if (!name.trim() || !roll.trim()) {
      setError(
        "Please enter the student's name and roll number."
      );
      setResult(null);
      return;
    }

    if (marks.some((mark) => mark.trim() === "")) {
      setError(
        "Please enter marks for all five subjects."
      );
      setResult(null);
      return;
    }

    const numericMarks = marks.map(Number);

    if (
      numericMarks.some(
        (mark) =>
          !Number.isInteger(mark) ||
          mark < 0 ||
          mark > 100
      )
    ) {
      setError(
        "Marks must be whole numbers between 0 and 100."
      );
      setResult(null);
      return;
    }

    const total = numericMarks.reduce(
      (sum, mark) => sum + mark,
      0
    );

    const percentage = (total / 500) * 100;

    // Grade calculation
    const grade =
      percentage >= 100
        ? "A+"
        : percentage >= 90
          ? "A"
          : percentage >= 75
            ? "B"
            : percentage >= 50
              ? "C"
              : "No Grade";

    // A student must score at least 33 in EVERY subject.
    const status = numericMarks.every(
      (mark) => mark >= 33
    )
      ? "PASS"
      : "FAIL";

    setResult({
      name: name.trim(),
      roll: roll.trim(),
      marks: numericMarks,
      total,
      percentage,
      grade,
      status,
    });

    setError("");
  }

  function resetForm() {
    setName("");
    setRoll("");
    setMarks(["", "", "", "", ""]);
    setResult(null);
    setError("");
  }

  return (
    <main className="app-shell">
      {/* Header */}
      <header className="topbar">
        <a
          className="brand"
          href="#"
          aria-label="GradeCheck home"
        >
          <span className="brand-icon">G</span>
          <span>
            Grade<span className="brand-accent">Check</span>
          </span>
        </a>

        <span className="top-badge">
          <span className="live-dot" />
          STUDENT PORTAL
        </span>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="eyebrow">
          <span>✦</span> SMART ACADEMIC TOOLS
        </div>

        <h1>
          Your Results,
          <br />
          <span>Clearly Defined.</span>
        </h1>

        <p>
          Calculate grades, track academic performance,
          and discover your results in seconds.
        </p>
      </section>

      {/* Main workspace */}
      <section className="workspace">
        <div className="form-card">
          {/* Student information */}
          <div className="section-heading">
            <div>
              <span className="step-label">STEP 01</span>
              <h2>Student Information</h2>
              <p>Enter the student&apos;s details below.</p>
            </div>

            <span className="heading-icon">♙</span>
          </div>

          <div className="field-grid">
            <label className="field">
              <span>STUDENT NAME</span>

              <input
                type="text"
                placeholder="e.g. Ahmed Khan"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setResult(null);
                  setError("");
                }}
                maxLength={80}
              />
            </label>

            <label className="field">
              <span>ROLL NUMBER</span>

              <input
                type="text"
                placeholder="e.g. ST-1024"
                value={roll}
                onChange={(e) => {
                  setRoll(e.target.value);
                  setResult(null);
                  setError("");
                }}
                maxLength={30}
              />
            </label>
          </div>

          {/* Subject marks */}
          <div className="section-heading marks-heading">
            <div>
              <span className="step-label">STEP 02</span>
              <h2>Subject Marks</h2>
              <p>Enter marks obtained out of 100 per subject.</p>
            </div>

            <span className="marks-count">05 SUBJECTS</span>
          </div>

          <div className="marks-table">
            <div className="table-header">
              <span>SUBJECT</span>
              <span>MAX MARKS</span>
              <span>OBTAINED</span>
            </div>

            {subjects.map((subject, index) => (
              <div className="subject-row" key={subject}>
                <div className="subject-name">
                  <span className="subject-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{subject}</span>
                </div>

                <span className="max-marks">100</span>

                <div className="mark-input-wrap">
                  <input
                    aria-label={`${subject} marks`}
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    placeholder="—"
                    value={marks[index]}
                    onChange={(e) =>
                      updateMark(index, e.target.value)
                    }
                  />

                  <span>/100</span>
                </div>
              </div>
            ))}
          </div>

          {/* Grading information */}
          <div className="grading-note">
            <span className="info-icon">i</span>

            <span>
              Passing criteria: at least 33/100 in every
              subject. Grades: 50% C, 75% B, 90% A and
              100% A+. Below 50%: No Grade.
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="error-message" role="alert">
              <span>!</span>
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="actions">
            <button
              className="primary-button"
              onClick={checkResult}
              type="button"
            >
              Calculate Result <span>→</span>
            </button>

            <button
              className="reset-button"
              onClick={resetForm}
              type="button"
            >
              ↻ Reset
            </button>
          </div>
        </div>

        {/* Grade report */}
        <aside className="result-card">
          <div className="result-top">
            <div>
              <span className="step-label">YOUR SUMMARY</span>
              <h2>Grade Report</h2>
            </div>

            <span className="report-icon">▤</span>
          </div>

          {!result ? (
            <div className="empty-state">
              <div className="empty-illustration">
                <div className="paper-icon">
                  <span />
                  <span />
                  <span />
                  <b>?</b>
                </div>
              </div>

              <h3>Awaiting Your Results</h3>

              <p>
                Fill in the student information and marks.
                Your detailed grade report will appear here.
              </p>

              <div className="empty-tip">
                <span>✦</span>
                Your academic snapshot, simplified.
              </div>
            </div>
          ) : (
            <div className="report-content">
              <div
                className={`status-pill ${
                  result.status === "PASS" ? "pass" : "fail"
                }`}
              >
                <span>●</span> {result.status}
              </div>

              <p className="student-caption">STUDENT</p>

              <h3 className="student-result-name">
                {result.name}
              </h3>

              <p className="roll-caption">
                Roll No: {result.roll}
              </p>

              <div className="grade-display">
                <span className="grade-caption">
                  FINAL GRADE
                </span>

                <strong>{result.grade}</strong>

                <span className="grade-percent">
                  {result.percentage.toFixed(2)}%
                </span>
              </div>

              <div className="stat-grid">
                <div className="stat-box">
                  <span>TOTAL MARKS</span>

                  <strong>
                    {result.total}
                    <small> / 500</small>
                  </strong>
                </div>

                <div className="stat-box">
                  <span>SUBJECTS</span>

                  <strong>
                    5<small> / 5</small>
                  </strong>
                </div>
              </div>

              <div className="report-subjects">
                <h4>SUBJECT BREAKDOWN</h4>

                {subjects.map((subject, index) => (
                  <div
                    className="report-subject"
                    key={subject}
                  >
                    <span>{subject}</span>

                    <div className="mini-track">
                      <div
                        className="mini-fill"
                        style={{
                          width: `${result.marks[index]}%`,
                        }}
                      />
                    </div>

                    <strong>{result.marks[index]}</strong>
                  </div>
                ))}
              </div>

              <button
                className="print-button"
                onClick={() => window.print()}
                type="button"
              >
                Print Grade Report ↗
              </button>
            </div>
          )}

          <div className="result-footer">
            <span>GRADECHECK v1.0</span>
            <span>MADE FOR LEARNING ✦</span>
          </div>
        </aside>
      </section>

      {/* Footer */}
      <footer className="page-footer">
        <span>© 2026 GradeCheck</span>
        <span>ACADEMIC PERFORMANCE, MADE SIMPLE.</span>
      </footer>
    </main>
  );
}