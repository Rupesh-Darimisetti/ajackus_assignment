document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("employeeList");
    const formContainer = document.getElementById("form-container");
    const searchInput = document.getElementById("searchInput");
    fetch('/api/employees')
        .then(res => res.json())
        .then(data => {
            window.employeeData = data;
            render(window.employeeData);
        })
        .catch(err => {
            console.error("Failed to load employee data:", err);
            window.employeeData = []; // fallback
        });
    function render(data) {
        list.innerHTML = "";
        data.forEach((emp, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${emp.firstName} ${emp.lastName}</h3>
                <p><strong>Role:</strong> ${emp.role}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
                <p><strong>Email:</strong> ${emp.email}</p>
                <button onclicf="editEmployee(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            `;
            list.appendChild(card);
        });
    }
    window.editEmployee = (index) => {
        const emp = window.employeeData[index];
        formContainer.innerHTML = `
            <h3>Edit Employee</h3>
            <form onsubmit="saveEdit(event, ${index})">
                <input name="firstName" value="${emp.firstName}" required><br>
                <input name="lastName" value="${emp.lastName}" required><br>
                <input name="role" value="${emp.role}" required><br>
                <input name="department" value="${emp.department}" required><br>
                <input name="email" value="${emp.email}" required><br>
                <button type="submit">Save</button>
                <button type="button" onclick="cancelForm()">Cancel</button>
            </form>
        `;
        formContainer.style.display = "block";
    };

    window.saveEdit = (e, index) => {
        e.preventDefault();
        const form = e.target;
        const emp = window.employeeData[index];
        emp.name = form.name.value;
        emp.role = form.role.value;
        emp.department = form.department.value;
        emp.email = form.email.value;
        render(window.employeeData);
        cancelForm();
        saveDataToServer();
    };

    window.deleteEmployee = (index) => {
        if (confirm("Delete this employee?")) {
            window.employeeData.splice(index, 1);
            render(window.employeeData);
            saveDataToServer();
        }
    };

    window.showAddForm = () => {
        formContainer.innerHTML = `
            <h3>Add Employee</h3>
            <form onsubmit="addEmployee(event)">
                <input name="firstName" placeholder="First Name" required><br>
                <input name="lastName" placeholder="Last Name" required><br>
                <input name="role" placeholder="Role" required><br>
                <input name="department" placeholder="Department" required><br>
                <input name="email" placeholder="Email" required><br>
                <button type="submit">Add</button>
                <button type="button" onclick="cancelForm()">Cancel</button>
            </form>
        `;
        formContainer.style.display = "block";
    };

    window.addEmployee = (e) => {
        e.preventDefault();
        const form = e.target;
        const newEmp = {
            id: (Date.now()).toString(),
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            role: form.role.value,
            department: form.department.value,
            email: form.email.value,
        };
        window.employeeData.push(newEmp);
        render(window.employeeData);
        cancelForm();
        saveDataToServer();
    };

    window.cancelForm = () => {
        formContainer.style.display = "none";
        formContainer.innerHTML = "";
    };
    window.filterData = () => {
        formContainer.innerHTML = `
            <h3>Add Employee</h3>
            <form onsubmit="addEmployee(event)">
                <input name="firstName" placeholder="First Name" required><br>
                <input name="lastName" placeholder="Last Name" required><br>
                <input name="role" placeholder="Role" required><br>
                <input name="department" placeholder="Department" required><br>
                <input name="email" placeholder="Email" required><br>
                <button type="submit">Add</button>
                <button type="button" onclick="cancelForm()">Cancel</button>
            </form>
        `;
    }
    window.saveDataToServer = () => {
        console.log("Simulating POST to /api/save...");
        fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(window.employeeData)
        })
            .then(res => res.text())
            .then(msg => console.log("Server says:", msg))
            .catch(err => console.error("Failed to save:", err));
    };

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const filtered = window.employeeData.filter(e =>
                e.name.toLowerCase().includes(query)
            );
            render(filtered);
        });
    }

    render(window.employeeData);
});
