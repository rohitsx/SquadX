// Supabase client setup
const { createClient } = supabase;
const supabaseUrl = "https://idupbbgpqzfegimqziuq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkdXBiYmdwcXpmZWdpbXF6aXVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjIxMjMwMiwiZXhwIjoyMDQxNzg4MzAyfQ._vTsDRVZMGIOE82zHdULcq1gxyMAdDxypOg2eZctQQY";
const _supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("register-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const username = form.querySelector("#username").value;
    const email = form.querySelector("#email").value;
    const dob = form.querySelector("#dob").value;
    const password = form.querySelector("#password").value;

    console.log("Form values:");
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Date of Birth:", dob);
    console.log("Password:", password);

    try {
      // Register user
      const { data: user, error: signUpError } = await _supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        console.error("Sign-up Error:", signUpError.message);
        alert(`Sign-up Error: ${signUpError.message}`);
        return;
      }

      console.log("Sign-up successful:", user);

      // Insert additional user data into `users` table
      const { data: insertData, error: insertError } = await _supabase
        .from("users")
        .insert([
          {
            id: user.user.id,
            username: username,
            email: email,
            dob: dob,
            created_at: new Date(),
          },
        ]);

      if (insertError) {
        console.error("Insert Error:", insertError.message);
        alert(`Insert Error: ${insertError.message}`);
        return;
      }

      console.log("User registered and data saved:", insertData);
      alert(
        "Registration successful! Please check your email for a confirmation link."
      );
      // Redirect to login page after registration
      window.location.href = "/login.html";
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  });
});
