// Function to handle adding a claim
function addClaim(event) {
  // Get the coordinates of the clicked location
  var x = event.clientX + window.pageXOffset;
  var y = event.clientY + window.pageYOffset;

  // Prompt the user for the nation name, marker color, and size
  var nationName = prompt('Enter the nation name:');
  var markerColor = prompt('Enter the marker color (e.g., red, blue, green):');
  var markerSize = prompt('Enter the marker size (e.g., 20px, 30px, etc.):');

  if (nationName) {
    // Create a new marker element
    var marker = document.createElement('div');
    marker.classList.add('claim-marker');
    marker.style.left = x + 'px';
    marker.style.top = y + 'px';
    marker.style.backgroundColor = markerColor;
    marker.style.width = markerSize;
    marker.style.height = markerSize;

    // Create a span element to display the nation name
    var nationSpan = document.createElement('span');
    nationSpan.textContent = nationName;

    // Append the span to the marker
    marker.appendChild(nationSpan);

    // Append the marker to the claims container
    var claimsContainer = document.getElementById('claims-container');
    claimsContainer.appendChild(marker);

    // Add event listener for resizing the marker
    marker.addEventListener('mousedown', startResize);
  }
}

// Function to handle marker resizing
function startResize(event) {
  event.stopPropagation();

  var marker = event.target;
  var startWidth = marker.offsetWidth;
  var startHeight = marker.offsetHeight;
  var startX = event.clientX;
  var startY = event.clientY;

  function resize(event) {
    var newWidth = startWidth + (event.clientX - startX);
    var newHeight = startHeight + (event.clientY - startY);
    marker.style.width = newWidth + 'px';
    marker.style.height = newHeight + 'px';
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize);
    window.removeEventListener('mouseup', stopResize);
  }

  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
}

// Add click event listener to the map container
var mapContainer = document.getElementById('map-container');
mapContainer.addEventListener('click', addClaim);
