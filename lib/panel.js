const fs = require('fs');
const Chance = require('chance')
const axios = require('axios');
const config = require('../config');
const panelFile = './database/panel.json';
if(fs.existsSync(panelFile)){
  const panel = fs.readFileSync(panelFile,'utf8')
  const keys = json.parse(panel)
}
const API_KEY = keys.apiKey || null
const PANEL_URL = keys.panelUrl || null; 
const password = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 6; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
};

const email = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let pass = "";
    for (let i = 0; i < 6; i++) {
        pass += chars[Math.floor(Math.random() * chars.length)];
    }
    return pass;
};
const chance = new Chance()
 const randomName = chance.name().split(' ')

const createUser = async (admin=false) => {
  try {
    const pass = password();
    const options = {
      email: `${email()}@gmail.com`,
      username: email(),
      first_name: randomName[0],
      last_name: randomName[1],
      password: pass, // Set a secure password
      root_admin: admin, // Set to true if you want this user to be an admin
    };

    const response = await axios.post(
      `${PANEL_URL}/api/application/users`,
      options,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );
   
    const userId = response.data.attributes.id;
    return {
      info:options,
      id:userId
    };
  } catch (error) {
    console.error("Error creating user:", error.response?.data || error.message);
  }
};


const createServer = async (panelName,userId,ram,cpu,allocation) => {
    try {
      
        const response = await axios.post(
            `${PANEL_URL}/api/application/servers`,
            {
                name: panelName,
                user: userId,
                nest: 1,
                egg: 15,
                docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                startup: `if [[ -d .git ]] && [[ "$AUTO_UPDATE" == "1" ]]; then git pull; fi;
                          if [[ ! -z "$NODE_PACKAGES" ]]; then /usr/local/bin/npm install $NODE_PACKAGES; fi;
                          if [[ ! -z "$UNNODE_PACKAGES" ]]; then /usr/local/bin/npm uninstall $UNNODE_PACKAGES; fi;
                          if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;
                          if [[ ! -z "$CUSTOM_ENVIRONMENT_VARIABLES" ]]; then vars=$(echo "$CUSTOM_ENVIRONMENT_VARIABLES" | tr ";" "\n");
                          for line in $vars; do export $line; done; fi;
                          /usr/local/bin/$CMD_RUN`,
                environment: {
                    AUTO_UPDATE: "1",
                    NODE_PACKAGES: "express",
                    CUSTOM_ENVIRONMENT_VARIABLES: "VAR1=value1;VAR2=value2",
                    CMD_RUN: "npm start" // You can change this to the actual startup command
                },
                limits: {
                    memory: ram,
                    cpu: cpu,
                    disk: ram,
                    swap: 0,
                    io: 500,
                },
                feature_limits: {
                    databases: 1,
                    allocations: 1,
                    backups: 1
                },
                allocation: {
                    default: allocation
                }
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        return "server created successfully"
    } catch (error) {
        console.error("Error creating server:", error.response?.data || error.message);
        throw error
    }
};

// Function to create panel.json if it doesn't exist
function createPanelConfig() {
    if (!fs.existsSync(panelFile)) {
        const defaultConfig = { mode: 'off', apiKey: '', panelUrl: '' };
        fs.writeFileSync(panelFile, JSON.stringify(defaultConfig, null, 2));
    }
}
// Function to read panel configuration
function getPanelConfig() {
    if (!fs.existsSync(panelFile)) return null;
    const data = JSON.parse(fs.readFileSync(panelFile, 'utf8'));
    if (!data.apiKey || !data.panelUrl) return null;

    // Hide API key (show only first 6 characters)
    const hiddenKey = data.apiKey.slice(0, 6) + '*'.repeat(data.apiKey.length - 6);

    return { mode: data.mode || 'off', apiKey: hiddenKey, panelUrl: data.panelUrl };
}

// Function to set panel configuration (only if empty)
function setPanelConfig(apiKey, panelUrl) {
    if (fs.existsSync(panelFile)) {
        const data = JSON.parse(fs.readFileSync(panelFile, 'utf8'));
        if (data.apiKey && data.panelUrl) return false; // Prevent overwriting existing config
    }

    fs.writeFileSync(panelFile, JSON.stringify({ mode: 'off', apiKey, panelUrl }, null, 2));
    return true;
}

// Function to update API key or Panel URL
function updatePanelConfig(type, value) {
    if (!fs.existsSync(panelFile)) return false;
    const data = JSON.parse(fs.readFileSync(panelFile, 'utf8'));

    if (type === 'api') data.apiKey = value;
    else if (type === 'url') data.panelUrl = value;
    else return false;

    fs.writeFileSync(panelFile, JSON.stringify(data, null, 2));
    return true;
}

// Function to delete API key or Panel URL
function deletePanelConfig(type) {
    if (!fs.existsSync(panelFile)) return false;
    const data = JSON.parse(fs.readFileSync(panelFile, 'utf8'));

    if (type === 'api') delete data.apiKey;
    else if (type === 'url') delete data.panelUrl;
    else return false;

    fs.writeFileSync(panelFile, JSON.stringify(data, null, 2));
    return true;
}

// Function to toggle panel mode (on/off)
function togglePanelMode(mode) {
    if (!fs.existsSync(panelFile)) return false;
    const data = JSON.parse(fs.readFileSync(panelFile, 'utf8'));

    data.mode = mode;
    fs.writeFileSync(panelFile, JSON.stringify(data, null, 2));
    return true;
}



module.exports = { createUser, createServer,getPanelConfig,createPanelConfig, setPanelConfig, updatePanelConfig, deletePanelConfig, togglePanelMode }
/*(async ()=>{
const userA = await createUser()
const userId = userA.id
 const output = await createServer('ayanokojix',userId,2048,100,7)
console.log(output)
  console.log(`
 email: ${userA.info.email}
 username: ${userA.info.username}
 password: ${userA.info.password}
  `)
})()*/