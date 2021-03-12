function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([38.98, -76.93], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZ2hlbnJpcXVlejk5IiwiYSI6ImNrbTQ4cmNlazAyNzMyd3FzdGtmN3VyYTAifQ.OBXyvvX9qQ_VPrDVLon_-A'
  }).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  // gets the data and inits the needed html elements
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const form = document.querySelector('.userForm');
  const search = document.querySelector('.search');
  const target = document.querySelector('.target-ul');

  // structures the recieved data into json
  const request = await fetch(endpoint);
  const data = await request.json();
  console.log(data);

  // an array outside of the displayResult() scope so it can be accessed later to delete markers
  const markerList = [];

  // function is responsible for creating the li 's and putting the markers on the map
  function displayResult(dataList, index) {
    const elem = document.createElement('li');
    elem.classList.add('list-item');
    elem.innerText = `${dataList[index].name}\n${dataList[index].address_line_1}`;
    target.append(elem);

    const latCoord = dataList[index].geocoded_column_1.coordinates[1];
    const longCoord = dataList[index].geocoded_column_1.coordinates[0];
    console.log('coordinates', latCoord, longCoord);
    marker = L.marker([latCoord, longCoord], 'setView').addTo(mapObjectFromFunction);
    markerList.push(marker);
    marker.bindPopup(`${dataList[index].name}`);
  }

  // this function is run on submit if there are currently existing markers
  // deletes previous markers before it adds the new ones
  function deleteMarkers(markers) {
    for (let i = 0; i < markers.length; i += 1) {
      mapObjectFromFunction.removeLayer(markers[i]);
    }
  }

  // fires on the submit button
  form.addEventListener('submit', async (event) => {
    // stops the page from reloading or something?? NEED THIS
    event.preventDefault();
    // if there are currently markers on the map, remove them
    if (markerList.length > 0) {
      deleteMarkers(markerList);
    }
    // if there are currently li results from a previous search, remove them
    target.innerHTML = '';
    console.log('Submit button has been clicked!');

    // filters the data to only zips that match the search bar. And must have coordinates to map
    // eslint-disable-next-line max-len
    const filtered = data.filter(((record) => (record.zip === search.value) && record.geocoded_column_1));
    console.log(filtered);

    // pans the map to the very first marker. Works well because the others are bound to be close
    // eslint-disable-next-line max-len
    mapObjectFromFunction.panTo([filtered[0].geocoded_column_1.coordinates[1], filtered[0].geocoded_column_1.coordinates[0]], 0);
    // if the search results in more than 5 matches, only do the first 5
    if (filtered.length >= 5) {
      for (let i = 0; i < 5; i += 1) {
        displayResult(filtered, i);
      }
    } else { // if theres not 5, then just do as many as possible
      for (let i = 0; i < filtered.length; i += 1) {
        displayResult(filtered, i);
      }
    }
  });

  // eventListener on the search box for the sole purpose of: 
  // if empty then remove the li 's that are currently there
  search.addEventListener('input', (event) => {
    if (search.value === '') {
      target.innerHTML = '';
    }
  });
}

// runs when the page is first loaded
async function windowActions() {
  // inits empty map 
  const map = mapInit();
  // async function that takes the above init map and does stuff with it
  await dataHandler(map);
}

window.onload = windowActions;

// public token:
// pk.eyJ1IjoiZ2hlbnJpcXVlejk5IiwiYSI6ImNrbTQ4cmNlazAyNzMyd3FzdGtmN3VyYTAifQ.OBXyvvX9qQ_VPrDVLon_-A