const PUBLIC_KEY = "n-w9r6fM21jo2BHes";
const SERVICE_ID = "service_uef4wgs";
const TEMPLATE_ID = "template_lalsfv1";

emailjs.init({
    publicKey: PUBLIC_KEY
});

const contactForm = document.getElementById("contactForm");
const status = document.getElementById("status");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
    )
    .then(function () {
        status.textContent = "Message sent successfully! ✅";
        contactForm.reset();
    })
    .catch(function (error) {
        console.error(error);
        status.textContent = "Failed to send message. ❌";
    });
});