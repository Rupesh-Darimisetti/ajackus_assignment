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
  <div class="sort">
        <label for="sorting">Sort</label>
        <select id="sorting">
            <option value="#">-Select-</option>
            <option value="firstName">first Name</option>
            <option value="department">Department</option>
            <option value="email">Email</option>
        </select>
    </div>
    <div id="form-container" style="display: none;"></div>
    <div id="employeeList" class="employee-grid"></div>
  
   
    <footer>
    &copy 2025 Employee Directory App. All rights reserved.
    </footer>
    <script src="static/js/data.js"></script>
    <script src="/static/js/main.js"></script>
    <script>
         window.employeeData = employees;
    </script>
</body>
</html>
