const os = require('os');
const fs = require('fs');

setInterval(() => {
    const systemInfo = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Cores: ${os.cpus().length}
Free Memory: ${os.freemem()}
----------------------------
`;

    fs.appendFile('system.log', systemInfo, (err) => {
        if (err) console.error('Logging failed');
    });
}, 5000);
