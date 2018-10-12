const child_process = require('child_process');
const count = process.argv[2];
for(let i = 0; i<count; i++) {
    child_process.exec('node client.js', (error, stdout, stderr) => {
        if (error) {
            console.error('exec error: '+error);
        }
        console.log('stdout: '+stdout);
    });
}