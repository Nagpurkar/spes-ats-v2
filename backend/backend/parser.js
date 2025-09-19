const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');

const parseCv = async (buffer, mimeType) => {
  let text = '';
  if (mimeType === 'application/pdf') {
    const data = await pdf(buffer);
    text = data.text;
  } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || mimeType === 'application/msword') {
    const { value } = await mammoth.extractRawText({ buffer });
    text = value;
  }

  // Simplified parsing using regular expressions
  const name = text.match(/Name: (.+)/)?.[1] || 'N/A';
  const email = text.match(/Email: (.+)/)?.[1] || 'N/A';
  const phone = text.match(/Phone: (.+)/)?.[1] || 'N/A';
  const company = text.match(/Current Company: (.+)/)?.[1] || 'N/A';
  const skills = text.match(/Skills: (.+)/)?.[1] || 'N/A';
  const experience = text.match(/Experience: (.+)/)?.[1] || 'N/A';

  return { name, email, phone, company, skills, experience };
};

const parseExcel = (buffer) => {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(worksheet);
};

module.exports = {
  parseCv,
  parseExcel,
};
