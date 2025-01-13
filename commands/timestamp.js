const Command = require('../lib/Command')
const getMessageTimestamp = async (sock, message) => {
    try {
        const timestamp = message.messageTimestamp;
        if (!timestamp) {
            await console.wa("Timestamp not found.",message);
            return;
        }

        // Convert timestamp to milliseconds and format to Nigerian time
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const options = { timeZone: "Africa/Lagos", hour12: true, weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
        const formattedTime = date.toLocaleString("en-US", options);

        // Send the formatted time
        await console.wa(`The message was sent on: ${formattedTime}\n\n> Command added by GPT. ❤️`,message);
    } catch (error) {
        console.error("Error getting timestamp:", error);
        await console.wa("An error occurred while fetching the timestamp.",message);
    }
};

// Add the command to your handler
const timestampCommand = new Command(
    "timestamp",
    "Get the timestamp of a message in Nigerian time.",
    getMessageTimestamp,
    "public",
    "Utility",
    false
);
module.exports = { timestampCommand }
