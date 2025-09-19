const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const xlsx = require('xlsx');

async function parse(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    const buffer = fs.readFileSync(filePath);

    if (extension === '.pdf') {
        return parsePdf(buffer);
    } else if (extension === '.docx') {
        return parseDocx(buffer);
    } else if (extension === '.xlsx') {
        return parseXlsx(buffer);
    } else {
        throw new Error('Unsupported file type');
    }
}

async function parsePdf(buffer) {
    const data = await pdf(buffer);
    return extractInfoFromText(data.text);
}

async function parseDocx(buffer) {
    const data = await mammoth.extractRawText({ buffer });
    return extractInfoFromText(data.value);
}

function parseXlsx(buffer) {
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(worksheet);
}

function extractInfoFromText(text) {
    const info = {};

    // Naive extraction logic using regex
    // This will need to be improved for real-world CVs
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;

    const emailMatch = text.match(emailRegex);
    if (emailMatch) {
        info.email = emailMatch[0];
    }

    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) {
        info.phone = phoneMatch[0];
    }

    // Name is often at the beginning
    const lines = text.split('\n');
    if (lines.length > 0) {
        info.name = lines[0].trim();
    }

    // This is very simplified. Real-world extraction is much harder.
    info.skills = extractSkills(text);
    info.experience = extractSection(text, 'Experience');
    info.company = extractSection(text, 'Company');


    return info;
}

function extractSkills(text) {
    const skillsKeywords = ['Skills', 'Technical Skills', 'Core Competencies'];
    let skillsSection = '';
    for (const keyword of skillsKeywords) {
        const regex = new RegExp(keyword, 'i');
        const match = text.match(regex);
        if (match) {
            skillsSection = text.substring(match.index);
            break;
        }
    }

    if (skillsSection) {
        const lines = skillsSection.split('\n').slice(1); // remove the "Skills" line
        const skills = lines.map(line => line.trim()).filter(line => line.length > 0);
        if (skills.length > 0) {
            return skills.slice(0, 5); // return first 5 skills
        }
    }
    return [];
}

function extractSection(text, sectionTitle) {
    const regex = new RegExp(`^${sectionTitle}`, 'im');
    const match = text.match(regex);

    if (match) {
        let sectionText = text.substring(match.index + match[0].length);
        const nextSectionMatch = sectionText.match(/^\w+/m); // find next heading
        if (nextSectionMatch) {
            sectionText = sectionText.substring(0, nextSectionMatch.index);
        }
        return sectionText.trim();
    }
    return 'Not found';
}


module.exports = {
    parse
};
