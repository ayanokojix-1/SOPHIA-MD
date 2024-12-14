const { exec } = require('child_process');

/**
 * Executes a shell command and returns its output.
 * @param {string} cmd The shell command to execute.
 * @returns {Promise<string>} Resolves with the command's output.
 */
function runShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) reject(stderr || error.message);
            else resolve(stdout.trim());
        });
    });
}

/**
 * Updates the bot from the specified repository.
 * @param {string} repoUrl The Git repository URL.
 * @param {string} branch The branch to pull from.
 * @returns {Promise<string>} Resolves with the update log.
 */
async function updateBot(repoUrl, branch = 'main') {
    try {
        // Add the repo as a remote (if not already added)
        await runShellCommand(`git remote add sophia ${repoUrl} || true`);
        
        // Fetch latest changes from the specified branch
        await runShellCommand(`git fetch sophia ${branch}`);
        
        // Merge the fetched branch into the current branch
        return await runShellCommand(`git pull sophia ${branch}`);
    } catch (error) {
        throw new Error(`Update failed: ${error}`);
    }
}

module.exports = { runShellCommand, updateBot };
