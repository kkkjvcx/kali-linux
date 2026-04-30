// Get elements from the DOM
const messageElement = document.getElementById('message');
const buttonElement = document.getElementById('actionBtn');

// Add click event listener to the button
buttonElement.addEventListener('click', function() {
    messageElement.textContent = 'Hello! JavaScript is working! 🎉';
    messageElement.style.color = '#667eea';
    messageElement.style.fontWeight = 'bold';
    
    // Disable the button after clicking
    buttonElement.disabled = true;
    buttonElement.textContent = 'Clicked!';
    buttonElement.style.background = '#888';
});
