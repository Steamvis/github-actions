const exec = require('@actions/exec')

const ssh = async (sshUser, sshHost, command) => {
    try {
        await exec.exec('ssh', [`${sshUser}@${sshHost}`, command])
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const scpFrom = async (sshUser, sshHost, pathFrom, filepath) => {
    try {
        await exec.exec('scp', [`${sshUser}@${sshHost}:${pathFrom}`, filepath])
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const scpTo = async (sshUser, sshHost, filepath, pathTo) => {
    try {
        await exec.exec('scp', [filepath,`${sshUser}@${sshHost}:${pathTo}`])
    } catch(error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    scpFrom,
    scpTo,
    ssh
}
