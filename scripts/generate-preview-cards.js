const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { ROOT_DIR } = require('./asset-library');

const PREVIEW_SPECS = [
  {
    output: 'assets/previews/themes/vertical-creator/scenes/start-screen.png',
    width: 675,
    height: 1200,
    background: ['#0f172a', '#1d4ed8', '#f97316'],
    accent: '#f8fafc',
    pattern: 'rings',
  },
  {
    output: 'assets/previews/themes/vertical-creator/scenes/end-screen.png',
    width: 675,
    height: 1200,
    background: ['#140b24', '#3b82f6', '#ec4899'],
    accent: '#f8fafc',
    pattern: 'sunset',
  },
  {
    output: 'assets/previews/themes/vertical-creator/overlays/live-frame.png',
    width: 675,
    height: 1200,
    background: ['#08111f', '#0f766e', '#22d3ee'],
    accent: '#e0f2fe',
    pattern: 'frame',
  },
  {
    output: 'assets/previews/themes/vertical-creator/lower-thirds/cta-lower-third.png',
    width: 1200,
    height: 520,
    background: ['#111827', '#2563eb', '#f59e0b'],
    accent: '#fff7ed',
    pattern: 'banner',
  },
  {
    output: 'assets/previews/themes/vertical-creator/widgets/chat-panel.png',
    width: 560,
    height: 1200,
    background: ['#071827', '#0f766e', '#a855f7'],
    accent: '#ecfeff',
    pattern: 'chat',
  },
  {
    output: 'assets/previews/themes/vertical-creator/widgets/goal-widget.png',
    width: 1200,
    height: 420,
    background: ['#0f172a', '#db2777', '#fb7185'],
    accent: '#ffe4e6',
    pattern: 'progress',
  },
  {
    output: 'assets/previews/themes/live-show/scenes/dual-camera-scene.png',
    width: 1200,
    height: 675,
    background: ['#0b1120', '#1d4ed8', '#7c3aed'],
    accent: '#e0f2fe',
    pattern: 'split',
  },
  {
    output: 'assets/previews/themes/live-show/scenes/sponsor-slate.png',
    width: 1200,
    height: 675,
    background: ['#1e1b4b', '#c026d3', '#f59e0b'],
    accent: '#fff7ed',
    pattern: 'spotlight',
  },
  {
    output: 'assets/previews/themes/live-show/scenes/schedule-scene.png',
    width: 1200,
    height: 675,
    background: ['#08111f', '#0369a1', '#14b8a6'],
    accent: '#ecfeff',
    pattern: 'schedule',
  },
  {
    output: 'assets/previews/themes/live-show/scenes/break-screen.png',
    width: 1200,
    height: 675,
    background: ['#111827', '#4f46e5', '#ec4899'],
    accent: '#eef2ff',
    pattern: 'pause',
  },
  {
    output: 'assets/previews/themes/live-show/lower-thirds/host-intro.png',
    width: 1200,
    height: 360,
    background: ['#0f172a', '#1d4ed8', '#22d3ee'],
    accent: '#f8fafc',
    pattern: 'lowerThird',
  },
  {
    output: 'assets/previews/themes/live-show/lower-thirds/guest-intro.png',
    width: 1200,
    height: 360,
    background: ['#111827', '#ea580c', '#f59e0b'],
    accent: '#fff7ed',
    pattern: 'lowerThird',
  },
  {
    output: 'assets/previews/themes/live-show/widgets/promo-card.png',
    width: 900,
    height: 900,
    background: ['#0b1120', '#7c3aed', '#ec4899'],
    accent: '#fdf4ff',
    pattern: 'card',
  },
];

function hexToRgb(value) {
  const normalized = value.replace('#', '');
  return {
    r: parseInt(normalized.slice(0, 2), 16),
    g: parseInt(normalized.slice(2, 4), 16),
    b: parseInt(normalized.slice(4, 6), 16),
  };
}

function blend(from, to, amount) {
  return {
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount),
  };
}

function mixColors(colors, t) {
  if (colors.length === 1) {
    return colors[0];
  }

  const scaled = t * (colors.length - 1);
  const index = Math.min(colors.length - 2, Math.floor(scaled));
  const local = scaled - index;
  return blend(colors[index], colors[index + 1], local);
}

function setPixel(buffer, width, x, y, color, alpha = 255) {
  if (x < 0 || y < 0 || x >= width) {
    return;
  }
  const index = (y * width + x) * 4;
  const mix = alpha / 255;
  buffer[index] = Math.round(buffer[index] * (1 - mix) + color.r * mix);
  buffer[index + 1] = Math.round(buffer[index + 1] * (1 - mix) + color.g * mix);
  buffer[index + 2] = Math.round(buffer[index + 2] * (1 - mix) + color.b * mix);
  buffer[index + 3] = 255;
}

