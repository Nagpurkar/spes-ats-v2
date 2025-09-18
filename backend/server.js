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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- API Endpoints ---

// Single CV Upload (Word/PDF)
app.post('/upload-cv', upload.single('cv'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'CV uploaded successfully!',
    file: req.file
  });
});

// Paste CV Text
app.post('/paste-cv', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).send('No text provided.');
  }
  // For now, we'll just send back the text.
  // In the future, this would be saved or processed.
  res.send({
    message: 'Pasted CV text received!',
    text: text
  });
});

// Bulk Upload Excel File
app.post('/upload-excel', upload.single('excel'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({
    message: 'Excel file uploaded successfully!',
    file: req.file
  });
});


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
