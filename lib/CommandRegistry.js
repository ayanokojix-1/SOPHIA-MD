const fs = require('fs');
const path = require('path');
const { registerCommand } = require('./commandHandler'); // Import the registerCommand function

// Dynamically register all commands from the commands directory
const registerCommands = () => {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    commandFiles.forEach(file => {
        const commandModule = require(path.join(commandsPath, file));

        // Only register if the module exports an object (curly braces)
        if (commandModule && typeof commandModule === 'object') {
            // Loop through the properties (if it's multiple commands in an object)
            Object.values(commandModule).forEach(command => {
                registerCommand(command); // Register each command individually
            });
        } else {
            console.warn(`Skipping non-object export in file: ${file}`);
        }
    });
};

// Export the registerCommands function
module.exports = { registerCommands };
