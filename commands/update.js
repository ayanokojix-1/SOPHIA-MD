const { exec } = require('child_process');
const Command = require('../lib/Command');

// URL of the private GitHub repository
const repoUrl = 'https://github.com/ayanokojix-1/SOPHIA-MD.git';

// This command checks how many commits behind the bot's local repository is
async function handleUpdateCommand(sock, message, args) {
    try {
        // Fetch the latest updates from the remote repository
        exec('git fetch origin', (fetchError, fetchStdout, fetchStderr) => {
            if (fetchError) {
                console.error(`Fetch exec error: ${fetchError}`);
                sock.sendMessage(message.key.remoteJid, { text: 'Failed to fetch latest updates from the repository.' });
                return;
            }

            // Run the git status command to check how many commits behind the local repo is
            exec('git status', (statusError, statusStdout, statusStderr) => {
                if (statusError) {
                    console.error(`Status exec error: ${statusError}`);
                    sock.sendMessage(message.key.remoteJid, { text: 'Failed to check repository status.' });
                    return;
                }

                // Parse the output of the git status command to check for commits behind
                const behindMatch = statusStdout.match(/behind (\d+) commit/);
                if (behindMatch) {
                    const behind = behindMatch[1];
                    sock.sendMessage(message.key.remoteJid, {
                        text: `Your repository is ${behind} commit(s) behind the remote repository.`,
                    });
                } else {
                    sock.sendMessage(message.key.remoteJid, {
                        text: 'Your repository is up to date.',
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error checking repository status:', error);
        sock.sendMessage(message.key.remoteJid, {
            text: 'Failed to check repository status.',
        });
    }
}

// This command updates the repository by pulling the latest changes from the remote repository
async function handleUpdateNowCommand(sock, message, args) {
    try {
        // Run the git pull command to update the repository
        exec('git pull origin main', (pullError, pullStdout, pullStderr) => {
            if (pullError) {
                console.error(`Pull exec error: ${pullError}`);
                sock.sendMessage(message.key.remoteJid, { text: 'Failed to update the repository.' });
                return;
            }

            sock.sendMessage(message.key.remoteJid, {
                text: 'The repository has been successfully updated.',
            });
        });
    } catch (error) {
        console.error('Error updating repository:', error);
        sock.sendMessage(message.key.remoteJid, {
            text: 'Failed to update the repository.',
        });
    }
}

// Command structure
const updateCommand = new Command(
    'update',
    'Checks how many commits behind the repository is from the remote',
    handleUpdateCommand,
    'owner', // Restrict to owners for security
    'Utility',
    false
);

const updateNowCommand = new Command(
    'update now',
    'Updates the repository by pulling the latest changes from the remote',
    handleUpdateNowCommand,
    'owner', // Restrict to owners for security
    'Utility',
    false
);

module.exports = { updateCommand, updateNowCommand };
