import 'dotenv/config';
import { prisma } from '../config/db.js';
import { importSet } from '../modules/cards/cards.import.js';

const DEFAULT_SETS = ['swsh3'];

const args = process.argv.slice(2);
const setIds = args.length > 0 ? args : DEFAULT_SETS;

try {
  for (const setId of setIds) {
    console.log(`Importando ${setId}...`);
    const { setName, saved } = await importSet(setId);
    console.log(`  ${setName}: ${saved} cartas guardadas`);
  }
} catch (err) {
  console.error('Error en la importación:', err);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}