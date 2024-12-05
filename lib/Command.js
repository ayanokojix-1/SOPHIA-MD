const config = require('../config'); // Import config

class Command {
    constructor(name, description, execute, accessLevel = 'public', category = 'General', isGroupOnly = false) {
        this.name = name; // Command name
        this.description = description; // Command description
        this.execute = execute; // Function to execute the command
        this.accessLevel = accessLevel; // Access level: public, private, owner
        this.category = category; // Command category
        this.isGroupOnly = isGroupOnly; // Restrict command to group chats
    }

    // Get the full command with the prefix
    get fullCommand() {
        return `${config.HANDLER}${this.name}`;
    }
}

module.exports = Command;
