<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/styles.css">
</head>
<body>
    <div class="heading">
        <h1>Employee Directory</h1>
        <input type="search" id="searchInput" placeholder="Search by name...">
        <button onClick="filterData()">Filter</button>
    </div>
    <button onclick="showAddForm()">+ Add Employee</button>

    <div id="form-container" style="display: none;"></div>
    <div id="employeeList" class="employee-grid"></div>
    <div id="employee-list-container">
        <#list employees as employee>
            <div class="employee-card" data-employee-id="${employee.id}">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>ID: ${employee.id}</p>
                <p>Email: ${employee.email}</p>
                <p>Department: ${employee.department}</p>
                <p>Role: ${employee.role}</p>
                <button class="edit-btn" data-id="${employee.id}">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </div>
        </#list>
    </div>
    <footer>
    &copy 2025 Employee Directory App. All rights reserved.
    </footer>
    <script src="/js/data.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>
