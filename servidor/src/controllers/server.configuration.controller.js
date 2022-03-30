const numCPUs = require('os').cpus().length;

const getServerConfiguration = (req, res) => {
    const serverConfiguration = {
        argv: process.argv.slice(2),
        platform: process.platform,
        version: process.version,
        memory: process.memoryUsage.rss(),
        executable: process.execPath,
        pid: process.ppid,
        path: process.cwd(),
        cpus: numCPUs,
    };
    res.json(serverConfiguration);
};

module.exports = {
    getServerConfiguration,
};