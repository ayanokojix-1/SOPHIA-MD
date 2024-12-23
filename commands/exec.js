const { exec } = require('child_process');
const Command = require('../lib/Command');

// This function runs shell commands via exec
async function handleExecCommand(sock, message, args) {
    // Allowed users: Check if it's from the bot owner or a specific WhatsApp number
    const allowedUser = message.key.fromMe || message.key.remoteJid === '2347017895743@s.whatsapp.net';  // Replace with your phone number
    
    if (!allowedUser) {
        sock.sendMessage(message.key.remoteJid, { text: 'You do not have permission to run this command.' });
        return;
    }

    if (args.length === 0) {
        sock.sendMessage(message.key.remoteJid, { text: 'Please provide a shell command to execute.' });
        return;
    }

    const command = args.join(' ');  // Join the arguments to form the full command

    try {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                sock.sendMessage(message.key.remoteJid, { text: `Error executing command: ${error.message}` });
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                sock.sendMessage(message.key.remoteJid, { text: `stderr: ${stderr}` });
                return;
            }

            // Send back the output of the command
            sock.sendMessage(message.key.remoteJid, { text: `Output:\n${stdout}` });
        });
    } catch (error) {
        console.error('Error executing command:', error);
        sock.sendMessage(message.key.remoteJid, { text: 'Failed to execute command.' });
    }
}

// Command structure
const execCommand = new Command(
    'exec',
    'Executes shell commands on the bot server',
    handleExecCommand,
    'owner', // Restrict to owners for security
    'Utility',
    false
);

module.exports = { execCommand };
