import React, { useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MapModal = ({ show, onClose, onSelect, address, coordinates }) => {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const { t } = useTranslation();
    useEffect(() => {
        if (show) {
            initMap();
        }
    }, [show]);

    const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: address !== "" && address !== undefined && address !== null ? coordinates : { lat: 8.9959496, lng: 3.3821161 },
            zoom: 8
        });

        map.addListener('click', (e) => {
            const latlng = e.latLng;
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ location: latlng }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    onSelect(results[0].formatted_address, {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    });
                    addMarker(map, { lat: latlng.lat(), lng: latlng.lng() });
                }
            });
        });

        mapRef.current = map;

        if (address) {
            addMarker(map, coordinates);
        }
    };

    const addMarker = (map, position) => {
        if (markerRef.current) {
            markerRef.current.setMap(null);
        }
        markerRef.current = new window.google.maps.Marker({
            position,
            map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
    };

    useEffect(() => {
        if (show && mapRef.current && coordinates) {
            mapRef.current.setCenter(coordinates);
            addMarker(mapRef.current, coordinates);
        }
    }, [show, coordinates]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{t("Select Location")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="map" style={{ height: '400px' }}></div>
                <script
                    src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDhuJrjhS1JNrk61fisAcb1_-rCN1QXPeI`}
                    async
                    defer
                ></script>
            </Modal.Body>
        </Modal>
    );
};

export default MapModal;
