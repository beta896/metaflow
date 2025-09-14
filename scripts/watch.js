import { spawn } from 'child_process';
import chokidar from 'chokidar';

let proc;

function restart() {
  if (proc) proc.kill();
  proc = spawn('node', ['server.js'], { stdio: 'inherit' });
}

chokidar
  .watch(['server.js', 'routes', 'cli'], {
    ignored: /node_modules/,
    ignoreInitial: true,
  })
  .on('all', (event, path) => {
    console.log(`🔁 File changed: ${path}`);
    restart();
  });

restart();