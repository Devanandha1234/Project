function showSignup() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signupForm").style.display = "block";
}


function showLogin() {
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}


// CREATE ACCOUNT
document.querySelector("#signupForm form").addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("movieUser", JSON.stringify(user));

    alert("Account created successfully! ✅");

    document.getElementById("signupFormElement").reset();

    showLogin();
});


// LOGIN
document.querySelector("#loginForm form").addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser =
        JSON.parse(localStorage.getItem("movieUser"));

    if (!savedUser) {

        alert("Please create an account first.");
        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        alert("Login successful! 🎬");

        document.getElementById("authSection").style.display = "none";

        document.getElementById("movieSection").style.display = "block";

        showHome();

    } else {

        alert("Invalid email or password ❌");
    }
});


// HOME
function showHome() {
    document.getElementById("feedbackSection").style.display = "none";
    document.querySelector(".search-box").style.display = "flex";
    document.getElementById("movieContainer").style.display = "grid";

    movieContainer.innerHTML = "";
    movieInput.value = "";
}


// 💬 FEEDBACK
function showFeedback() {

    document.getElementById("feedbackSection").style.display = "block";

    document.querySelector(".search-box").style.display = "none";

    document.getElementById("movieContainer").style.display = "none";
}