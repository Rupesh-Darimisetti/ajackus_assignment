document.addEventListener("DOMContentLoaded", () => {

    const list = document.getElementById("employeeList");
    const formContainer = document.getElementById("form-container");
    const searchInput = document.getElementById("searchInput");

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
                <button onclick="editEmployee(${index})">Edit</button>
                <button onclick="deleteEmployee(${index})">Delete</button>
            `;
            list.appendChild(card);
        });
    }

    // use to edit empoyee data
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

    // used to save employee data
    window.saveEdit = (e, index) => {
        e.preventDefault();
        const form = e.target;
        const emp = {
            id: window.employeeData[index].id,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            role: form.role.value,
            department: form.department.value,
            email: form.email.value,
        };

        fetch(`/api/update/${emp.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emp),
        })
            .then(res => res.text())
            .then(msg => {
                console.log("Update success:", msg);
                window.employeeData[index] = emp;
                render(window.employeeData);
                cancelForm();
            })
            .catch(err => console.error("Update failed:", err));
    };

    // used to delete employee data
    window.deleteEmployee = (index) => {
        if (confirm("Delete this employee?")) {
            window.employeeData.splice(index, 1);
            render(window.employeeData);
            saveDataToServer();
        }
    };

    // new employee form UI
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

    // used to add new employee
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

    // cancel on close of form
    window.cancelForm = () => {
        formContainer.style.display = "none";
        formContainer.innerHTML = "";
    };

    // filrer data based on the option selected
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

    // adds data to js file
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
                e.firstName.toLowerCase().includes(query) ||
                e.role.toLowerCase().includes(query) ||
                e.department.toLowerCase().includes(query)
            );
            render(filtered);
        });
    }

    // render(window.employeeData);
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

    // sorting of data
    const sortingSelect = document.getElementById("sorting");

    if (sortingSelect) {
        sortingSelect.addEventListener("change", () => {
            const key = sortingSelect.value;
            if (!key) return;

            const sorted = [...window.employeeData].sort((a, b) => {
                const valA = a[key].toLowerCase();
                const valB = b[key].toLowerCase();
                return valA.localeCompare(valB);
            });

            render(sorted);
        });
    }

    // card range
    const cardRange = document.getElementById("cardRange");
    let currentRange = 10; // default
    let currentData = [];

    function render(data) {
        list.innerHTML = "";

        const limitedData = data.slice(0, currentRange);
        limitedData.forEach((emp, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
            <h3>${emp.firstName} ${emp.lastName}</h3>
            <p><strong>Role:</strong> ${emp.role}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Email:</strong> ${emp.email}</p>
            <button onclick="editEmployee(${index})">Edit</button>
            <button onclick="deleteEmployee(${index})">Delete</button>
        `;
            list.appendChild(card);
        });
    }

    // Handle range change
    cardRange.addEventListener("change", () => {
        currentRange = parseInt(cardRange.value, 10);
        render(window.employeeData);
    });

    const toggleFilterBtn = document.getElementById("toggleFilterBtn");
    const filterContainer = document.getElementById("filterContainer");

    toggleFilterBtn.addEventListener("click", () => {
        const isVisible = filterContainer.style.display === "block";
        filterContainer.style.display = isVisible ? "none" : "block";
        toggleFilterBtn.textContent = isVisible ? "Show Filters" : "Hide Filters";
    });

    const filterFirstName = document.getElementById("filterFirstName");
    const filterRole = document.getElementById("filterRole");
    const filterDepartment = document.getElementById("filterDepartment");

    window.applyFilter = () => {
        const nameQuery = filterFirstName.value.toLowerCase();
        const selectedRole = filterRole.value;
        const selectedDept = filterDepartment.value;

        const filtered = window.employeeData.filter(emp => {
            const nameMatch = emp.firstName.toLowerCase().includes(nameQuery);
            const roleMatch = selectedRole ? emp.role === selectedRole : true;
            const deptMatch = selectedDept ? emp.department === selectedDept : true;
            return nameMatch && roleMatch && deptMatch;
        });

        currentData = filtered;
        render(currentData);
    }

    window.resetData = () => {
        filterFirstName.value = '';
        filterDepartment.value = ''
        filterRole.value = '';
        render(window.employeeData);
    }
});