function drawRect(buffer, width, height, x0, y0, rectWidth, rectHeight, color, alpha = 255) {
  for (let y = Math.max(0, Math.floor(y0)); y < Math.min(height, Math.ceil(y0 + rectHeight)); y += 1) {
    for (let x = Math.max(0, Math.floor(x0)); x < Math.min(width, Math.ceil(x0 + rectWidth)); x += 1) {
      setPixel(buffer, width, x, y, color, alpha);
    }
  }
}

function drawCircle(buffer, width, height, cx, cy, radius, color, alpha = 255) {
  const radiusSquared = radius * radius;
  for (let y = Math.max(0, Math.floor(cy - radius)); y < Math.min(height, Math.ceil(cy + radius)); y += 1) {
    for (let x = Math.max(0, Math.floor(cx - radius)); x < Math.min(width, Math.ceil(cx + radius)); x += 1) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= radiusSquared) {
        setPixel(buffer, width, x, y, color, alpha);
      }
    }
  }
}

function drawFrame(buffer, width, height, color) {
  const thickness = Math.max(12, Math.round(Math.min(width, height) * 0.03));
  drawRect(buffer, width, height, 0, 0, width, thickness, color, 220);
  drawRect(buffer, width, height, 0, height - thickness, width, thickness, color, 220);
  drawRect(buffer, width, height, 0, 0, thickness, height, color, 220);
  drawRect(buffer, width, height, width - thickness, 0, thickness, height, color, 220);
}

function drawPattern(buffer, width, height, spec) {
  const accent = hexToRgb(spec.accent);
  const softAccent = blend(accent, { r: 255, g: 255, b: 255 }, 0.5);

  switch (spec.pattern) {
    case 'rings':
      drawCircle(buffer, width, height, width * 0.5, height * 0.4, width * 0.26, accent, 110);
      drawCircle(buffer, width, height, width * 0.5, height * 0.4, width * 0.18, { r: 15, g: 23, b: 42 }, 255);
      drawCircle(buffer, width, height, width * 0.5, height * 0.4, width * 0.1, accent, 160);
      drawRect(buffer, width, height, width * 0.15, height * 0.72, width * 0.7, height * 0.12, softAccent, 120);
      break;
    case 'sunset':
      drawCircle(buffer, width, height, width * 0.5, height * 0.35, width * 0.18, softAccent, 220);
      for (let index = 0; index < 7; index += 1) {
        drawRect(buffer, width, height, width * 0.22, height * (0.52 + index * 0.05), width * 0.56, 6, accent, 180 - index * 15);
      }
      break;
    case 'frame':
      drawFrame(buffer, width, height, accent);
      drawRect(buffer, width, height, width * 0.1, height * 0.1, width * 0.8, height * 0.08, softAccent, 190);
      drawRect(buffer, width, height, width * 0.12, height * 0.83, width * 0.76, height * 0.06, accent, 200);
      break;
    case 'banner':
      drawRect(buffer, width, height, width * 0.04, height * 0.2, width * 0.92, height * 0.58, accent, 160);
      drawRect(buffer, width, height, width * 0.08, height * 0.32, width * 0.56, height * 0.12, { r: 255, g: 255, b: 255 }, 80);
      drawRect(buffer, width, height, width * 0.08, height * 0.5, width * 0.8, height * 0.09, softAccent, 120);
      break;
    case 'chat':
      for (let index = 0; index < 5; index += 1) {
        const y = height * (0.15 + index * 0.15);
        drawRect(buffer, width, height, width * 0.08, y, width * (0.62 + (index % 2) * 0.14), height * 0.08, softAccent, 140);
        drawCircle(buffer, width, height, width * 0.14, y + height * 0.04, height * 0.025, accent, 180);
      }
      break;
    case 'progress':
      drawRect(buffer, width, height, width * 0.08, height * 0.35, width * 0.84, height * 0.18, { r: 255, g: 255, b: 255 }, 70);
      drawRect(buffer, width, height, width * 0.08, height * 0.35, width * 0.57, height * 0.18, accent, 180);
      drawRect(buffer, width, height, width * 0.08, height * 0.6, width * 0.5, height * 0.07, softAccent, 140);
      break;
    case 'split':
      drawRect(buffer, width, height, width * 0.07, height * 0.16, width * 0.38, height * 0.58, accent, 120);
      drawRect(buffer, width, height, width * 0.55, height * 0.16, width * 0.38, height * 0.58, softAccent, 120);
      drawRect(buffer, width, height, width * 0.18, height * 0.78, width * 0.64, height * 0.08, accent, 170);
      break;
    case 'spotlight':
      drawCircle(buffer, width, height, width * 0.5, height * 0.38, width * 0.23, accent, 170);
      drawRect(buffer, width, height, width * 0.18, height * 0.7, width * 0.64, height * 0.1, softAccent, 160);
      break;
    case 'schedule':
      for (let index = 0; index < 5; index += 1) {
        const y = height * (0.18 + index * 0.12);
        drawRect(buffer, width, height, width * 0.08, y, width * 0.18, height * 0.08, accent, 180);
        drawRect(buffer, width, height, width * 0.31, y, width * 0.58, height * 0.08, softAccent, 120);
      }
      break;
    case 'pause':
      drawRect(buffer, width, height, width * 0.38, height * 0.22, width * 0.08, height * 0.42, accent, 200);
      drawRect(buffer, width, height, width * 0.54, height * 0.22, width * 0.08, height * 0.42, accent, 200);
      drawRect(buffer, width, height, width * 0.18, height * 0.74, width * 0.64, height * 0.08, softAccent, 120);
      break;
    case 'lowerThird':
      drawRect(buffer, width, height, width * 0.04, height * 0.24, width * 0.92, height * 0.52, accent, 150);
      drawRect(buffer, width, height, width * 0.08, height * 0.34, width * 0.46, height * 0.14, { r: 255, g: 255, b: 255 }, 70);
      drawRect(buffer, width, height, width * 0.08, height * 0.55, width * 0.72, height * 0.08, softAccent, 130);
      break;
    case 'card':
      drawRect(buffer, width, height, width * 0.13, height * 0.13, width * 0.74, height * 0.74, accent, 120);
      drawRect(buffer, width, height, width * 0.2, height * 0.24, width * 0.6, height * 0.12, { r: 255, g: 255, b: 255 }, 80);
      drawRect(buffer, width, height, width * 0.2, height * 0.46, width * 0.48, height * 0.08, softAccent, 120);
      drawRect(buffer, width, height, width * 0.2, height * 0.62, width * 0.4, height * 0.08, softAccent, 120);
      break;
    default:
      drawCircle(buffer, width, height, width * 0.5, height * 0.5, Math.min(width, height) * 0.2, accent, 140);
      break;
  }
}

