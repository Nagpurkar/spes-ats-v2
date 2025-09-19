const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Multer Setup ---
const { parseCv, parseExcel } = require('./parser');

// In-memory data store
let applicants = [];

// --- Multer Setup for in-memory storage ---
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- API Endpoints ---

// Single CV Upload (Word/PDF)
app.post('/upload-cv', upload.single('cv'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const applicant = await parseCv(req.file.buffer, req.file.mimetype);
    applicants.push(applicant);
    res.send({
      message: 'CV parsed and data stored successfully!',
      applicant: applicant
    });
  } catch (error) {
    res.status(500).send('Error parsing CV.');
  }
});

// Paste CV Text
app.post('/paste-cv', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('No text provided.');
  }

  // Simplified parsing for pasted text
  const name = text.match(/Name: (.+)/)?.[1] || 'N/A';
  const email = text.match(/Email: (.+)/)?.[1] || 'N/A';
  const phone = text.match(/Phone: (.+)/)?.[1] || 'N/A';
  const company = text.match(/Current Company: (.+)/)?.[1] || 'N/A';
  const skills = text.match(/Skills: (.+)/)?.[1] || 'N/A';
  const experience = text.match(/Experience: (.+)/)?.[1] || 'N/A';

  const applicant = { name, email, phone, company, skills, experience };
  applicants.push(applicant);

  res.send({
    message: 'Pasted CV parsed and data stored successfully!',
    applicant: applicant
  });
});

// Bulk Upload Excel File
app.post('/upload-excel', upload.single('excel'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  try {
    const parsedApplicants = parseExcel(req.file.buffer);
    applicants = applicants.concat(parsedApplicants);
    res.send({
      message: 'Excel file parsed and data stored successfully!',
      applicants: parsedApplicants
    });
  } catch (error) {
    res.status(500).send('Error parsing Excel file.');
  }
});

// Get all applicants
app.get('/applicants', (req, res) => {
  res.json(applicants);
});


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
