import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const subjects = ['Math', 'Science', 'English'];

const calculateGrade = (marks) => {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B';
    if (marks >= 70) return 'C';
    if (marks >= 60) return 'D';
    if (marks >= 35) return 'E';
    return 'F';
};

const ReportForm = () => {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [marks, setMarks] = useState({ Math: '', Science: '', English: '' });
    const [submitted, setSubmitted] = useState(false);
    const [reportData, setReportData] = useState(null);

    const handleMarksChange = (subject) => (e) => {
        setMarks({ ...marks, [subject]: e.target.value });
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let total = 0;
        let allPassed = true;
        const grades = {};
        subjects.forEach((subject) => {
            const mark = parseInt(marks[subject], 10);
            if (isNaN(mark) || mark < 0 || mark > 100) {
                grades[subject] = 'Invalid';
                allPassed = false;
            } else {
                grades[subject] = calculateGrade(mark);
                if (mark < 35) allPassed = false;
                total += mark;
            }
        });
        const percentage = total / subjects.length;
        setReportData({
            studentName,
            studentId,
            marks,
            grades,
            percentage: isNaN(percentage) ? 'N/A' : percentage.toFixed(2),
            passed: allPassed && Object.values(marks).every(m => m !== ''),
        });
        setStudentName('');
        setStudentId('');
        setMarks({ Math: '', Science: '', English: '' });
        setSubmitted(true);
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setSubmitted(false);
    };

    return (
        <div className="center-container">
            <form className="form-section" onSubmit={handleSubmit}>
                <h2 style={{ color: '#235390', marginBottom: 24 }}>Generate Student Report</h2>
                <label htmlFor="studentName">Student Name:</label>
                <input
                    id="studentName"
                    type="text"
                    value={studentName}
                    onChange={handleInputChange(setStudentName)}
                    required
                />
                <label htmlFor="studentId">Student ID:</label>
                <input
                    id="studentId"
                    type="text"
                    value={studentId}
                    onChange={handleInputChange(setStudentId)}
                    required
                />
                {subjects.map((subject) => (
                    <div key={subject}>
                        <label htmlFor={subject}>{subject} Marks:</label>
                        <input
                            id={subject}
                            type="number"
                            min="0"
                            max="100"
                            value={marks[subject]}
                            onChange={handleMarksChange(subject)}
                            required
                        />
                    </div>
                ))}
                <button type="submit">Generate Report</button>
                {submitted && <div className="success-message">Report generated successfully!</div>}
                <div style={{ marginTop: '10px' }}>
                    <Link to="/" style={{ color: '#235390', textDecoration: 'underline' }}>Back to Home</Link>
                </div>
            </form>
            {reportData && submitted && (
                <div className="report-card">
                    <h3>Generated Report</h3>
                    <p><strong>Student Name:</strong> {reportData.studentName}</p>
                    <p><strong>Student ID:</strong> {reportData.studentId}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject}>
                                    <td>{subject}</td>
                                    <td>{reportData.marks[subject]}</td>
                                    <td>{reportData.grades[subject]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Percentage:</strong> {reportData.percentage}%</p>
                    <p>
                        <strong>Status:</strong>{' '}
                        {reportData.passed ? (
                            <span className="status-pass">Passed</span>
                        ) : (
                            <span className="status-fail">Not Passed</span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ReportForm;