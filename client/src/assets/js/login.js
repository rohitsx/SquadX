document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) {
    console.error("Form not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Debugging output
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      // Perform the sign-in request to Supabase
      const { data, error } = await window._supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign-in error:", error.message);
        alert("Sign-in failed: " + error.message);
      } else {
        console.log("Sign-in successful:", data);
        window.location.href = "dashboard.php";
      }
    } catch (err) {
      console.error("Unexpected error:", err.message);
      alert("An unexpected error occurred: " + err.message);
    }
  });
});
