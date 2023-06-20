import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import Head from 'next/head';
import { Icon } from 'leaflet';
const MapComponent = ({ location1, location2, text }) => {
    const positions = [location1, location2];

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
                    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                    crossOrigin=""
                />
            </Head>
            <MapContainer style={{ height: '400px', width: '100%' }} center={location1} zoom={13}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={positions} color="red" />
                <Marker position={location1} icon={new Icon({
                    iconUrl: "./favicon.ico",
                    iconSize: [25, 25]
                })}>
                    <Popup>{text}</Popup>
                </Marker>
                <Marker position={location2} icon={new Icon({
                    iconUrl: "./favicon.ico",
                    iconSize: [25, 25]
                })}>
                    <Popup>{text}</Popup>
                </Marker>
            </MapContainer>
        </>
    );
};

export default MapComponent;
