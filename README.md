# Spes Recruiter ATS

This project is a simple Applicant Tracking System (ATS) for recruiters. It allows uploading CVs in various formats.

## Features

- **Single CV Upload**: Upload a single CV in Word or PDF format.
- **Paste CV Text**: Paste the text of a CV directly into a text area.
- **Bulk Excel Upload**: Upload an Excel file containing multiple candidates.

## Project Structure

The project is divided into two main parts:

- `frontend`: A React application built with Vite.
- `backend`: A Node.js application with an Express server.

## Getting Started

To get the project up and running, you will need to install the dependencies and run the servers for both the frontend and the backend.

### Prerequisites

- Node.js (v14 or later)
- npm

### Backend Setup

1.  Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Run the server:
    ```sh
    node server.js
    ```
    The backend server will start on `http://localhost:3001`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```
3.  Run the development server:
    ```sh
    npm run dev
    ```
    The frontend application will be available at `http://localhost:5173`.

## How to Use

1.  Open your browser and navigate to `http://localhost:5173`.
2.  You will see three options for uploading CVs.
3.  Use the respective forms to upload a single CV, paste CV text, or upload a bulk Excel file.
4.  Uploaded files will be saved in the `backend/uploads` directory.
