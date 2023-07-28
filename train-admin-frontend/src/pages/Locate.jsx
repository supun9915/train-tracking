import React, { useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "74.5%",
  height: "100%",
};

const center = {
  lat: 43.942253,
  lng: -79.375316,
};

const styles = {
  hide: [
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ],
};

const Locate = () => {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    componentRestrictions: { country: "ca" },
    libraries,
  });

  return isLoaded ? (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Train Tracking</h2>
        <div>
          <div className="w-full mb-2 flex justify-end space-x-2">tsst</div>
          <div className="h-full w-full overflow-hidden relative">
            <GoogleMap
              mapContainerStyle={containerStyle}
              defaultCenter={center}
              //   defaultZoom={zoom}
              //   onLoad={onLoad}
              //   onUnmount={onUnmount}
              options={{
                styles: styles.hide,
                fullscreenControl: false,
                clickableIcons: false,
                mapTypeControl: false,
                streetViewControl: false,
                // zoomControl,
                // draggable: zoomControl,
                maxZoom: 17,
              }}
            >
              <Marker
                key={1}
                // onClick={() => handleActiveDeviceMarker(device.shuttleId)}
                position={{ lat: "14.2545", lng: "10.245" }}
                icon={{
                  path: "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z",
                  scale: 0.8,
                  strokeColor: "#ec5749",
                  fillColor: "#ec5749",
                  fillOpacity: 1,
                  //   rotation: device.rotation,
                }}
              >
                {/* {activeDeviceMarker === device.shuttleId ? (
                  <InfoWindow
                    position={{
                      lat: Number(device.lat),
                      lng: Number(device.lng),
                    }}
                    onCloseClick={() => setActiveDeviceMarker(null)}
                  >
                    <div key={device.shuttleId} className="p-3">
                      {device.deviceName}
                    </div>
                  </InfoWindow>
                ) : null} */}
              </Marker>
            </GoogleMap>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Locate;
