// DOM Manipulation using JavaScript

// Change text using innerHTML
document.getElementById('change-text-btn').addEventListener('click', function() {
    document.getElementById('description').innerHTML = 'The text has been dynamically changed!';
});

// Toggle image source after clicking a button
let isDogImage = true;
document.getElementById('change-image-btn').addEventListener('click', function() {
    const imageElement = document.getElementById('dynamic-image');
    if (isDogImage) {
        imageElement.src = 'cat.jpeg'; // Path to cat image
    } else {
        imageElement.src = 'dog.jpeg'; // Path to dog image
    }
    isDogImage = !isDogImage; // Toggle the flag
});

// Add a text node to a parent node
document.getElementById('add-node-btn').addEventListener('click', function() {
    const newNode = document.createElement('p');
    const textNode = document.createTextNode('This is a dynamically added node.');
    newNode.appendChild(textNode);
    document.getElementById('node-container').appendChild(newNode);
});

// Delete the last node added
document.getElementById('remove-node-btn').addEventListener('click', function() {
    const container = document.getElementById('node-container');
    if (container.lastChild) {
        container.removeChild(container.lastChild);
    }
});

// Change CSS properties dynamically
document.getElementById('main-heading').style.color = 'blue';
document.getElementById('main-heading').style.position = 'relative';

// jQuery Operations

// Change button text using jQuery
$('#change-btn-text').click(function() {
    $(this).text('Button Text Changed!');
});

// Set background color using jQuery
$('#set-bg-btn').click(function() {
    $('body').css('background-color', 'blue');
});

// Access form data using jQuery
$('#submit-btn').click(function(e) {
    e.preventDefault();
    let name = $('#input-name').val();
    alert('Form submitted! Name: ' + name);
});

// Add an attribute using jQuery
$('#dynamic-image').attr('title', 'This is the dynamic image');