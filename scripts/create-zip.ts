import fs from 'fs';
import archiver from 'archiver';
import chalk from 'chalk';

const packageJson = fs.readFileSync('package.json', 'utf8');
const packageData = JSON.parse(packageJson);

const currentDirectory = process.cwd();
const sourceFolder = `${currentDirectory}/dist`;
const zipFilePath = `${currentDirectory}/${packageData.name}-${packageData.version}.zip`;

try {
  const output = fs.createWriteStream(zipFilePath);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  archive.pipe(output);

  archive.directory(sourceFolder, false);

  archive.finalize().then(() => {
    console.log(chalk.hex('#55D187')('压缩成功，压缩包输出至当前文件夹下'));
  });
} catch (e) {
  console.log(e);
  console.log(chalk.hex('#F56C6C')('压缩失败'));
  process.exit(1);
}
