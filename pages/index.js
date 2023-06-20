import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapWithUserLocation=dynamic(()=>import("@/components/Mapa"),{ssr:false})

const Main = () => {
  const [currentPosition, setCurrentPosition] = useState({});

  useEffect(() => {
    console.log(currentPosition);
  }, [currentPosition]);

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

  const styles = {
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
      width: "100%",
      padding: "5px",
    },
  };

  return (
    <div>
      <h1 style={styles.title}>Obtener ubicación actual</h1>
      <hr />
      <br></br>
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
          <MapWithUserLocation position={[currentPosition.latitude,currentPosition.longitude]}/>
        </>

      ) : null}
    </div>
  );
};

export default Main;
