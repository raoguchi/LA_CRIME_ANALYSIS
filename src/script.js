mapboxgl.accessToken = 'pk.eyJ1Ijoicm9ndWNoaSIsImEiOiJjbTNxbDBxaGMwcGdyMmtwa3MzdWQ0a2R4In0.KhNMHiV-j0v2z0L87ME05Q';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-118.4085, 34.0522], // Center on Los Angeles
  zoom: 10,
  minZoom: 8, // Prevent zooming too far out
  maxZoom: 15 // Prevent zooming too far in
});

map.addControl(new mapboxgl.NavigationControl());

// Function to load and decompress GeoJSON
async function loadCompressedGeoJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.statusText}`);
    }

    const compressedData = await response.arrayBuffer();
    const decompressedData = pako.inflate(new Uint8Array(compressedData), { to: 'string' });
    return JSON.parse(decompressedData);
  } catch (error) {
    console.error('Error loading or decompressing GeoJSON:', error);
    throw error;
  }
}

// Function to filter GeoJSON data for January 2020
function filterByMonthYear(geojsonData, year, month) {
  const monthStr = month.toString().padStart(2, '0'); // Ensure two-digit month
  return {
    type: 'FeatureCollection',
    features: geojsonData.features.filter((feature) => {
      const date = new Date(feature.properties.date);
      return date.getFullYear() === year && (date.getMonth() + 1) === parseInt(monthStr, 10); // Match year and month
    }),
  };
}

// Function to populate the dropdown with month/year options
function createDateDropdown(startYear, startMonth, endYear, endMonth) {
  // Create a container div for styling and positioning
  const dropdownContainer = document.createElement('div');
  dropdownContainer.id = 'dropdown-container';
  dropdownContainer.style.position = 'absolute';
  dropdownContainer.style.top = '70px';
  dropdownContainer.style.left = '10px';
  dropdownContainer.style.zIndex = '1000'; // Ensure it appears above the map
  dropdownContainer.style.backgroundColor = 'white';
  dropdownContainer.style.padding = '10px';
  dropdownContainer.style.border = '1px solid #ccc';
  dropdownContainer.style.borderRadius = '4px';

  // Create the actual dropdown element
  const dropdown = document.createElement('select');
  dropdown.id = 'date-selector';

  let optionsHTML = '';
  let currentYear = startYear;
  let currentMonth = startMonth;

  while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
    const monthString = currentMonth.toString().padStart(2, '0');
    optionsHTML += `<option value="${currentYear}-${monthString}">${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}</option>`;
    currentMonth++;
    if (currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    }
  }

  dropdown.innerHTML = optionsHTML;
  dropdownContainer.appendChild(dropdown);
  document.body.appendChild(dropdownContainer);

  return dropdown;
}

// Main logic
map.on('load', async () => {
  const geojsonURL = 'data/la_crime_data.geojson.gz'; // Update with the correct file path
  const geojsonData = await loadCompressedGeoJSON(geojsonURL);

  // Add a source with initial data (all data or an empty collection)
  map.addSource('crimeData', {
    type: 'geojson',
    data: { type: 'FeatureCollection', features: [] },
  });

  // Add a circle layer to represent the points
  map.addLayer({
    id: 'crime-layer',
    type: 'circle',
    source: 'crimeData',
    paint: {
      'circle-radius': 6,
      'circle-color': [
        'match',
        ['get', 'crime_code'],
        510, '#FF5722',
        354, '#4CAF50',
        812, '#2196F3',
        330, '#FFC107',
        '#607D8B', // Default color
      ],
      'circle-opacity': 0.8,
    },
  });

  // Create a dropdown for date selection
  const dropdown = createDateDropdown(2020, 1, 2024, 1);

  // Update the map based on dropdown selection
  dropdown.addEventListener('change', (event) => {
    const [year, month] = event.target.value.split('-');
    const filteredData = filterByMonthYear(geojsonData, parseInt(year, 10), parseInt(month, 10));
    map.getSource('crimeData').setData(filteredData);
  });

  // Trigger initial load with the first dropdown value
  const [initialYear, initialMonth] = dropdown.value.split('-');
  const initialData = filterByMonthYear(geojsonData, parseInt(initialYear, 10), parseInt(initialMonth, 10));
  map.getSource('crimeData').setData(initialData);
});
