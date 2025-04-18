document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");

  if (!form) {
    console.error('Form with id "userForm" not found!');
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    const fields = [
      {
        id: "full-name",
        errorId: "usernameError",
        message: "Full name must be at least 3 characters.",
        minLength: 3,
      },
      {
        id: "phone-number",
        errorId: "phoneError",
        pattern: /^\d{10,15}$/,
        message: "Phone number must be 10 to 15 digits.",
      },
      {
        id: "country",
        errorId: "countryError",
        message: "Please select your country.",
        isSelect: true,
      },
      { id: "state", errorId: "stateError", message: "State is required." },
      {
        id: "local-gov",
        errorId: "lgError",
        message: "Local government is required.",
      },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      const error = document.getElementById(field.errorId);

      if (!input || !error) return;

      if (field.isSelect && input.value === "") {
        error.textContent = field.message;
        valid = false;
      } else if (field.pattern && !field.pattern.test(input.value)) {
        error.textContent = field.message;
        valid = false;
      } else if (
        field.minLength &&
        input.value.trim().length < field.minLength
      ) {
        error.textContent = field.message;
        valid = false;
      } else if (!input.value.trim()) {
        error.textContent = field.message;
        valid = false;
      } else {
        error.textContent = "";
      }
    });

    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && email.value && !emailPattern.test(email.value)) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
    } else if (emailError) {
      emailError.textContent = "";
    }

    if (valid) {
      window.location.href = "../pages/home.html";
    }
  });
});
