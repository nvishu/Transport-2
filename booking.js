// Booking Page JavaScript with Google Maps Integration

let map;
let directionsService;
let directionsRenderer;
let pickupMarker;
let dropMarker;
let currentStep = 1;
let bookingData = {
    pickup: null,
    drop: null,
    distance: 0,
    duration: '',
    fare: 0
};

// Initialize Google Map
function initMap() {
    // Default center (Mumbai, India)
    const defaultCenter = { lat: 19.0760, lng: 72.8777 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: defaultCenter,
        styles: [
            {
                featureType: 'all',
                elementType: 'geometry',
                stylers: [{ color: '#f5f5f5' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#e9e9e9' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9e9e9e' }]
            }
        ]
    });
    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: '#FF6B35',
            strokeWeight: 5,
            strokeOpacity: 0.8
        }
    });
    
    // Initialize autocomplete
    initAutocomplete();
}

// Initialize Autocomplete for location inputs
function initAutocomplete() {
    const pickupInput = document.getElementById('pickupLocation');
    const dropInput = document.getElementById('dropLocation');
    
    if (pickupInput) {
        const pickupAutocomplete = new google.maps.places.Autocomplete(pickupInput, {
            componentRestrictions: { country: 'in' },
            fields: ['address_components', 'geometry', 'name']
        });
        
        pickupAutocomplete.addListener('place_changed', function() {
            const place = pickupAutocomplete.getPlace();
            if (place.geometry) {
                bookingData.pickup = {
                    address: pickupInput.value,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                updateMap();
            }
        });
    }
    
    if (dropInput) {
        const dropAutocomplete = new google.maps.places.Autocomplete(dropInput, {
            componentRestrictions: { country: 'in' },
            fields: ['address_components', 'geometry', 'name']
        });
        
        dropAutocomplete.addListener('place_changed', function() {
            const place = dropAutocomplete.getPlace();
            if (place.geometry) {
                bookingData.drop = {
                    address: dropInput.value,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                };
                updateMap();
            }
        });
    }
}

// Update map with markers and route
function updateMap() {
    if (!bookingData.pickup || !bookingData.drop) return;
    
    // Clear existing markers
    if (pickupMarker) pickupMarker.setMap(null);
    if (dropMarker) dropMarker.setMap(null);
    
    // Create pickup marker
    pickupMarker = new google.maps.Marker({
        position: { lat: bookingData.pickup.lat, lng: bookingData.pickup.lng },
        map: map,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z" fill="#FF6B35"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 50),
            anchor: new google.maps.Point(20, 50)
        },
        title: 'Pickup Location'
    });
    
    // Create drop marker
    dropMarker = new google.maps.Marker({
        position: { lat: bookingData.drop.lat, lng: bookingData.drop.lng },
        map: map,
        icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="50" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 30 20 30s20-15 20-30C40 8.954 31.046 0 20 0z" fill="#138808"/>
                    <circle cx="20" cy="20" r="8" fill="white"/>
                </svg>
            `),
            scaledSize: new google.maps.Size(40, 50),
            anchor: new google.maps.Point(20, 50)
        },
        title: 'Drop Location'
    });
    
    // Calculate and display route
    calculateRoute();
}

// Calculate route and distance
function calculateRoute() {
    if (!bookingData.pickup || !bookingData.drop) return;
    
    const request = {
        origin: { lat: bookingData.pickup.lat, lng: bookingData.pickup.lng },
        destination: { lat: bookingData.drop.lat, lng: bookingData.drop.lng },
        travelMode: google.maps.TravelMode.DRIVING
    };
    
    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            
            const route = result.routes[0].legs[0];
            bookingData.distance = route.distance.value / 1000; // Convert to km
            bookingData.duration = route.duration.text;
            bookingData.fare = Math.round(bookingData.distance * 25); // ₹25 per km
            
            // Update info cards
            document.getElementById('mapDistance').textContent = route.distance.text;
            document.getElementById('mapFare').textContent = `₹${bookingData.fare}`;
            document.getElementById('mapDuration').textContent = bookingData.duration;
        } else {
            console.error('Directions request failed:', status);
            alert('Unable to calculate route. Please check the addresses.');
        }
    });
}

// Swap pickup and drop locations
function swapLocations() {
    const pickupInput = document.getElementById('pickupLocation');
    const dropInput = document.getElementById('dropLocation');
    
    const temp = pickupInput.value;
    pickupInput.value = dropInput.value;
    dropInput.value = temp;
    
    const tempData = bookingData.pickup;
    bookingData.pickup = bookingData.drop;
    bookingData.drop = tempData;
    
    updateMap();
}

// Calculate fare and proceed to next step
function calculateFare() {
    // Validate step 1 inputs
    const pickupLocation = document.getElementById('pickupLocation');
    const dropLocation = document.getElementById('dropLocation');
    const pickupDate = document.getElementById('pickupDate');
    const pickupTime = document.getElementById('pickupTime');
    const carType = document.querySelector('input[name="carType"]:checked');
    
    let isValid = true;
    
    if (!bookingData.pickup) {
        showError(pickupLocation, 'Please select a pickup location');
        isValid = false;
    }
    
    if (!bookingData.drop) {
        showError(dropLocation, 'Please select a drop location');
        isValid = false;
    }
    
    if (!pickupDate.value) {
        showError(pickupDate, 'Please select a pickup date');
        isValid = false;
    }
    
    if (!pickupTime.value) {
        showError(pickupTime, 'Please select a pickup time');
        isValid = false;
    }
    
    if (!carType) {
        alert('Please select a vehicle type');
        isValid = false;
    }
    
    if (isValid) {
        if (bookingData.fare > 0) {
            // Store additional data
            bookingData.date = pickupDate.value;
            bookingData.time = pickupTime.value;
            bookingData.carType = carType.value;
            
            // Update fare display in step 2
            document.getElementById('displayDistance').textContent = `${bookingData.distance.toFixed(2)} km`;
            document.getElementById('displayFare').textContent = `₹${bookingData.fare}`;
            
            nextStep();
        } else {
            alert('Please wait for the route to be calculated');
        }
    }
}

// Navigate to next step
function nextStep() {
    if (currentStep === 2) {
        // Validate step 2
        const name = document.getElementById('passengerName');
        const phone = document.getElementById('passengerPhone');
        const email = document.getElementById('passengerEmail');
        
        let isValid = true;
        
        if (name.value.trim() === '') {
            showError(name, 'Name is required');
            isValid = false;
        }
        
        if (phone.value.trim() === '') {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!/^[0-9]{10}$/.test(phone.value.trim())) {
            showError(phone, 'Invalid phone number');
            isValid = false;
        }
        
        if (email.value.trim() === '') {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, 'Invalid email address');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Store passenger data
        bookingData.passenger = {
            name: name.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            specialRequests: document.getElementById('specialRequests').value.trim()
        };
        
        // Update summary
        updateSummary();
    }
    
    currentStep++;
    updateSteps();
}

// Navigate to previous step
function prevStep() {
    currentStep--;
    updateSteps();
}

// Update step display
function updateSteps() {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.add('hidden');
    });
    
    // Show current step
    document.getElementById(`step${currentStep}`).classList.remove('hidden');
    
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

// Update booking summary
function updateSummary() {
    document.getElementById('summaryPickup').textContent = bookingData.pickup.address;
    document.getElementById('summaryDrop').textContent = bookingData.drop.address;
    document.getElementById('summaryDateTime').textContent = `${formatDate(bookingData.date)} at ${bookingData.time}`;
    document.getElementById('summaryCarType').textContent = capitalizeFirst(bookingData.carType);
    document.getElementById('summaryDistance').textContent = `${bookingData.distance.toFixed(2)} km`;
    document.getElementById('summaryFare').textContent = `₹${bookingData.fare}`;
    document.getElementById('summaryName').textContent = bookingData.passenger.name;
    document.getElementById('summaryPhone').textContent = `+91 ${bookingData.passenger.phone}`;
    document.getElementById('summaryEmail').textContent = bookingData.passenger.email;
}

// Form submission
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const confirmTerms = document.getElementById('confirmTerms');
        
        if (!confirmTerms.checked) {
            const termsGroup = confirmTerms.closest('.form-group');
            termsGroup.querySelector('.error-message').textContent = 'You must confirm the booking details';
            return;
        }
        
        // Generate booking ID
        const bookingId = 'BT' + Date.now().toString().slice(-8);
        bookingData.bookingId = bookingId;
        bookingData.status = 'confirmed';
        bookingData.createdAt = new Date().toISOString();
        
        // Store booking (in production, send to server)
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        bookings.push(bookingData);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Show success modal
        showSuccessModal(bookingId);
    });
}

// Show success modal
function showSuccessModal(bookingId) {
    const modal = document.getElementById('successModal');
    document.getElementById('bookingId').textContent = bookingId;
    modal.classList.add('show');
    
    // Send confirmation email (simulated)
    console.log('Sending confirmation email to:', bookingData.passenger.email);
    console.log('Booking details:', bookingData);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    
    // Reset form and redirect
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Helper functions
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.add('error');
    errorMessage.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    input.classList.remove('error');
    errorMessage.textContent = '';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Real-time input validation
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.classList.contains('error') && this.value.trim() !== '') {
            clearError(this);
        }
    });
});

// Set minimum date to today
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('pickupDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
        dateInput.value = today;
    }
    
    const timeInput = document.getElementById('pickupTime');
    if (timeInput) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});
