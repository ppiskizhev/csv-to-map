import React from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import styled from 'styled-components';
import { createPlacemark } from '../helpers';

const MapContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const mapState = {
  center: [45.03547, 38.975313],
  zoom: 8,
  controls: [],
};

const MyMap = ({ files }) => {
  const pointsLists = files
    .filter(({ isActive }) => Boolean(isActive))
    .map(sale => {
      const { color, points } = sale;
      return points.map(point => ({ ...point, color }));
    });

  const flattenPoints = [].concat(...pointsLists);
  const placemarks = flattenPoints.map(createPlacemark);

  return (
    <MapContainer>
      <YMaps>
        <Map state={mapState} width="100%" height="100%">
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 64,
            }}
            clusters={{
              clusterIconLayout: 'default#pieChart',
            }}
            features={placemarks}
          />
        </Map>
      </YMaps>
    </MapContainer>
  );
};

export default MyMap;
