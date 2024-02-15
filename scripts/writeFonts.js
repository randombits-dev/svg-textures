import fontList from 'font-previews/output/google-fonts.json' assert {type: 'json'};
import fs from 'node:fs';

const newData = fontList.filter(font => {
  if (font.category === 'Display') {
    const parts = font.name.split(' ');
    return !parts.find(part => {
      // check if first character is number
      return (part[0].match(/[0-9]/));
    });
  }
  return false;
}).sort((a, b) => {
  return a.popularity - b.popularity;
}).map(font => {
  return font.name;
});

fs.writeFileSync('src/data/fonts.json', JSON.stringify(newData));
