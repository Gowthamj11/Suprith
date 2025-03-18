document.addEventListener("DOMContentLoaded", function () {
    const projectList = document.getElementById("project-list");
    const projectForm = document.getElementById("project-form");
    const projectNameInput = document.getElementById("project-name");
    const projectStatusInput = document.getElementById("project-status");

    const API_URL = "http://localhost:3000/projects"; // Backend API URL

    // Fetch and Display Projects
    async function fetchProjects() {
        try {
            const response = await fetch(API_URL);
            const projects = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    }

    // Render Projects in Table
    function renderProjects(projects) {
        projectList.innerHTML = "";
        projects.forEach((project, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="text" value="${project.name}" disabled></td>
                <td><input type="text" value="${project.status}" disabled></td>
                <td>
                    <button onclick="enableEdit(${index}, this)">Edit</button>
                    <button onclick="deleteProject(${index})">Delete</button>
                </td>
            `;
            projectList.appendChild(row);
        });
    }

    // Enable Edit Mode
    window.enableEdit = async function (index, button) {
        let row = button.parentElement.parentElement;
        let inputs = row.querySelectorAll("input");
        if (button.textContent === "Edit") {
            inputs.forEach(input => input.removeAttribute("disabled"));
            button.textContent = "Save";
        } else {
            const updatedProject = {
                name: inputs[0].value,
                status: inputs[1].value
            };

            try {
                await fetch(`${API_URL}/${index}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedProject)
                });
                fetchProjects();
            } catch (error) {
                console.error("Error updating project:", error);
            }

            inputs.forEach(input => input.setAttribute("disabled", true));
            button.textContent = "Edit";
        }
    };

    // Delete a Project
    window.deleteProject = async function (index) {
        try {
            await fetch(`${API_URL}/${index}`, { method: "DELETE" });
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    // Add a New Project
    projectForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const newProject = {
            name: projectNameInput.value.trim(),
            status: projectStatusInput.value.trim()
        };

        if (newProject.name && newProject.status) {
            try {
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newProject)
                });
                fetchProjects();
                projectForm.reset();
            } catch (error) {
                console.error("Error adding project:", error);
            }
        }
    });

    // Load Projects When Page Opens
    fetchProjects();
});