document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("login-section");
  const registerSection = document.getElementById("register-section");
  const attendanceSection = document.getElementById("attendance-section");
  const teacherControls = document.getElementById("teacher-controls");
  const studentControls = document.getElementById("student-controls");
  const userRole = document.getElementById("user-role");
  const userName = document.getElementById("user-name");
  const studentList = document.getElementById("student-list");
  const markAbsentBtn = document.getElementById("mark-absent");

  // Load users and attendance from localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const attendance = JSON.parse(localStorage.getItem("attendance")) || [];

  // Show login section
  function showLogin() {
    loginSection.style.display = "block";
    registerSection.style.display = "none";
    attendanceSection.style.display = "none";
  }

  // Show registration section
  function showRegister() {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    attendanceSection.style.display = "none";
  }

  // Show attendance section after login
  function showAttendance(username, role) {
    loginSection.style.display = "none";
    registerSection.style.display = "none";
    attendanceSection.style.display = "block";
    userRole.textContent = role.charAt(0).toUpperCase() + role.slice(1);
    userName.textContent = username;

    if (role === "teacher") {
      teacherControls.style.display = "block";
      studentControls.style.display = "none";
      populateStudentList();
    } else {
      teacherControls.style.display = "none";
      studentControls.style.display = "block";
    }
  }

  // Populate the student list for the teacher to select from
  function populateStudentList() {
    const students = users.filter((user) => user.role === "student");
    studentList.innerHTML = students.map((s) => `<option value="${s.username}">${s.username}</option>`).join("");
  }

  // Handle login form submission
  loginSection.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const user = users.find((u) => u.username === username && u.password === password && u.role === role);

    if (user) {
      showAttendance(username, role);
    } else {
      alert("Invalid credentials!");
    }
  });

  // Handle registration form submission
  registerSection.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const role = document.getElementById("reg-role").value;

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      alert("Username already exists! Please choose a different one.");
    } else {
      // Add the new user to the users array
      users.push({ username, password, role });
      localStorage.setItem("users", JSON.stringify(users)); // Save users to localStorage
      alert("Registration successful! You can now log in.");
      showLogin(); // Switch to login screen after registration
    }
  });

  // Mark attendance for students
  markAbsentBtn.addEventListener("click", () => {
    const student = studentList.value;
    const reason = document.getElementById("reason").value.trim();

    if (student && reason) {
      attendance.push({ student, reason });
      localStorage.setItem("attendance", JSON.stringify(attendance)); // Save attendance to localStorage
      alert(`${student} marked absent for: ${reason}`);
    } else {
      alert("Please select a student and provide a reason.");
    }
  });

  // Logout function
  function logout() {
    showLogin();
  }

  // Initial page load show login screen
  showLogin();
});
      
