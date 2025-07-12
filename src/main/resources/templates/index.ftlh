<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <h1>Employee Directory</h1>
    <button onclick="showAddForm()">+ Add Employee</button>
    <input type="search" id="searchInput" placeholder="Search by name...">

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
    <script src="/js/data.js"></script>
    <script src="/js/main.js"></script>
</body>
</html>
