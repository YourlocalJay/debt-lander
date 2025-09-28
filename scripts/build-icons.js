const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

const source = path.join(__dirname, '..', 'assets', 'images', 'icon-1024.png');
const outputDir = path.join(__dirname, '..', 'assets', 'images');

async function ensureSourceExists() {
  try {
    await fs.access(source);
  } catch (error) {
    throw new Error(`Source image not found at ${source}`);
  }
}

async function createPngIcon(size, filename) {
  const outputPath = path.join(outputDir, filename);
  await sharp(source)
    .resize(size, size)
    .png()
    .toFile(outputPath);
  return outputPath;
}

async function createFaviconPng() {
  return createPngIcon(32, 'favicon.png');
}

async function createAppleTouchIcon() {
  return createPngIcon(180, 'icon-180.png');
}

async function createPwaIcon() {
  return createPngIcon(512, 'icon-512.png');
}

async function createFaviconIco() {
  const buffers = await Promise.all([
    sharp(source).resize(16, 16).png().toBuffer(),
    sharp(source).resize(32, 32).png().toBuffer(),
  ]);

  const icoBuffer = await toIco(buffers);
  const outputPath = path.join(outputDir, 'favicon.ico');
  await fs.writeFile(outputPath, icoBuffer);
  return outputPath;
}

async function run() {
  await ensureSourceExists();

  await Promise.all([
    createFaviconPng(),
    createAppleTouchIcon(),
    createPwaIcon(),
  ]);

  await createFaviconIco();
  console.log('Icons generated from', source);
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
