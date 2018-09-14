import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import styled from 'styled-components';

const MapContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const mapState = { center: [55.76, 37.64], zoom: 10, controls: [] };
 
const MyPlacemark = () => (
  <MapContainer>
    <YMaps>
      <Map 
        state={mapState}
        width='100%'  
        height='100%'
      >
      </Map>
    </YMaps>
  </MapContainer>
);

export default MyPlacemark;

