import { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'; 

const Catalog = () => {
    
  const INITIAL_ZOOM = 12
  const [datos, setDatos] = useState(null)
  const [editingCarId, setEditingCarId] = useState(null)
  const [editingCarData, setEditingCarData] = useState(null)

  const [map, setMap] = useState();
  const [carMarkers, setCarMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(false);

  const [formValues, setFormValues] = useState({
    licence: '',
    brand: '',
    color: '',
    model: '',
    lat: 0.0,
    lng: 0.0
    // position: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = 'http://localhost:4000/api/v1/cars'
    const response = await axios.post(url, formValues)
    console.log(response.data)
    getData()
  }
  
  const handleDelete = async (id) => {
    const url = `http://localhost:4000/api/v1/cars/${id}`;
    await axios.delete(url);
    getData();
  };

  const handleEdit = (id) => {
    const carData = datos.find((car) => car.id === id);
    setEditingCarId(id);
    setEditingCarData(carData);
    setFormValues(carData); 
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = `http://localhost:4000/api/v1/cars/${editingCarId}`;
    const response = await axios.put(url, formValues);
    console.log(response.data);
    setEditingCarId(null);
    setEditingCarData(null);
    setFormValues({
      licence: '',
      brand: '',
      color: '',
      model: '',
      position: '',
      lat: 0.0,
      lng: 0.0
    });
    getData();
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          initializeMap(); 
        },
        error => {
          console.log(error);
          setLocationError(true);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setLocationError(true);
    }
  };
  

  async function initializeMap() {
    if (currentLocation && !map) {
      const mapOptions = {
        center: { lat: currentLocation.lat, lng: currentLocation.lng },
        zoom: INITIAL_ZOOM,
      };
  
      const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      setMap(newMap);
    }
  };
  

  const getData = async () => {
    const url = 'http://localhost:4000/api/v1/cars/';
    const response = await axios.get(url);
    console.log(response.data);
    setDatos(response.data);
  
    // Elimina los marcadores existentes del mapa
    carMarkers.forEach(marker => {
      marker.setMap(null);
    });
  
    if (map) {
      // Crea nuevos marcadores en el mapa para cada automóvil
      const newCarMarkers = response.data.map(car => {
        const latitude = parseFloat(car.lat);
        const longitude = parseFloat(car.lng);
  
        const marker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: car.licence,
          icon: {
            url: "https://cdn-icons-png.flaticon.com/512/2775/2775994.png",
            scaledSize: new google.maps.Size(30, 30), 
            anchor: new google.maps.Point(15, 15), 
            labelOrigin: new google.maps.Point(15, 10), 
            className: "marker-icon",
          },
        });
  
        return marker;
      });
  
      setCarMarkers(newCarMarkers);
    }
  };
  
  useEffect(() => {
    getCurrentLocation();
    initializeMap();
    getData();
  }, []);
  
  if (locationError) {
    return <p>Error al obtener la ubicación actual. Asegúrate de otorgar los permisos correspondientes.</p>;
  }
  
    return (
    <div>
        <div className="container">
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register a new car</h2>
            <label htmlFor="">Name</label>
            <input type="text" name="licence" placeholder="Licence" value={formValues.licence} onChange={handleChange} />
            <label htmlFor="">Brand</label>
            <input type="text" name="brand" placeholder="Brand" value={formValues.brand} onChange={handleChange} />
            <label htmlFor="">Model</label>
            <input type="text" name="model" placeholder="Model" value={formValues.model} onChange={handleChange} />
            <label htmlFor="">Color</label>
            <input type="text" name="color" placeholder="Color" value={formValues.color} onChange={handleChange} />
            <label htmlFor="">Latitud</label>
            <input type="text" name="lat" placeholder="Latitude" value={formValues.lat} onChange={handleChange} />
            <label htmlFor="">Longitud</label>
            <input type="text" name="lng" placeholder="Longitude" value={formValues.lng} onChange={handleChange} />
            {/* <input type="text" name="position" placeholder="Position" value={formValues.position} onChange={handleChange} /> */}
            <button type="submit">Add Car</button>
        </form>

        {datos !== null ? (
            datos.map(x => (
            <div key={x.id} className="car-container">
                <h1>{x.licence}</h1>
                <h2>{x.brand} {x.model}</h2>
                <h3>{x.color}</h3>
                <p>Latitud: {x.lat}</p>
                <p>Longitud: {x.lng}</p>
                <button onClick={() => handleDelete(x.id)}>Eliminar</button>
                <button onClick={() => handleEdit(x.id)}>Editar</button>
            </div>
            ))
        ) : (
            <p>Loading...</p>
        )}

        {editingCarData && (
            <div className="edit-form">
            <h2>Edit Car</h2>
            <form onSubmit={handleSave}>
                <input type="text" name="licence" placeholder="Licence" value={formValues.licence} onChange={handleChange} />
                <input type="text" name="brand" placeholder="Brand" value={formValues.brand} onChange={handleChange} />
                <input type="text" name="color" placeholder="Color" value={formValues.color} onChange={handleChange} />
                <input type="text" name="model" placeholder="Model" value={formValues.model} onChange={handleChange} />
                <input type="text" name="lat" placeholder="Latitude" value={formValues.lat} onChange={handleChange} />
                <input type="text" name="lng" placeholder="Longitude" value={formValues.lng} onChange={handleChange} />
                {/* <input type="text" name="position" placeholder="Position" value={formValues.position} onChange={handleChange} /> */}
                <button type="submit">Save Changes</button>
            </form>
            </div>
        )}
        </div>

        <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
        
    )
}

export default Catalog