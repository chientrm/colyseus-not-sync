import { exec } from 'child_process';
import esbuild from 'esbuild';

esbuild
  .context({
    entryPoints: ['index.ts'],
    outdir: 'dist',
    bundle: true,
    format: 'esm',
    plugins: [
      {
        name: 'on-end',
        setup(build) {
          build.onStart(() => {
            console.log('Cleaning up...');
            exec('rm -rf dist');
          });
          build.onEnd(() => {
            console.log('Building types...');
            exec('npx tsc -p tsconfig.json');
            console.log('Build success!');
          });
        }
      }
    ]
  })
  .then((context) => context.watch())
  .then(() => {
    console.log('Watching...');
  });
