const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public/sequence');
const outputDir = path.join(__dirname, 'public/sequence-mobile');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages() {
    try {
        const files = fs.readdirSync(inputDir);
        const webpFiles = files.filter(file => file.endsWith('.webp') && !file.includes('_mobile'));

        for (const file of webpFiles) {
            const inputPath = path.join(inputDir, file);

            // Name format: 5a397c44-049b-4726-8441-d86e3a659452_000.webp -> _000_mobile.webp
            const filenameObj = path.parse(file);
            const outputPath = path.join(outputDir, `${filenameObj.name}_mobile${filenameObj.ext}`);

            // Get original dimensions to scale by 50%
            const metadata = await sharp(inputPath).metadata();
            const newWidth = Math.round(metadata.width * 0.5);

            await sharp(inputPath)
                .resize(newWidth) // Resizes width to 50%, height auto-scales
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Optimized ${file} -> ${path.basename(outputPath)}`);
        }
        console.log('Mobile sequence generation complete!');
    } catch (err) {
        console.error('Error processing images:', err);
    }
}

processImages();
