const fs = require('fs');
const path = require('path');
const { registerCommand } = require('./commandHandler'); // Import the registerCommand function

const commandFileMap = new Map();

// Dynamically register all commands from the commands directory
const registerCommands = async () => {
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        try {
            const commandModule = require(path.join(commandsPath, file));

            // Only register if the module exports an object (curly braces)
            if (commandModule && typeof commandModule === 'object') {
                // Loop through the properties (if it's multiple commands in an object)
                Object.values(commandModule).forEach(command => {
                    registerCommand(command); // Register each command individually

			commandFileMap.set(command.name, file);
                });
            } else {
                console.warn(`Skipping non-object export in file: ${file}`);
            }
        } catch (error) {
            console.error(`❌ Failed to register command from ${file}:\n`, error); // Logs the full error stack
            continue; // Continue with the next command file
        }
    }
};

// Export the registerCommands function
module.exports = { registerCommands,commandFileMap };
