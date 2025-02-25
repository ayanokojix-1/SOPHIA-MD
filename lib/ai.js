const axios = require('axios')
async function gpt(query, userId) {
    try{
        const response = await axios.get(`https://bk9.fun/ai/GPT4o?q=${encodeURIComponent(query)}&userId=${userId}`);
        const res = response.data.BK9;
        return res;
    }catch(error){
        console.log("An error occurred ",error.message)
        return null;
    }
}

async function claude(query, userId) {
    try{
        const response = await axios.get(`https://bk9.fun/ai/Claude-Opus?q=${encodeURIComponent(query)}&userId=${userId}`);
        const res = response.data.BK9;
        return res;
    }catch(error){
        console.log(error)
        return error;
    }
}
module.exports = { gpt,claude}