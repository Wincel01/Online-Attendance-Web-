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
  loginSection.querySelector("form").addEventListener
  
