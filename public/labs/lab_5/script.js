function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
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
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const form = document.querySelector('.userForm');
  const search = document.querySelector('.search');
  const target = document.querySelector('.target-ul');

  const request = await fetch(endpoint);
  const data = await request.json();
  console.log(data);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    target.innerHTML = '';
    console.log('Submit button has been clicked!');
    const filtered = data.filter(((record) => record.zip === search.value));
    console.log(filtered);
    console.log(filtered[0].zip);
    if (filtered.length >= 5) {
      for (let i = 0; i < 5; i += 1) {
        const elem = document.createElement('li');
        elem.classList.add('list-item');
        elem.innerText = `${filtered[i].name}\n${filtered[i].address_line_1}`;
        target.append(elem);
      }
    }
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;

// default public token:
// pk.eyJ1IjoiZ2hlbnJpcXVlejk5IiwiYSI6ImNrbTQ4cmNlazAyNzMyd3FzdGtmN3VyYTAifQ.OBXyvvX9qQ_VPrDVLon_-A