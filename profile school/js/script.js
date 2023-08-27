document.addEventListener('DOMContentLoaded', function () {
    let userName = localStorage.getItem('userName');

    if (!userName) {
        userName = prompt('Please enter your name:');
        localStorage.setItem('userName', userName);
    }

    const nameSpan = document.getElementById('name');
    nameSpan.textContent = userName;

    const messageForm = document.getElementById('messageForm');
    const messageDisplay = document.getElementById('messageDisplay');

    // Load existing messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(messageData => {
        const messageElement = createMessageElement(messageData);
        messageDisplay.appendChild(messageElement);
    });

    messageForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(messageForm);
        const userEmail = formData.get('userEmail');
        const userBirthdate = formData.get('userBirthdate');
        const userGender = formData.get('userGender');
        const message = formData.get('message');
        const timestamp = new Date().toLocaleString(); // Get current timestamp

        const messageData = {
            userName,
            userEmail,
            userBirthdate,
            userGender,
            message,
            timestamp
        };

        // Save the new message to localStorage
        savedMessages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(savedMessages));

        // Display the new message
        const messageElement = createMessageElement(messageData);
        messageDisplay.appendChild(messageElement);

        // Clear the form fields
        messageForm.reset();
    });
});

function createMessageElement(messageData) {
    const messageElement = document.createElement('div');
    messageElement.className = 'user-message';
    messageElement.innerHTML = `
    <p class="timestamp">${messageData.timestamp}</p>
    <p><strong>${messageData.userName}</strong> (${messageData.userEmail})</p>
    <p>Tanggal Lahir: ${messageData.userBirthdate}</p>
    <p>Jenis Kelamin: ${messageData.userGender}</p>
    <p>Pesan: ${messageData.message}</p>`;
    return messageElement;
}
