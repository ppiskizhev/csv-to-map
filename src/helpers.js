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
