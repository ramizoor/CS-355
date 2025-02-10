import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

const app: Express = express();
const port = 3000;

// Route to handle file reading
app.get("/file", (req: Request, res: Response) => {
    // Default to "data.txt" if no file name is provided in the query parameter
    const fileName = (req.query.file as string) || "data.txt";

    const filePath = path.join(__dirname, fileName); // Resolve the file path

    // Read the file asynchronously
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                return res.status(404).send("File not found.");
            }
            return res.status(500).send("Error reading file.");
        }

        // Send the file content as the response
        res.type("text/plain").send(data);
    });
});

// Default route
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server is running. Use /file or /file?file=<filename> to read a file.");
});

// Start the server
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
