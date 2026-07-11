import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const outputDirectory = resolve(process.argv[2] || 'dist');
const ga4Id = process.env.GA4_MEASUREMENT_ID || 'G-2JYN478JNT';
const yandexId = process.env.YANDEX_METRIKA_ID || '';

await mkdir(outputDirectory, { recursive: true });
const analyticsPath = resolve(outputDirectory, 'analytics.js');
const analyticsSource = await readFile(analyticsPath, 'utf8');
const configSource = `window.MY_SUPSUN_ANALYTICS=${JSON.stringify({ ga4Id, yandexId })};\n`;
await writeFile(analyticsPath, configSource + analyticsSource, 'utf8');
