import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Head from 'next/head';
import copy from "clipboard-copy";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const MapWithClickEvent = () => {
    const [clickedPosition, setClickedPosition] = useState(null);

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

    useEffect(() => {
        console.log(clickedPosition);
    }, [clickedPosition]);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        setClickedPosition([lat, lng]);
    };

    const ClickEvent = () => {
        useMapEvents({
            click: handleMapClick,
        });
        return null;
    };

    const handleCopy = () => {
        copy(clickedPosition[0] + "," + clickedPosition[1]);
        toast.success(`¡Se ha copiado correctamente!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossOrigin=""
                />
            </Head>
            <MapContainer style={{ height: '400px', width: '100%' }} center={[19.472819274952897, -99.14333273147834]} zoom={10}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ClickEvent />
                {clickedPosition && (
                    <p>Coordenadas: Latitud: {clickedPosition[0]}, Longitud: {clickedPosition[1]}</p>
                )}
            </MapContainer>
            {
                clickedPosition ? (
                    <>
                        <div className='containerCoords'>
                            <p>{clickedPosition[0]}</p>
                            <p>{clickedPosition[1]}</p>
                            <button style={styles.button} onClick={handleCopy}>Copiar</button>
                        </div>
                    </>
                ) : null
            }
        </>
    );
};

export default MapWithClickEvent;
