// Initialize Google Map
function initMap() {
    // Проверяваме дали Google Maps API е зареден и дали map елементът съществува
    if (typeof google === 'undefined' || !document.getElementById('map')) {
        console.log('Google Maps API не е зареден или map елементът липсва');
        return;
    }

    // Coordinates for СУ "Йордан Йовков" в Сливен (approximate location in ж.к. Българка)
    const school = { lat: 42.6978, lng: 26.3216 };

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: school,
        styles: [
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
            }
        ]
    });

    // Add marker for the school
    const marker = new google.maps.Marker({
        position: school,
        map: map,
        title: 'СУ "Йордан Йовков"'
    });

    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><h3>СУ "Йордан Йовков"</h3><p>Кв. ж.к. Българка, 8800 Сливен</p><p>Тел: 044 667 244</p></div>'
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Initialize map when the page loads
window.onload = initMap;

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the form data to your server
    console.log('Form submitted:', formData);

    // Clear the form
    this.reset();

    // Show success message
    alert('Благодарим ви! Вашето съобщение беше изпратено успешно.');
});