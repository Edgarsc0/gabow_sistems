import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapWithUserLocation = dynamic(() => import("@/components/Mapa"), { ssr: false })

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
      <div style={styles.division}>
        <h1 style={styles.title}>Obtener ubicación actual</h1>

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
            <MapWithUserLocation position={[currentPosition.latitude, currentPosition.longitude]} />
          </>

        ) : null}
      </div>
      <div style={styles.division}>
        <h1 style={styles.title}>Calcular distancias entre dos puntos</h1>
        <form>
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
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default Main;
