const { spawn } = require('child_process');

const commands = [
  { name: 'ESLint', cmd: 'eslint', args: ['.', '--cache', '-f', 'friendly'] },
  { name: 'Stylelint', cmd: 'stylelint', args: ['--cache', '{src,stories}/**/*.{html,scss}'] },
  { name: 'TypeScript', cmd: 'tsc', args: ['-p', '.', '--noEmit'] }
];

const processes = commands.map(({ name, cmd, args }) => {
  console.log(`Starting ${name}...`);
  const process = spawn(cmd, args, { 
    stdio: 'inherit',
    shell: true 
  });
  
  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`${name} failed with code ${code}`);
    } else {
      console.log(`${name} completed successfully`);
    }
  });
  
  return process;
});

// 等待所有进程完成
Promise.all(processes.map(proc => new Promise((resolve) => {
  proc.on('close', resolve);
}))).then(() => {
  console.log('All lint commands completed');
  process.exit(0);
}).catch((error) => {
  console.error('Error running lint commands:', error);
  process.exit(1);
});
