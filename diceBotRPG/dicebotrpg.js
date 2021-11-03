// const env = require('../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const commandParts = require('telegraf-command-parts')
require('dotenv').config()
const bot = new Telegraf(process.env.token)

bot.command('r', ctx => {
    let diceCount, diceSides, diceMod
    const from = ctx.update.message.from
    const messageID = ctx.message.message_id
    const commArgs = ctx.message.text.split(' ')
    const regEx = /^\d+d\d+((\+|-)\d)?$/g

    try {
        if (commArgs.length == 1) {
            let rand = Math.floor(Math.random() * (20) + 1)
            ctx.replyWithHTML(`<code>1d20: [${rand}]</code> => <b>${rand}</b>`, Extra.inReplyTo(messageID))
        } else if (commArgs.length > 1) {
            if (regEx.test(commArgs[1])) {
                if (commArgs[1].includes('+')) {
                    let res = ''
                    let rand, total

                    diceCount = parseInt(commArgs[1].split('d')[0])
                    diceSides = parseInt(commArgs[1].split('d')[1].split('+')[0])
                    diceMod = parseInt(commArgs[1].split('+')[1])

                    total = diceMod

                    res = `<code>${diceCount}d${diceSides}+${diceMod}: [ `

                    for (let i = 0; i < diceCount; i++) {
                        rand = Math.floor(Math.random() * (parseInt(diceSides)) + 1)
                        res += rand
                        total += parseInt(rand)

                        if (diceCount - i > 1) res += ' + '
                    }

                    res += ` + ${diceMod} ]</code> => <b>${total}</b>`

                    ctx.replyWithHTML(res, Extra.inReplyTo(messageID))
                } else if (commArgs[1].includes('-')) {
                    let res = ''
                    let rand, total

                    diceCount = parseInt(commArgs[1].split('d')[0])
                    diceSides = parseInt(commArgs[1].split('d')[1].split('-')[0])
                    diceMod = parseInt(commArgs[1].split('-')[1])

                    total = -diceMod

                    res = `<code>${diceCount}d${diceSides}-${diceMod}: [ `

                    for (let i = 0; i < diceCount; i++) {
                        rand = Math.floor(Math.random() * (parseInt(diceSides)) + 1)
                        res += rand
                        total += parseInt(rand)

                        if (diceCount - i > 1) res += ' + '
                    }

                    if (total < diceCount) total = diceCount

                    res += ` - ${diceMod} ]</code> => <b>${total}</b>`

                    ctx.replyWithHTML(res, Extra.inReplyTo(messageID))
                } else {
                    let res = ''
                    let rand, total = 0

                    diceCount = parseInt(commArgs[1].split('d')[0])
                    diceSides = parseInt(commArgs[1].split('d')[1].split('-')[0])

                    res = `<code>${diceCount}d${diceSides}: [ `

                    for (let i = 0; i < diceCount; i++) {
                        rand = Math.floor(Math.random() * (parseInt(diceSides)) + 1)
                        res += rand
                        total += parseInt(rand)

                        if (diceCount - i > 1) res += ' + '
                    }

                    if (total < diceCount) total = diceCount

                    res += ` ]</code> => <b>${total}</b>`

                    ctx.replyWithHTML(res, Extra.inReplyTo(messageID))
                }
            } else {
                let rand = Math.floor(Math.random() * (20) + 1)
                ctx.replyWithHTML(`<code>1d20: [${rand}]</code> => <b>${rand}</b>`, Extra.inReplyTo(messageID))
            }

            console.log(from)
        }
    } catch (err) {
        ctx.reply(`Sorry, I didn't understand :(`, Extra.inReplyTo(messageID))
        console.log(err)
    }
})

bot.command('a', ctx => {
    const messageID = ctx.message.message_id
    const from = ctx.update.message.from
    const commArgs = ctx.message.text.split(' ')
    const regEx = /^(\+|-)?\d$/g

    if (commArgs.length == 1) {
        let rand1 = Math.floor(Math.random() * (20) + 1)
        let rand2 = Math.floor(Math.random() * (20) + 1)

        if (rand1 >= rand2) ctx.replyWithHTML(`<code>d20: [|${rand1}| ${rand2}]</code> => <b>${rand1}</b>`, Extra.inReplyTo(messageID))
        else ctx.replyWithHTML(`<code>d20 (advantage): [${rand1} |${rand2}|]</code> => <b>${rand2}</b>`, Extra.inReplyTo(messageID))
    } else if (commArgs.length > 1) {
        if (regEx.test(commArgs[1])) {
            let rand1 = Math.floor(Math.random() * (20) + 1)
            let rand2 = Math.floor(Math.random() * (20) + 1)
            let diceMod = parseInt(commArgs[1])
            let total = diceMod

            if (rand1 >= rand2) {
                total += rand1
                ctx.replyWithHTML(`<code>d20 (advantage) ${diceMod > 0 ? '+' : ''}${diceMod}: [|${rand1}| ${rand2}]</code> => <b>${total}</b>`, Extra.inReplyTo(messageID))
            } else {
                total += rand2
                ctx.replyWithHTML(`<code>d20 (advantage) ${diceMod > 0 ? '+' : ''}${diceMod}: [${rand1} |${rand2}|]</code> => <b>${total}</b>`, Extra.inReplyTo(messageID))
            }
        } else {
            let rand1 = Math.floor(Math.random() * (20) + 1)
            let rand2 = Math.floor(Math.random() * (20) + 1)

            if (rand1 >= rand2) ctx.replyWithHTML(`<code>d20: [|${rand1}| ${rand2}]</code> => <b>${rand1}</b>`, Extra.inReplyTo(messageID))
            else ctx.replyWithHTML(`<code>d20 (advantage): [${rand1} |${rand2}|]</code> => <b>${rand2}</b>`, Extra.inReplyTo(messageID))
        }
    } else ctx.reply(`Sorry, I didn't understand :(`, Extra.inReplyTo(messageID))

    console.log(from)
})

