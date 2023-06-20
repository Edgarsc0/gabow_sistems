import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MapWithUserLocation = dynamic(() => import("@/components/Mapa"), { ssr: false });
const MapWithLine = dynamic(() => import("@/components/LineMap"), { ssr: false });
const MapWithClickEvent = dynamic(() => import("@/components/MapWithClickEvents"), { ssr: false });

const Main = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [results, setResults] = useState({
    distanceBetweenPoints: null,
    isPointInsidePolygon: null
  });
  const [points, setPoints] = useState(null);
  const [testPoint, setTestPoint] = useState(null);
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

  const isPointInsidePolygon = (polygon, point) => {
    const [x, y] = point;

    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect =
        yi > y !== yj > y &&
        x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  };

  const handlePolygonCoords = (e) => {
    e.preventDefault();
    const latitud = parseFloat(e.target.lat.value);
    const longitud = parseFloat(e.target.lon.value);
    setTestPoint([latitud, longitud]);
    const verticesEscuela = [
      [19.45433542206808, -99.17541555577517],
      [19.454072256668965, -99.17511412835924],
      [19.453326369652153, -99.17461494059832],
      [19.452876732857213, -99.17521460426903],
      [19.453434642772105, -99.17602159929677]
    ];
    const verticesEdifGobierno = [
      [19.453808474739418, -99.17532934759872],
      [19.454046840426873, -99.17516439174649],
      [19.454206172449794, -99.17542590730444],
      [19.453967806521412, -99.17559019241865]
    ];
    const verticesEdifAulas = [
      [19.453892471398593, -99.17569533193137],
      [19.45358552885435, -99.17518216928498],
      [19.453505230364822, -99.17523648408987],
      [19.45357288346204, -99.1753457841169],
      [19.453533682604384, -99.17537327675619],
      [19.453574780239006, -99.17544100258108],
      [19.453552018440043, -99.17545977803319],
      [19.453445452544283, -99.17528372731593],
      [19.45320835038839, -99.17544667150386],
      [19.45351816368507, -99.17595629123954],
      [19.453747678274386, -99.17579401764054],
      [19.45360857861492, -99.17556334760003],
      [19.453630075851407, -99.17555060712067],
      [19.453667379820057, -99.17561296853741],
      [19.453700890226127, -99.17559016978095],
      [19.453662953977027, -99.17552780835774],
      [19.453680861914805, -99.17551425163511],
      [19.45382673079299, -99.17573832870664]
    ];
    //console.log(isPointInsidePolygon(verticesEscuela, [latitud, longitud]));
    setResults({
      ...results,
      isPointInsidePolygon: {
        isInEscuela: isPointInsidePolygon(verticesEscuela, [latitud, longitud]),
        isinEdifAulas: isPointInsidePolygon(verticesEdifAulas, [latitud, longitud]),
        isInEdifGobierno: isPointInsidePolygon(verticesEdifGobierno, [latitud, longitud]),
      }
    })
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
        <form onSubmit={handlePolygonCoords}>
          <button style={styles.button} type="submit">Comprobar</button>
          <table style={styles.locationTable}>
            <tbody>
              <tr>
                <th style={styles.tableCell}>
                  Latitud:
                </th>
                <td style={styles.tableCell}>
                  <input style={styles.input} name="lat" placeholder="Latitud"></input>
                </td>
              </tr>
              <tr>
                <th style={styles.tableCell}>
                  Longitud
                </th>
                <td style={styles.tableCell}>
                  <input style={styles.input} name="lon" placeholder="Longitud"></input>
                </td>
              </tr>
              {results.isPointInsidePolygon ? (
                <>
                  <tr>
                    <th style={styles.tableCell}>
                      El punto esta dentro de la escuela:
                    </th>
                    <td style={styles.tableCell}>
                      {JSON.stringify(results.isPointInsidePolygon.isInEscuela)}
                    </td>
                  </tr>
                  <tr>
                    <th style={styles.tableCell}>
                      El punto esta dentro del edificio de aulas:
                    </th>
                    <td style={styles.tableCell}>
                      {JSON.stringify(results.isPointInsidePolygon.isinEdifAulas)}
                    </td>
                  </tr>
                  <tr>
                    <th style={styles.tableCell}>
                      El punto esta dentro del edificio de gobierno:
                    </th>
                    <td style={styles.tableCell}>
                      {JSON.stringify(results.isPointInsidePolygon.isInEdifGobierno)}
                    </td>
                  </tr>
                  <tr>
                    <th style={styles.tableCell}>
                      El punto esta dentro de area comun:
                    </th>
                    <td style={styles.tableCell}>
                      {
                        results.isPointInsidePolygon.isInEscuela ? (
                          results.isPointInsidePolygon.isInEdifGobierno || results.isPointInsidePolygon.isinEdifAulas ? (
                            <>
                              <p>
                                false
                              </p>
                            </>
                          ) : (
                            <>
                              <p>
                                true
                              </p>
                            </>
                          )
                        ) : (
                          <>
                            <p>
                              false
                            </p>
                          </>
                        )
                      }
                    </td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </form >
        {
          testPoint ? (
            <MapWithUserLocation position={testPoint} />
          ) : null
        }
      </div >
      <div style={styles.division}>
        <h1 style={styles.title}>Manejo de Rutas</h1>
        <button style={styles.button} onClick={()=>window.location.href="https://edgarsc0.github.io/prueba-grafos/"}>Ir a manejo de rutas</button>
      </div>
    </>
  );
};

export default Main;
