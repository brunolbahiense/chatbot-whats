const qrcode = require('qrcode-terminal')
const msgs = require('./msg')
const { Client} = require('whatsapp-web.js')
const client = new Client()

client.on('qr', qr => qrcode.generate(qr, {small: true}))
client.on('ready', () => console.log('Olá senhor, estou atento à tudo! 🕵🏼'))



client.on('message', message => {
    //Configs
    const {author, body, deviceType} = message
    const name = message._data.notifyName
    const Msg = body.toLowerCase()
    const hello = msgs.includes(Msg)

    const handleSend = txt => {
        client.sendMessage(message.from, txt) 
    }
    
    const handleReply = txt => {
        message.reply(txt) 
    }

    
    // Geral
    if(Msg === 'obrigado' || Msg === 'obrigada') return handleReply('de nada 😄')
    if(Msg === 'valeu' || Msg === 'vlw') return handleReply('tmj 😎')


    const salt = '' // hash localizado em message.id.remote do grupo que quer
    let array = message.id.remote.split('-')
    if(array[1] === salt && Msg === '!teste') return handleReply('teste')
    
    // APENAS EM PRIVADO
    if(author !== undefined) return 

    if(Msg === '!info') {
        return handleReply(
            `Olá ${name}! abre o 👀, sei que esta usando um  ${deviceType === 'ios' ? 'iphone' : deviceType}`
        )
    }

    if(hello) return handleSend('Oi! tudo bem?')  

    if(Msg === '!help') return handleSend('comandos:\n!help\n!info')
})

client.initialize()