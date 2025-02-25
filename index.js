// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3010;

app.use(express.json()); // Middleware to parse JSON

// API endpoint to fetch students above threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;

    // Validate input
    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ error: "Invalid threshold value. It must be a positive number." });
    }

    // Read student data from data.json
    const dataPath = path.join(__dirname, 'data.json');
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Failed to read student data." });
        }

        try {
            const students = JSON.parse(data);

            // Filter students based on threshold
            const filteredStudents = students.filter(student => student.total > threshold)
                                             .map(student => ({ name: student.name, total: student.total }));

            // Response format
            res.json({
                count: filteredStudents.length,
                students: filteredStudents
            });

        } catch (parseError) {
            res.status(500).json({ error: "Error parsing student data." });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



