//  ╔◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[ OpenBot by magneum ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎"
//  ║⧉༻ 🤖𝐎𝐩𝐞𝐧𝐁𝐨𝐭😺𝐌𝐮𝐥𝐭𝐢-𝐃𝐞𝐯𝐢𝐜𝐞🤖
//  ║  𝐢𝐬 𝐚 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐌𝐮𝐥𝐭𝐢𝐏𝐮𝐫𝐩𝐨𝐬𝐞 - 𝐔𝐬𝐞𝐫𝐛𝐨𝐭 𝐰𝐢𝐭𝐡 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐢𝐨𝐧, 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐨𝐧 𝐚𝐧𝐝 𝟐𝟎𝟎++ 𝐦𝐨𝐫𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬!
//  ║
//  ║🌟 A versatile whatsApp multi-purpose bot designed for group management and user convenience.
//  ║🚀 Simplifies group management tasks and enhances the overall user experience.
//  ║⚠️ Please note: Engaging in spamming activities may lead to account suspension. Use responsibly!
//  ║🎉 OpenBot is intended for fun and convenience, but we're not responsible for account bans.
//  ║🔀 forking the repository is allowed, but customized versions or modified plugins are unsupported.
//  ║⚠️ Exercise caution and take responsibility for any modifications made to the bot.
//  ║📞 Need assistance or have issues? Contact our developers at +918436686758 and +918250889325.
//  ║🔄 We'll continue providing updates and support for the original version of the bot.
//  ║👉 Enjoy the features and functionality of OpenBot responsibly! Make the most out of your
//  ║   whatsApp group management experience! 🎉
//  ║
//  ║🐞 Developers: +918436686758, +918250889325
//  ╚◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[ OpenBot by magneum ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎"
require("#/logger/global");
var presentpath = require("path");
var tempname = presentpath.basename(__filename);
var finalname = tempname.slice(0, -3).toLowerCase();
module.exports = async (OpenBot, ocID, gmeta, isAdmin, groupName, isbotAdmin, groupAdmins, participants) => {
  if (!OpenBot.mentionByReply) {
    return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _No query provided!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
  }
  if (OpenBot.args.length === 0) {
    return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _No query provided!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
  }
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(OpenBot.args[0])) {
    return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _No query provided!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
  }
  if (OpenBot.args[0].match(/[a-z]/i)) {
    return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _No query provided!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
  }

  if (OpenBot.mentionByReply) {
    receiver =
      OpenBot.mtype == "extendedTextMessage" &&
      OpenBot.message.extendedTextMessage.contextInfo != null
        ? OpenBot.message.extendedTextMessage.contextInfo.participant || ""
        : "";
    receiverName = await OpenBot.getName(receiver);
    if (receiver === ocID.sender) {
      return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _Can't pay self account!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
    }

    await OpenBot.Economy.findOne(
      {
        Id: ocID.sender,
      },
      async (error, uPayer) => {
        if (error) return OpenBot.handlerror(OpenBot, ocID, error);
        if (!uPayer) {
          new OpenBot.Economy({
            Id: ocID.sender,
            money: 0,
            daily: 0,
            timeout: 86400000,
            fishdone: 0,
            fishtimeout: 1800000,
            workdone: 0,
            worktimeout: 900000,
          })
            .save()
            .catch((error) => {
              return OpenBot.handlerror(OpenBot, ocID, error);
            });
          return ocID.reply(`*😥Apologies:* _${
            OpenBot.pushname || OpenBot.Tname
          }_ 

*❌Error* 
> _You Have 0-gold To Pay_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
        }

        if (parseInt(OpenBot.args[0]) > uPayer.money) {
          return ocID.reply(`*😥Apologies:* _${
            OpenBot.pushname || OpenBot.Tname
          }_ 

*❌Error* 
> _You Have 0-gold To Pay_

*💰Balance:*
>${uPayer.money}

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
        } else {
          await OpenBot.Economy.findOne(
            {
              Id: receiver,
            },
            async (error, uBonus) => {
              if (error) return OpenBot.handlerror(OpenBot, ocID, error);
              if (!uBonus) {
                new OpenBot.Economy({
                  Id: receiver,
                  money: parseInt(OpenBot.args[0]),
                  daily: 0,
                  timeout: 86400000,
                  fishdone: 0,
                  fishtimeout: 1800000,
                  workdone: 0,
                  worktimeout: 900000,
                })
                  .save()
                  .catch((error) => {
                    return OpenBot.handlerror(OpenBot, ocID, error);
                  });
                uPayer.money = uPayer.money - parseInt(OpenBot.args[0]);
                uPayer.save().catch((error) => {
                  return OpenBot.handlerror(OpenBot, ocID, error);
                });
                return await OpenBot.imagebutton(
                  OpenBot,
                  ocID,
                  `*🔖Here, ${finalname} for ${
                    OpenBot.pushname || OpenBot.Tname
                  }:*

┌『 *📥Paying Account* 』
│║⦁ *💰Balance:* ${uPayer.money}
│║⦁ *🦚Account Holder:* ${OpenBot.pushname || OpenBot.Tname}
┕╚═══════⋑

┌『 *📥Receiver Account* 』
│║⦁ *💰Balance:* ${payGold}
│║⦁ *🐿️Account To Pay:* @${receiverName}
┕╚═══════⋑`,
                  OpenBot.display
                );
              }

              uPayer.money = uPayer.money - parseInt(OpenBot.args[0]);
              uPayer.save().catch((error) => {
                return OpenBot.handlerror(OpenBot, ocID, error);
              });
              uBonus.money = uBonus.money + parseInt(OpenBot.args[0]);
              uBonus.save().catch((error) => {
                return OpenBot.handlerror(OpenBot, ocID, error);
              });
              return await OpenBot.imagebutton(
                OpenBot,
                ocID,
                `*🔖Here, ${finalname} for ${OpenBot.pushname || OpenBot.Tname}:*

┌『 *📥Paying Account* 』
│║⦁ *💰Balance:* ${uPayer.money}
│║⦁ *🦚Account Holder:* ${OpenBot.pushname || OpenBot.Tname}
┕╚═══════⋑

┌『 *📥Receiver Account* 』
│║⦁ *💰Balance:* ${uBonus.money}
│║⦁ *🐿️Account To Pay:* @${receiverName}
┕╚═══════⋑`,
                OpenBot.display
              );
            }
          );
        }
      }
    );
  } else {
    return ocID.reply(`*😥Apologies:* _${OpenBot.pushname || OpenBot.Tname}_ 

*❌Error* 
> _No query provided!_

*⚡Usage* 
> Reply-Person: _${OpenBot.prefix}${finalname} amount_`);
  }
};
