import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function getLatestCommitDate() {
  try {
    const iso = execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim();
    return iso;
  } catch {
    return new Date().toISOString();
  }
}

function main() {
  const pkgPath = resolve(process.cwd(), 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const version = pkg.version;
  const commitDate = getLatestCommitDate();

  const out = `// Auto-generated file. Do not edit.
export const APP_VERSION = '${version}';
export const APP_BUILD_DATE = '${commitDate}';
`;
  const target = resolve(process.cwd(), 'src', 'version.ts');
  writeFileSync(target, out, 'utf8');
  console.log(`Wrote ${target}: version=${version}, date=${commitDate}`);
}

main();
