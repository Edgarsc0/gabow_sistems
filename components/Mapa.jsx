import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { MapContainer, TileLayer, ZoomControl ,Marker,Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import styles from '../styles/Mapa.module.scss';

const Mapa = ({ position }) => {


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

      <div className={styles.container}>
        <MapContainer center={position} zoom={11} zoomControl={false}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ZoomControl position="bottomleft" />
          <Marker position={position} icon={new Icon({
            iconUrl:"./favicon.ico",
            iconSize:[25,25]
          })}>
            <Popup>¡Aquí estás!</Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default Mapa;
