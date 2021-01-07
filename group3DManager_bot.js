const _ = require('lodash');

// Environments config
const env = process.env.NODE_ENV || 'production';
const dotenv = require('custom-env').env('group3DManager')
dotenv.config();

// JSON Config
const config = require('./config/config.json');
const botConfig = config.group3DManager;
// Bot admin info
const botAdmin = botConfig.adminID
const botName = botConfig.botname

//Keyboards Config
const inlineButtons = botConfig.inlineButtons;

const Telegram = require('telegraf/telegram')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const token = process.env.BOT_TOKEN
const bot = new Telegraf(token)

// Messages
const welcomeMessage = botConfig.welcomeMessage

// Reply to objects
var replyToId = 0;

bot.start((ctx) => {
    console.log(ctx)

    const chatFrom = ctx.message.from

    const senderName = chatFrom.first_name
    const senderLastName = chatFrom.last_name
    const senderId = chatFrom.id

    const deleteMessageId = ctx.message.message_id
    const deleteMessagechatId = ctx.update.message.chat.id

    // Inform the admin, somebody started the Bot 
    if (senderId != botAdmin) {
        bot.telegram.sendMessage(
            botAdmin,
            `${senderName} ${senderLastName} id: ${senderId}, Started the ${botName}`
        )

    }

    // Delete the '/start' command from the chat
    ctx.telegram.deleteMessage(deleteMessagechatId, deleteMessageId)
    let ciaoMessageUser = 'Ciao ' + senderName + ' ' + welcomeMessage

    ctx.reply(ciaoMessageUser
    ).then(() => {

    })

})

// Launch Bot
bot.launch()