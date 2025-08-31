const { exec } = require('child_process');

/**
 * Execute a shell command and return the result as a promise.
 * @param {string} command - The command to execute.
 * @returns {Promise<string>} - The output of the command.
 */
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

/**
 * Create a new git branch with the specified name.
 * @param {string} branchName - The name of the branch to create.
 */
async function createBranch(branchName) {
    try {
        const result = await executeCommand(`git checkout -b ${branchName}`);
        console.log(`Branch erstellt: ${branchName}`);
    } catch (error) {
        console.error(`Fehler beim Erstellen des Branchs: ${error}`);
    }
}

/**
 * List all available git branches.
 */
async function listBranches() {
    try {
        const result = await executeCommand('git branch -v');
        console.log(`Verfügbare Branches:\n${result}`);
    } catch (error) {
        console.error(`Fehler beim Auflisten der Branches: ${error}`);
    }
}

/**
 * Delete the specified git branch.
 * @param {string} branchName - The name of the branch to delete.
 */
async function deleteBranch(branchName) {
    try {
        const result = await executeCommand(`git branch -d ${branchName}`);
        console.log(`Branch gelöscht: ${branchName}`);
    } catch (error) {
        console.error(`Fehler beim Löschen des Branchs: ${error}`);
    }
}

// Beispielnutzung:
(async () => {
    await createBranch('feature/example');
    await listBranches();
    await deleteBranch('feature/example');
})();