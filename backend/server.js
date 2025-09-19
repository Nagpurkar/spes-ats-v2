const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const parser = require('./parser2');

const app = express();
const port = 3000;

app.use(cors());

// In-memory storage for applicants
const applicants = [];

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Endpoint for file upload
app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const parsedData = await parser.parse(req.file.path);
        applicants.push(parsedData);
        res.status(200).json({ message: 'File uploaded and parsed successfully.', data: parsedData });
    } catch (error) {
        console.error('Error parsing file:', error);
        res.status(500).send('Error parsing file.');
    }
});

// Endpoint to get all applicants
app.get('/api/applicants', (req, res) => {
    res.json(applicants);
});

// Serve the frontend
app.use(express.static(path.join(__dirname, '../frontend')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
