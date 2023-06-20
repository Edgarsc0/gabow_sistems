import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapWithUserLocation = dynamic(() => import("@/components/Mapa"), { ssr: false });
const MapWithLine = dynamic(() => import("@/components/LineMap"), { ssr: false });
const MapWithClickEvent = dynamic(() => import("@/components/MapWithClickEvents"), { ssr: false });

const Main = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [results, setResults] = useState({
    distanceBetweenPoints: null
  });
  const [points, setPoints] = useState(null);
  const r = 6.371009 * 10 ** 6;

  useEffect(() => {
    console.log(results);
  }, [results])

  const getCurrentPosition = () => {
    const success = (pos) => {
      setCurrentPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude
      });
    };

    const error = () => {
      // Manejar el error de geolocalización aquí
    };

    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });
  };

  const toRadians = (angle) => {
    return angle * Math.PI / 180;
  }

  const pointProduct = (vector1, vector2) => {
    return vector1[0] * vector2[0] + vector1[1] * vector2[1] + vector1[2] * vector2[2];
  }

  const distanceBetweenPoints = (firstPoint, secondPoint) => {
    const [lat1, lon1] = firstPoint;
    const [lat2, lon2] = secondPoint;
    const vector1 = [
      r * Math.cos(toRadians(lat1)) * Math.cos(toRadians(lon1)),
      r * Math.cos(toRadians(lat1)) * Math.sin(toRadians(lon1)),
      r * Math.sin(toRadians(lat1))
    ];
    const vector2 = [
      r * Math.cos(toRadians(lat2)) * Math.cos(toRadians(lon2)),
      r * Math.cos(toRadians(lat2)) * Math.sin(toRadians(lon2)),
      r * Math.sin(toRadians(lat2))
    ];
    return r * Math.acos(pointProduct(vector1, vector2) / r ** 2);
  }

  const handleDistanceBetweenPoints = (e) => {
    e.preventDefault();
    setResults({
      ...results,
      distanceBetweenPoints: distanceBetweenPoints([parseFloat(e.target.lat1.value), parseFloat(e.target.lon1.value)], [parseFloat(e.target.lat2.value), parseFloat(e.target.lon2.value)])
    });
    setPoints([[parseFloat(e.target.lat1.value), parseFloat(e.target.lon1.value)], [parseFloat(e.target.lat2.value), parseFloat(e.target.lon2.value)]])
  }

  const styles = {
    division: {
      backgroundColor: "#121212",
      border: "1px solid #121212",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      marginTop: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    h2: {
      color: "#333",
      fontSize: "24px",
      marginBottom: "10px",
    },
    p: {
      color: "#666",
      fontSize: "16px",
    },
    title: {
      fontSize: "24px",
      marginBottom: "10px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
    locationTable: {
      width: "100%",
      marginTop: "20px",
      borderCollapse: "collapse",
    },
    tableCell: {
      padding: "8px",
      border: "1px solid #ccc",
    },
    tableHeader: {
      backgroundColor: "#f0f0f0",
    },
    input: {
      width: "50%",
      padding: "5px",
    },
  };

  return (
    <>
      <h1>Gabow systems</h1>
      <MapWithClickEvent />
      <div style={styles.division}>
        <h1 style={styles.title}>Obtener ubicación actual</h1>
        <button style={styles.button} onClick={getCurrentPosition}>Obtener</button>
        <br />
        {currentPosition.latitude && currentPosition.longitude ? (
          <>
            <table style={styles.locationTable}>
              <tbody>
                <tr>
                  <th style={styles.tableCell}>Latitud</th>
                  <td style={styles.tableCell}>
                    <input style={styles.input} value={currentPosition.latitude} readOnly />
                  </td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Longitud</th>
                  <td style={styles.tableCell}>
                    <input style={styles.input} value={currentPosition.longitude} readOnly />
                  </td>
                </tr>
                <tr>
                  <th style={styles.tableCell}>Altura</th>
                  <td style={styles.tableCell}>
                    <input style={styles.input} value={currentPosition.altitude} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>
            <MapWithUserLocation position={[currentPosition.latitude, currentPosition.longitude]} />
          </>

        ) : null}
      </div>
      <div style={styles.division}>
        <h1 style={styles.title}>Calcular distancias entre dos puntos</h1>
        <form onSubmit={handleDistanceBetweenPoints}>
          <button style={styles.button} type="submit">Calcular</button>
          <table style={styles.locationTable}>
            <tbody>
              <tr>
                <th style={styles.tableCell}>Primer punto:</th>
                <td style={styles.tableCell}>
                  <input style={styles.input} placeholder="Latitud" name="lat1"></input>
                  <input style={styles.input} placeholder="Longitud" name="lon1"></input>
                </td>
              </tr>
              <tr>
                <th style={styles.tableCell}>Segundo punto:</th>
                <td style={styles.tableCell}>
                  <input style={styles.input} placeholder="Latitud" name="lat2"></input>
                  <input style={styles.input} placeholder="Longitud" name="lon2"></input>
                </td>
              </tr>
              {results.distanceBetweenPoints ? (
                <>
                  <tr>
                    <th style={styles.tableCell}>{results.distanceBetweenPoints}m</th>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
          {results.distanceBetweenPoints && points ? (
            <MapWithLine location1={points[0]} location2={points[1]} text={results.distanceBetweenPoints + "m"} />
          ) : null}
        </form>
      </div>
      <div style={styles.division}>
        <h1 style={styles.title}>Coordenadas Poligonales</h1>
        <form >
          <button style={styles.button} type="submit">Comprobar</button>
          <table style={styles.locationTable}>
            <tbody>
              <tr>
                <th style={styles.tableCell}>
                  Latitud:
                </th>
                <td style={styles.tableCell}>
                  <input style={styles.input}></input>
                </td>
              </tr>
              <tr>
                <th style={styles.tableCell}>
                  Longitud
                </th>
                <td style={styles.tableCell}>
                  <input style={styles.input}></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Main;
