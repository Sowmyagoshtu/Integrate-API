document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const alertBox = document.getElementById("alert");
    const usersSection = document.getElementById("users");
    const fetchUsersButton = document.getElementById("fetchUsersButton");

    // Load stored user data from localStorage
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Log the form data to the console
        console.log(data);

        // Display the form data in an alert
        alert(`Form Data:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nGender: ${data.gender}\nDOB: ${data.dob}\nAttending: ${data.attending}\nComments: ${data.comments}`);

        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                // Store the submitted data locally
                storedUsers.push(data);
                localStorage.setItem("users", JSON.stringify(storedUsers));

                alertBox.textContent = "Form submitted successfully!";
                alertBox.classList.add("success");
                alertBox.style.display = "block";
                setTimeout(() => {
                    alertBox.style.display = "none";
                }, 3000);
                form.reset();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (error) {
            alertBox.textContent = "Error submitting form.";
            alertBox.classList.add("error");
            alertBox.style.display = "block";
            setTimeout(() => {
                alertBox.style.display = "none";
            }, 3000);
        }
    });

    fetchUsersButton.addEventListener("click", async () => {
        usersSection.innerHTML = ""; // Clear any previous content

        // Display stored user data
        storedUsers.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.classList.add("user");
            userDiv.innerHTML = `
                <p><strong>Name:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Gender:</strong> ${user.gender}</p>
                <p><strong>DOB:</strong> ${user.dob}</p>
                <p><strong>Attending:</strong> ${user.attending}</p>
                <p><strong>Comments:</strong> ${user.comments}</p>
            `;
            usersSection.appendChild(userDiv);
        });

        // Fetch and display user data from the API
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();
            users.forEach(user => {
                const userDiv = document.createElement("div");
                userDiv.classList.add("user");
                userDiv.innerHTML = `
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Phone:</strong> ${user.phone}</p>
                `;
                usersSection.appendChild(userDiv);
            });
        } catch (error) {
            usersSection.textContent = "Error fetching users data.";
        }
    });
});
