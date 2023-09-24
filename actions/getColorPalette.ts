const getColorPalette = async (id: number) => {
  const data = {
    model: 'ui',
    input: ['N', 'N', [141, 172, 187], 'N', 'N'],
  }

  const colorSimp = await fetch("http://colormind.io/api/", 
  {method: 'POST', body: JSON.stringify(data)}).then(
    res => res.json()).then(
        (palette) => palette.result)

  return colorSimp;
};

export default getColorPalette;
