const qrcode = require('qrcode-terminal')
const msgs = require('./msg')
const { Client} = require('whatsapp-web.js')
const client = new Client()

client.on('qr', qr => qrcode.generate(qr, {small: true}))
client.on('ready', () => console.log('Olá senhor, estou à suas ordens 🕵🏼'))

client.on('message', message => {
    //Configs
    const {author, body, deviceType} = message
    if(author !== undefined) return
    const Msg = body.toLowerCase()
    const hello = msgs.includes(Msg)

    //Comandos
    if(Msg === '!info') {
        return message.reply(
            `Olá ${message._data.notifyName}! abre o 👀, sei que esta usando um smartphone ${deviceType === 'ios' ? 'apple' : deviceType}`
        )
    }
    if(Msg === '!help') return message.reply('comandos:\n!help\n!info')
	if(hello) return message.reply('Oi! tudo bem?')

    // Personalizadas
    if(Msg === 'obrigado' || Msg === 'obrigada') return message.reply('de nada 😄')
    if(Msg === 'valeu' || Msg === 'vlw') return message.reply('é nois 😎')
})

client.initialize()