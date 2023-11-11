import fs from 'fs';
import path from 'path';
import typescript from 'rollup-plugin-typescript2';
const packagesDir = path.resolve(__dirname, 'packages');
const packageFiles = fs.readdirSync(packagesDir);

function output(path) {
  return [
    {
      input: [`./packages/${path}/src/index.ts`],
      output: [
        {
          file: `./packages/${path}/dist/index.js`,
          format: 'umd',
          name: 'create-app-w',
          sourcemap: true
        }
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              module: 'ESNext'
            }
          },
          useTsconfigDeclarationDir: true
        })
      ]
    }
  ];
}

const config = [...packageFiles.map((path) => output(path)).flat()]
console.log(config, 'config')
export default config;
