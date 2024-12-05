const Command = require('../lib/Command');
const axios = require('axios');

// Function to Handle Trivia Command
const handleTriviaCommand = async (sock, message) => {
    const chatId = message.key.remoteJid;

    // Step 1: Prompt users to select the game mode (difficulty and category)
    await sock.sendMessage(chatId, { text: 'Please select a mode for the trivia game:\n1. Easy\n2. Medium\n3. Hard\nReply with the number corresponding to your choice.' });

    const difficulty = await getGameMode(sock, chatId);
    if (!difficulty) return; // If no valid difficulty is chosen, exit.

    // Step 2: Register players
    await sock.sendMessage(chatId, { text: 'You have 60 seconds to join! Type "join" to participate in the trivia game.' });

    const players = await registerPlayers(sock, chatId);
    if (players.size < 2) {
        await sock.sendMessage(chatId, { text: 'Not enough players joined. Game canceled.' });
        return;
    }

    // Step 3: Start the trivia game
    await sock.sendMessage(chatId, { text: `Game starting! Players: ${[...players].join(', ')}` });
    await startTriviaGame(sock, chatId, players, difficulty);
};

// Function to Get Game Mode (Difficulty)
const getGameMode = async (sock, chatId) => {
    return new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(null), 30000); // 30 seconds to choose mode

        const handler = async (message) => {
            const { text, remoteJid } = message;
            if (remoteJid === chatId && ['1', '2', '3'].includes(text.trim())) {
                clearTimeout(timeout);
                sock.ev.off('messages.upsert', handler); // Remove listener after selection

                const mode = text.trim();
                const difficultyMap = { '1': 'easy', '2': 'medium', '3': 'hard' };
                await sock.sendMessage(chatId, { text: `You selected ${difficultyMap[mode]} mode.` });
                resolve(difficultyMap[mode]);
            }
        };

        sock.ev.on('messages.upsert', handler); // Replace sock.on with sock.ev.on
    });
};

// Function to Register Players
const registerPlayers = async (sock, chatId) => {
    const players = new Set(); // Store unique players
    const registrationTimeout = 60000; // 60 seconds for players to join
    const registrationEnd = Date.now() + registrationTimeout;

    const handler = async (message) => {
        const { remoteJid, text, key } = message;

        if (remoteJid === chatId && text.trim().toLowerCase() === 'join') {
            if (players.has(key.remoteJid)) {
                await sock.sendMessage(remoteJid, { text: `You’ve already joined the game!` });
            } else {
                players.add(key.remoteJid); // Add player to the set
                await sock.sendMessage(remoteJid, { text: `You’ve successfully joined the game!` });
            }
        }
    };

    sock.ev.on('messages.upsert', handler); // Replace sock.on with sock.ev.on

    // Wait for registration to end
    while (Date.now() < registrationEnd) {
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    sock.ev.off('messages.upsert', handler); // Remove listener after registration ends

    // Notify users that registration has ended
    await sock.sendMessage(chatId, { text: `Registration has ended! Players: ${[...players].join(', ')}` });

    return players;
};

// Function to Fetch Trivia Questions from API
const fetchTriviaQuestions = async (difficulty) => {
    try {
        const response = await axios.get('https://opentdb.com/api.php', {
            params: {
                amount: 5,
                difficulty: difficulty,
                type: 'multiple',
            },
        });

        return response.data.results;
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        return [];
    }
};

// Function to Start the Trivia Game
const startTriviaGame = async (sock, chatId, players, difficulty) => {
    const questions = await fetchTriviaQuestions(difficulty);
    if (questions.length === 0) {
        await sock.sendMessage(chatId, { text: 'Failed to fetch trivia questions. Please try again later.' });
        return;
    }

    let remainingPlayers = [...players];
    let currentPlayerIndex = 0;

    for (let i = 0; i < questions.length; i++) {
        const currentQuestion = questions[i];
        const answers = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer).sort(() => Math.random() - 0.5);
        const answerOptions = answers.map((ans, index) => `${String.fromCharCode(65 + index)}. ${ans}`).join('\n');

        const currentPlayer = remainingPlayers[currentPlayerIndex];
        await sock.sendMessage(chatId, { text: `It's your turn, <@${currentPlayer}>! Answer the question below:\n\n${currentQuestion.question}\n\n${answerOptions}` });

        const questionTimeout = 15000;
        const questionEndTime = Date.now() + questionTimeout;

        const correctAnswers = [];
        const playerResponses = new Map();

        const handler = (message) => {
            if (Date.now() > questionEndTime) return;

            const { remoteJid, text, key } = message;
            const response = text.trim().toLowerCase();

            if (remainingPlayers.includes(key.remoteJid) && response === currentQuestion.correct_answer.toLowerCase()) {
                if (!correctAnswers.includes(key.remoteJid)) {
                    correctAnswers.push(key.remoteJid);
                }
                playerResponses.set(key.remoteJid, 'correct');
            } else if (remainingPlayers.includes(key.remoteJid)) {
                playerResponses.set(key.remoteJid, 'wrong');
            }
        };

        sock.ev.on('messages.upsert', handler); // Replace sock.on with sock.ev.on

        await new Promise(resolve => setTimeout(resolve, questionTimeout));
        sock.ev.off('messages.upsert', handler); // Remove listener after question ends

        remainingPlayers = remainingPlayers.filter(player => playerResponses.get(player) === 'correct');

        if (remainingPlayers.length === 1) {
            await sock.sendMessage(chatId, { text: `The game has ended! ${remainingPlayers[0]} is the winner! 🎉` });
            return;
        }

        await sock.sendMessage(chatId, {
            text: `Question ${i + 1} ended! Correct answers: ${correctAnswers.join(', ')}.\nRemaining players: ${remainingPlayers.join(', ')}`
        });

        if (remainingPlayers.length === 0) {
            await sock.sendMessage(chatId, { text: 'All players are eliminated. Game Over.' });
            return;
        }

        currentPlayerIndex = (currentPlayerIndex + 1) % remainingPlayers.length;
    }
};

// Register command
const triviaCommand = new Command('trivia', 'Starts a trivia game with elimination rules', handleTriviaCommand);

module.exports = triviaCommand;
