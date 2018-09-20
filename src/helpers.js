import Papa from 'papaparse';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getColor = (files, colors) => {
  if (Object.keys(files).length >= colors.length) return getRandomColor();

  outer: for (let i = 0; i < colors.length; i++) {
    for (let key in files) {
      if (colors[i] === files[key].color) continue outer;
    }

    return colors[i];
  }
};

export const round1Decimal = num => {
  return Math.round(num * 10) / 10;
};

export const parseData2 = (data, currentState) => {
  Object.keys(data).forEach(number => {
    const name = data[number].name.replace('.csv', '');

    if (!currentState.hasOwnProperty(name)) {
      Papa.parse(data[number], {
        complete: result => {
          formatData(result.data);
        },
      });
    }
  });
};

const formatData = data => {
  const willChange = data.map(el => [...el]);

  const fileredData = willChange
    .filter(item => Number(item[0]))
    .reduce((filtered, item) => {
      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i][2] === item[2]) {
          filtered[i][7] = round1Decimal(
            parseFloat(filtered[i][7]) + parseFloat(item[7].replace(/\s/g, ''))
          );
          filtered[i][5] = round1Decimal(
            parseFloat(filtered[i][5]) + parseFloat(item[5])
          );
          filtered[i][8] += `, ${item[8]}`;
          return filtered;
        }
      }

      filtered.push(item);
      return filtered;
    }, []);

  console.log('до фильтрации', data);
  console.log('после фильтрации', fileredData);
};

export const createPlacemark = (data, color) => ({
  type: 'Feature',
  geometry: { type: 'Point', coordinates: data.coords },
  options: {
    preset: 'islands#redIcon',
    iconColor: color,
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
  },
});

export const copyFields = (obj1, obj2) => {
  obj1.sum = round1Decimal(obj1.sum + obj2.sum);
  obj1.weight = round1Decimal(obj1.weight + obj2.weight);
  obj1.task += obj2.task ? `, ${obj2.task}` : '';

  return obj1;
};
