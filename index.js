const qrcode = require('qrcode-terminal')
const msgs = require('./msg')
const { Client} = require('whatsapp-web.js')
const client = new Client()

client.on('qr', qr => qrcode.generate(qr, {small: true}))
client.on('ready', () => console.log('Olá senhor, estou atento à tudo! 🕵🏼'))

client.on('message', message => {
    //Configs
    const {author, body, deviceType} = message
    const Msg = body.toLowerCase()
    const hello = msgs.includes(Msg)

    
    // Geral
    if(Msg === 'obrigado' || Msg === 'obrigada') return message.reply('de nada 😄')
    if(Msg === 'valeu' || Msg === 'vlw') return message.reply('tamo junto 😎')


    const salt = '' // hash localizado em message.id.remote do grupo que quer
    let array = message.id.remote.split('-')
    console.log(message.id.remote, array)
    if(array[1] === salt && Msg === '!teste') return message.reply('teste')
    
    // APENAS EM PRIVADO
    if(author !== undefined) return 

    if(Msg === '!info') {
        return message.reply(
            `Olá ${message._data.notifyName}! abre o 👀, sei que esta usando um  ${deviceType === 'ios' ? 'iphone' : deviceType}`
        )
    }

    if(hello) return message.reply('Oi! tudo bem?')

    if(Msg === '!help') return message.reply('comandos:\n!help\n!info')
})

client.initialize()