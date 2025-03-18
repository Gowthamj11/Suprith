const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 3000;
const DATA_FILE = "projects.json";

app.use(cors());
app.use(express.json());

// Read projects.json
function readProjects() {
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
}

// Write to projects.json
function writeProjects(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET: Fetch Projects
app.get("/projects", (req, res) => {
    res.json(readProjects());
});

// POST: Add New Project
app.post("/projects", (req, res) => {
    const projects = readProjects();
    projects.push(req.body);
    writeProjects(projects);
    res.status(201).json({ message: "Project added!" });
});

// PUT: Update a Project
app.put("/projects/:index", (req, res) => {
    const projects = readProjects();
    projects[req.params.index] = req.body;
    writeProjects(projects);
    res.json({ message: "Project updated!" });
});

// DELETE: Remove a Project
app.delete("/projects/:index", (req, res) => {
    const projects = readProjects();
    projects.splice(req.params.index, 1);
    writeProjects(projects);
    res.json({ message: "Project deleted!" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));