function buildBuffer(spec) {
  const colors = spec.background.map(hexToRgb);
  const buffer = Buffer.alloc(spec.width * spec.height * 4);

  for (let y = 0; y < spec.height; y += 1) {
    const verticalMix = y / Math.max(1, spec.height - 1);
    for (let x = 0; x < spec.width; x += 1) {
      const horizontalMix = x / Math.max(1, spec.width - 1);
      const base = mixColors(colors, (verticalMix * 0.7) + (horizontalMix * 0.3));
      const glow = Math.max(0, 1 - Math.hypot(x - spec.width * 0.78, y - spec.height * 0.2) / (Math.max(spec.width, spec.height) * 0.7));
      const color = blend(base, hexToRgb(spec.accent), glow * 0.18);
      const index = (y * spec.width + x) * 4;
      buffer[index] = color.r;
      buffer[index + 1] = color.g;
      buffer[index + 2] = color.b;
      buffer[index + 3] = 255;
    }
  }

  drawPattern(buffer, spec.width, spec.height, spec);
  return buffer;
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (let index = 0; index < buffer.length; index += 1) {
    crc ^= buffer[index];
    for (let bit = 0; bit < 8; bit += 1) {
      const mask = -(crc & 1);
      crc = (crc >>> 1) ^ (0xedb88320 & mask);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const name = Buffer.from(type, 'ascii');
  const crcSource = Buffer.concat([name, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(crcSource), 0);
  return Buffer.concat([length, name, data, crc]);
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const stride = width * 4;
  const scanlines = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * (stride + 1);
    scanlines[rowOffset] = 0;
    rgba.copy(scanlines, rowOffset + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

function main() {
  PREVIEW_SPECS.forEach((spec) => {
    const rgba = buildBuffer(spec);
    const png = encodePng(spec.width, spec.height, rgba);
    const outputPath = path.join(ROOT_DIR, spec.output.replace(/\//g, path.sep));
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, png);
  });

  process.stdout.write(`Generated ${PREVIEW_SPECS.length} preview cards.\n`);
}

main();
