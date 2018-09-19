import React from 'react';
import { YMaps, Map, ObjectManager } from 'react-yandex-maps';
import styled from 'styled-components';

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
  let features = [];

  Object.keys(files).forEach(name => {
    const currentFile = files[name];

    if (currentFile.isActive) {
      currentFile.geoData
        .reduce((filtered, item) => {
          for (let i = 0; i < filtered.length; i++) {
            if (filtered[i].partner === item.partner) {
              filtered[i].sum =
                Math.round((filtered[i].sum + item.sum) * 10) / 10;
              filtered[i].weight =
                Math.round((filtered[i].weight + item.weight) * 10) / 10;
              filtered[i].task += `, ${item.task}`;
              return filtered;
            }
          }

          filtered.push(item);
          return filtered;
        }, [])
        .forEach(data => {
          features.push({
            type: 'Feature',
            geometry: { type: 'Point', coordinates: data.coords },
            options: {
              preset: 'islands#redIcon',
              iconColor: currentFile.color,
            },
            properties: {
              balloonContent: [
                `<b>Контрагент: ${data.partner}</b>`,
                '<br />',
                `Адрес: ${data.address}`,
                '<br />',
                `Сумма: ${data.sum}`,
                '<br />',
                `Вес: ${data.weight}`,
                '<br />',
                `Задания: ${data.task}`,
              ].join(''),
              clusterCaption: `${data.partner}`,
              hintContent: `${data.partner}`,
              myDescription: 'Произвольное описание',
            },
          });
        });
    }
  });

  features.forEach((item, index) => (item.id = index));

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
            features={features}
          />
        </Map>
      </YMaps>
    </MapContainer>
  );
};

export default MyMap;
