import {Markup, Telegraf} from 'telegraf';
import dotenv from 'dotenv'
import * as pfsense from './pfsense.mjs'
dotenv.config()
const token = process.env.TELEGRAM_TOKEN
const user = Number(process.env.USER_ID)



const bot = new Telegraf(token);
// bot.use(Telegraf.log())




bot.start( async (ctx) => {
    console.log(ctx.chat.id)
    if(ctx.chat.id === user ){
       
        return await ctx.reply('Opciones del Escritorio Remoto', Markup
        .keyboard([
          ['👨🏽‍💻 RDP ON', '👨🏽‍💻 RDP OFF','👨🏽‍💻 RDP ??'] // Row1 with 2 buttons
        ])
        .oneTime()
        .resize()
      )
        }
        else{
            ctx.reply('No tiene permiso para utilizar el bot')
            
        }
});
bot.help((ctx) => ctx.reply('Bot Privado para tareas de SysAdmin'));




bot.hears('👨🏽‍💻 RDP ON', async (ctx) => {
    if(ctx.chat.id === user ){
        const request = await pfsense.GetRDPId()
        const id = ((Object.keys(request.data.data)));
        if(id.length === 0){
            const enabled = await pfsense.EnableRDP()
            ctx.reply("RDP Habilitado con exito", enabled.data)
            
        }
        else{
            ctx.reply('Ya esta habilitado el RDP mira:', request.data ) 
        }
        
    }
} )
bot.hears('👨🏽‍💻 RDP ??', async (ctx) => {
    if(ctx.chat.id === user ){
        const request = await pfsense.GetRDPId()
        const id = ((Object.keys(request.data.data)));
        if(id.length!==0){
            ctx.reply((request.data.data))
        }
        else{
            ctx.reply(("No esta habilitado el RDP"))
        }
    }
})
bot.hears('👨🏽‍💻 RDP OFF', async (ctx) => {
    const request = await pfsense.GetRDPId()
    const id = ((Object.keys(request.data.data)));
    if(id.length!=0){
        id.map(rdp => (pfsense.DisableRDP(rdp)).then(response=>(ctx.reply(response.data))))
    }else{
        ctx.reply("No hay nada que deshabilitar")
    }
})



bot.launch();