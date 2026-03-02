
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '../public');

async function processDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const webpPath = filePath.replace(ext, '.webp');
        
        console.log(`Optimizing: ${file} -> .webp`);
        
        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          // Delete original file
          fs.unlinkSync(filePath);
          console.log(`Deleted original: ${file}`);
        } catch (error) {
          console.error(`Error processing ${file}:`, error);
        }
      }
    }
  }
}

console.log('Starting Asset Optimization Protocol...');
processDirectory(rootDir).then(() => {
  console.log('Asset Optimization Complete.');
}).catch(err => {
  console.error('Optimization Failed:', err);
});
