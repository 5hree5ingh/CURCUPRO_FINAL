import QRCode from 'qrcode';
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';

const URL = 'https://www.phytoingredients.com/brochure';
const BG = '#FDE8D8';   // warm cream matching the reference
const FG = '#1C1410';   // near-black for QR modules
const SIZE = 600;
const MARGIN = 32;

// 1. Generate QR as PNG buffer with transparent background
const qrBuffer = await QRCode.toBuffer(URL, {
  width: SIZE - MARGIN * 2,
  margin: 2,
  color: { dark: FG, light: '#00000000' },  // transparent light modules
  errorCorrectionLevel: 'H',
  type: 'png',
});

// 2. Create a flat cream background and composite the QR on top
const bgBuffer = await sharp({
  create: {
    width: SIZE,
    height: SIZE,
    channels: 4,
    background: { r: 253, g: 232, b: 216, alpha: 1 }, // #FDE8D8
  },
})
  .composite([{ input: qrBuffer, top: MARGIN, left: MARGIN }])
  .png()
  .toBuffer();

writeFileSync('public/brochure-qr.png', bgBuffer);
console.log('✅  Saved public/brochure-qr.png with cream background #FDE8D8');
