import fs from 'fs';
import { tools } from '../src/data/tools.ts';
fs.writeFileSync('./src/data/tools.json', JSON.stringify(tools.map(t=>({slug:t.slug,title:t.title,description:t.description,icon:t.icon})), null, 2));
console.log('exported', tools.length);
