const API_URL = "/api";


/* ==========================================
   SHOW MESSAGE
========================================== */

function showMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className = `message ${type}`;

}


/* ==========================================
   PASSWORD TOGGLE
========================================== */

const togglePassword =
    document.getElementById("togglePassword");

const password =
    document.getElementById("password");


if (togglePassword && password) {

    togglePassword.addEventListener(
        "click",
        () => {

            const icon =
                togglePassword.querySelector("i");


            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                password.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }

        }
    );

}


/* ==========================================
   REGISTER PASSWORD STRENGTH
========================================== */

const passwordStrength =
    document.getElementById("passwordStrength");


if (password && passwordStrength) {

    password.addEventListener(
        "input",
        () => {

            const value =
                password.value;


            if (value.length === 0) {

                passwordStrength.textContent =
                    "Use at least 6 characters.";

                return;

            }


            if (value.length < 6) {

                passwordStrength.textContent =
                    "Password is too short.";

                return;

            }


            let score = 0;


            if (value.length >= 8) {
                score++;
            }

            if (/[A-Z]/.test(value)) {
                score++;
            }

            if (/[0-9]/.test(value)) {
                score++;
            }

            if (/[^A-Za-z0-9]/.test(value)) {
                score++;
            }


            if (score <= 1) {

                passwordStrength.textContent =
                    "Password strength: Weak";

            } else if (score <= 2) {

                passwordStrength.textContent =
                    "Password strength: Medium";

            } else {

                passwordStrength.textContent =
                    "Password strength: Strong";

            }

        }
    );

}


/* ==========================================
   REGISTER
========================================== */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
                document.getElementById("registerMessage");

            const button =
                document.getElementById("registerButton");


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const passwordValue =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            if (passwordValue !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            if (passwordValue.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;

            }


            button.disabled = true;

            button.textContent =
                "Creating Account...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/register`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                name,
                                email,
                                password: passwordValue
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok || !data.success) {

                    showMessage(
                        message,
                        data.message ||
                            "Registration failed.",
                        "error"
                    );

                    return;

                }


                showMessage(
                    message,
                    "Account created successfully. Redirecting to login...",
                    "success"
                );


                registerForm.reset();


                setTimeout(
                    () => {

                        window.location.href =
                            "login.html";

                    },
                    1500
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    "Unable to connect to the server.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.textContent =
                    "Create Account";

            }

        }
    );

}


/* ==========================================
   LOGIN
========================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const message =
                document.getElementById("loginMessage");

            const button =
                document.getElementById("loginButton");


            const email =
                document.getElementById("email").value.trim();

            const passwordValue =
                document.getElementById("password").value;


            button.disabled = true;

            button.textContent =
                "Signing In...";


            try {

                const response =
                    await fetch(
                        `${API_URL}/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email,
                                password: passwordValue
                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok || !data.success) {

                    showMessage(
                        message,
                        data.message ||
                            "Invalid email or password.",
                        "error"
                    );

                    return;

                }


                localStorage.setItem(
                    "guiderUser",
                    JSON.stringify(data.user)
                );


                showMessage(
                    message,
                    "Login successful. Redirecting...",
                    "success"
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "index.html";

                    },
                    1000
                );


            } catch (error) {

                console.error(error);

                showMessage(
                    message,
                    "Unable to connect to the server.",
                    "error"
                );

            } finally {

                button.disabled = false;

                button.textContent =
                    "Sign In";

            }

        }
    );

}


/* ==========================================
   FORGOT PASSWORD
========================================== */

const forgotPassword =
    document.getElementById("forgotPassword");


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            alert(
                "Password recovery will be added in a later step."
            );

        }
    );

}


/* ==========================================
   MOBILE MENU
========================================== */

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (menuButton && mobileMenu) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.toggle("show");

        }
    );

}


/* ==========================================
   NAVBAR SCROLL
========================================== */

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.querySelector(".navbar");

        if (!navbar) {
            return;
        }


        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);