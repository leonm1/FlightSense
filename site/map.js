
const map = L.map('map').setView([39.08, -94.56], 3.65);

L.tileLayer('https://api.mapbox.com/styles/v1/bencooper222/cje2g1e7ncm2x2rq94odyqf18/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmVuY29vcGVyMjIyIiwiYSI6ImNpeGlxY2dxMzAwMTYzMnBqdnM5ZzE0ZDgifQ.ny6yQcI2QEHve1aMhs-0Rw', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const drawLine = (start, end) => {
    const planeOptions = {
        icon: 'plane',
        borderColor: '#8D208B',
        textColor: '#8D208B',
        backgroundColor: 'transparent'
    };
    L.marker(start).addTo(map)
    L.marker(end).addTo(map);
    const polyline = L.polyline([start, end], { color: 'blue' }).addTo(map);
}
drawLine([38.27, -98.58],[40.12, -88.24]) 