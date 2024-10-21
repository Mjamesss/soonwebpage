// Set the date we're counting down to
const countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

// Update the countdown every second
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is over, write some text
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "EXPIRED";
    }
});

// Form submission
const form = document.getElementById('subscribe-form');
const messageBox = document.getElementById('message');

form.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevent the form from reloading the page

    const name = document.getElementById('name').value;

    try {
        const response = await fetch('http://localhost:5000/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        });

        if (response.ok) {
            const result = await response.json();
            showMessage(result.message || 'Thank you for subscribing!', 'success');  // Show success message
            document.getElementById("name").value = ''; // Clear input field
        } else {
            showMessage('Failed to subscribe. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('There was an error connecting to the server.', 'error');
    }
});

// Function to show messages
function showMessage(message, type) {
    messageBox.className = `message ${type}`; // Add type classes (success/error)
    messageBox.textContent = message; // Set message text
    messageBox.style.display = 'block'; // Show the message box

    // Optional: hide the message after a few seconds
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}
