<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="heading">
        <h1>Employee Directory</h1>
        <input type="search" id="searchInput" placeholder="Search by name...">
        <button id="toggleFilterBtn">Show Filters</button>
    </div>

    <div id="filterContainer" class="filters" style="display: none;">
        <label for="filterFirstName">First Name:</label>
        <input type="text" id="filterFirstName" placeholder="Enter first name">
        <label for="filterRole">Role:</label>
        <input type="text" id="filterRole" placeholder="Enter Role">
        <label for="filterDepartment">Department:</label>
        <input type="text" id="filterDepartment" placeholder="Enter Department">
        <button onClick="applyFilter()">Apply</button>
        <button onclick="resetData()">Reset</button>
    </div>

    <div class="row">
        <div class="display row">
            <div class="sort">
                <label for="sorting">Sort</label>
                <select id="sorting">
                    <option value="">-Select-</option>
                    <option value="firstName">first Name</option>
                    <option value="department">Department</option>
                    <option value="email">Email</option>
                </select>
            </div>
            <div class="range">
                <label for="cardRange">Show</label>
                <select id="cardRange">
                    <option value="">All</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="100">100</option>
                </select>
                <span>entries</span>
            </div>
        </div>
        <button onclick="showAddForm()">+ Add Employee</button>
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
