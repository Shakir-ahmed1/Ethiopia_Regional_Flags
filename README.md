### README.md

# Ethiopian Regional Flags API

This is a simple Node.js and Express-based API for serving flag images of Ethiopian regions. It allows clients to fetch a list of Ethiopian regions or request flag images, optionally resized to their preferred dimensions.

## Features

- **List Regions**: Retrieve all Ethiopian regions with their codes and labels.
- **Serve Flags**: Get the flag for a specific region by its code.
- **Dynamic Resizing**: Request flags resized to specific dimensions using query parameters.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- npm (Node Package Manager)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Shakir-ahmed1/Ethiopia_Regional_Flags.git
   cd Ethiopia_Regional_Flags
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Ensure the `assets` folder contains flag images with filenames corresponding to the region codes (e.g., `ADD.png`, `AMH.png`).

## Usage

### Run the Server

Start the server:

```bash
node server.js
```

The server will run at `http://localhost:3000`.

### API Endpoints

1. **Get All Regions**  
   **Endpoint:** `GET /api/flags`  
   **Response:** JSON array of all regions with `code` and `label`.

   ```json
   [
     { "code": "TIG", "label": "Tigray" },
     { "code": "AMH", "label": "Amhara" },
     ...
   ]
   ```

2. **Get a Region's Flag**  
   **Endpoint:** `GET /api/flags/:code`  
   **Path Parameter:** `:code` (Region code, e.g., `TIG`)  
   **Query Parameters (Optional):**
   - `width` (number) – Desired width of the flag.
   - `height` (number) – Desired height of the flag.  
     **Example Requests:**
   - Fetch original flag:
     ```bash
     curl http://localhost:3000/api/flags/TIG
     ```
   - Fetch resized flag (300x150):
     ```bash
     curl "http://localhost:3000/api/flags/TIG?width=300&height=150"
     ```
     **Response:** Returns the flag image in PNG format.

### Example Directory Structure

```
project-folder/
  ├── assets/
  │     ├── TIG.png
  │     ├── AMH.png
  │     ├── ...
  ├── server.js
  ├── package.json
  ├── README.md
```

### Notes

- Flags must be placed in the `assets/` folder, and their filenames should match the region codes.
- Images are dynamically resized if the `width` and/or `height` query parameters are provided. Original images are served if no dimensions are specified.

## Dependencies

- [Express](https://expressjs.com/) - Web framework for Node.js
- [Sharp](https://sharp.pixelplumbing.com/) - High-performance image processing library

## License

This project is licensed under the MIT License. Feel free to use and modify it as needed.

---

Happy coding! 🎉