bot.command('d', ctx => {
    const messageID = ctx.message.message_id
    const from = ctx.update.message.from
    const commArgs = ctx.message.text.split(' ')
    const regEx = /^(\+|-)?\d$/g

    if (commArgs.length == 1) {
        let rand1 = Math.floor(Math.random() * (20) + 1)
        let rand2 = Math.floor(Math.random() * (20) + 1)

        if (rand1 <= rand2) ctx.replyWithHTML(`<code>d20: [|${rand1}| ${rand2}]</code> => <b>${rand1}</b>`, Extra.inReplyTo(messageID))
        else ctx.replyWithHTML(`<code>d20 (disadvantage): [${rand1} |${rand2}|]</code> => <b>${rand2}</b>`, Extra.inReplyTo(messageID))
    } else if (commArgs.length > 1) {
        if (regEx.test(commArgs[1])) {
            let rand1 = Math.floor(Math.random() * (20) + 1)
            let rand2 = Math.floor(Math.random() * (20) + 1)
            let diceMod = parseInt(commArgs[1])
            let total = diceMod

            if (rand1 <= rand2) {
                total += rand1
                ctx.replyWithHTML(`<code>d20 (disadvantage) ${diceMod > 0 ? '+' : ''}${diceMod}: [|${rand1}| ${rand2}]</code> => <b>${total}</b>`, Extra.inReplyTo(messageID))
            } else {
                total += rand2
                ctx.replyWithHTML(`<code>d20 (disadvantage) ${diceMod > 0 ? '+' : ''}${diceMod}: [${rand1} |${rand2}|]</code> => <b>${total}</b>`, Extra.inReplyTo(messageID))
            }
        } else {
            let rand1 = Math.floor(Math.random() * (20) + 1)
            let rand2 = Math.floor(Math.random() * (20) + 1)

            if (rand1 <= rand2) ctx.replyWithHTML(`<code>d20: [|${rand1}| ${rand2}]</code> => <b>${rand1}</b>`, Extra.inReplyTo(messageID))
            else ctx.replyWithHTML(`<code>d20 (disadvantage): [${rand1} |${rand2}|]</code> => <b>${rand2}</b>`, Extra.inReplyTo(messageID))
        }
    } else ctx.reply(`Sorry, I didn't understand :(`, Extra.inReplyTo(messageID))

    console.log(from)
})

bot.help(ctx => {
    let res = ''

    res += `<b>Dice Bot RPG Help:</>
    This bot allows you to roll all kinds of dice in your Telegram messages.

    <b>- Roll Dice</b>
    /r - use this command to roll dice. You can specify the number of dice, the number of sides and the modifier.
    
    <i>Examples:</i>
    /r - roll one d20
    /r 2d8 - roll two d8
    /r 3d6+2 - roll three d6 plus 2
    /r 3d4-1 - roll three d4 less 1

    <b>- Roll Dice with advantage</b>
    /a - use this command to roll one d20 with advantage (rolls two dice and keep higher). You can specify the modifier.

    <i>Examples:</i>
    /a - roll one d20 with advantage
    /a 1 - roll one d20 with advantage plus 1
    /a +1 - roll one d20 with advantage plus 1
    /a -1 - roll one d20 with advantagem less 1

    <b>- Roll Dice with disadvantage</b>
    /d - use this command to roll one d20 with disadvantage (rolls two dice and keep lower). You can specify the modifier.

    <i>Examples:</i>
    /d - roll one d20 with disadvantage
    /d 1 - roll one d20 with disadvantage plus 1
    /d +1 - roll one d20 with disadvantage plus 1
    /d -1 - roll one d20 with disadvantagem less 1

    <b>- Comments</b>
    You can add a comment after any command.

    <i>Examples:</i>
    /r Leeroy Jenkins!!!
    /r 8d6+3 Fireball
    /a You gonna die! :)
    /d I'm gonna die! :(

    /help - help`

    ctx.replyWithHTML(res)
})

bot.launch()