// script.js

document.getElementById('page-selector').addEventListener('change', function() {
    var selectedPage = this.value;
    if (selectedPage) {
        window.location.href = selectedPage;
    }
});
