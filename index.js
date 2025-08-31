const { exec } = require('child_process');

function executeCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function createBranch(branchName) {
    try {
        const result = await executeCommand(`git checkout -b ${branchName}`);
        console.log(`Branch erstellt: ${branchName}`);
    } catch (error) {
        console.error(error);
    }
}

async function listBranches() {
    try {
        const result = await executeCommand('git branch -v');
        console.log(`Verfügbare Branches:\n${result}`);
    } catch (error) {
        console.error(error);
    }
}

async function deleteBranch(branchName) {
    try {
        const result = await executeCommand(`git branch -d ${branchName}`);
        console.log(`Branch gelöscht: ${branchName}`);
    } catch (error) {
        console.error(error);
    }
}

// Beispielnutzung:
(async () => {
    await createBranch('feature/example');
    await listBranches();
    await deleteBranch('feature/example');
})();
