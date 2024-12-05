const fs = require('fs');
const path = require('path');
const { registerCommand } = require('./commandHandler'); // Import the registerCommand function

// Dynamically register all commands from the commands directory
const registerCommands = () => {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const commandModule = require(path.join(commandsPath, file));

        // If the module exports a single command (pingCommand, for example)
        if (commandModule && typeof commandModule === 'function') {
            // Register the single command
            registerCommand(commandModule);
        } else if (commandModule && typeof commandModule === 'object') {
            // If it's an object, loop through the properties (multiple commands)
            Object.values(commandModule).forEach(command => {
                registerCommand(command); // Register each command individually
            });
        }
    });
};

// Export the registerCommands function
module.exports = { registerCommands };