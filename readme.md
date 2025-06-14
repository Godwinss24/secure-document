# 🔐 Secure Document Vault API

A backend API that allows users to upload and manage sensitive documents securely.  
This system stores documents using **Cloudinary**, ensuring scalability, redundancy, and reliability. It’s ideal for storing contracts, ID documents, and financial reports — especially when you need to avoid relying on traditional file-sharing services like Google Drive or Dropbox.

---

## 🚀 Features

- ✅ Upload and store documents via Cloudinary
- ✅ View list of uploaded documents
- ✅ Retrieve document download links
- ✅ Organize user documents in a structured format
- ✅ Ready for encryption and link expiration features in future

---

## 📦 Why Cloudinary?

While end-to-end encryption is not yet implemented, this system **uses Cloudinary as a secure and robust storage backend**. Cloudinary provides:

- 🔒 Secure access via signed URLs
- 🌍 Global CDN distribution
- ☁️ Auto-scaling, image optimization, and metadata support
- 📁 Redundant and reliable storage

Cloudinary ensures your uploaded files are **not publicly exposed** unless explicitly shared — making it a suitable temporary solution for sensitive file storage.

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **Cloudinary** (for secure file storage)
- **TypeScript** (optional, recommended)
- **Multer** (for file uploads)

---

## 📄 API Endpoints

### `POST /upload`
Upload a document to Cloudinary.
- **Request:** `multipart/form-data` with a file
- **Response:** JSON containing the Cloudinary URL

### `GET /documents`
Returns a list of uploaded documents (per user or global, depending on implementation).

### `GET /documents/:id`
Fetch metadata or access link for a specific document.

---

## ⚠️ Future Improvements

- 🔐 Add AES-256 encryption before upload
- ⏳ Generate expiring download links
- 🔓 Support one-time-access tokens
- 📅 Auto-delete expired or unused files

---

## 🧪 Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/secure-document-vault.git
