const qrcode = require('qrcode-terminal')
const msgs = require('./msg')
const { Client } = require('whatsapp-web.js')
const client = new Client()

client.on('qr', qr => qrcode.generate(qr, {small: true}))
client.on('ready', () => console.log('Olá senhor, estou à suas ordens 🕵🏼'))

client.on('message', message => {
    const {author, body, deviceType} = message
    const includes = msgs.includes(body.toLowerCase())
    if(author !== undefined) return
    if(body === '!info'){
        return message.reply(`Olá ${message._data.notifyName}! abre o 👀, sei que esta usando um aparelho ${deviceType === 'android' ? 'android' : 'apple'}`)
    }
	if(includes) {
		return message.reply(`Olá ${message._data.notifyName}! sou o bot do Bruno 😎`)
	}
})

client.initialize()