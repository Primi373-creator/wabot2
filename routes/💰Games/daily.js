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
  try {
    OpenBot.Economy.findOne(
      {
        Id: ocID.sender,
      },
      async (error, userEco) => {
        if (error) {
          return OpenBot.handlerror(OpenBot, ocID, error);
        }

        if (!userEco) {
          new OpenBot.Economy({
            Id: ocID.sender,
            money: 500,
            daily: Date.now(),
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
          return await OpenBot.imagebutton(
            OpenBot,
            ocID,
            `*🔖Here, ${finalname} for ${OpenBot.pushname || OpenBot.Tname}:*
*🧈Status:* Added To DB!
✅𝗗𝗮𝗶𝗹𝘆 𝗦𝘁𝗮𝘁𝘂𝘀: You've collected your daily reward!
💵𝐃𝐚𝐢𝐥𝐲 𝐌𝐨𝐧𝐞𝐲:  500 
*💰Balance:* Just Opened Your Account!`,
            OpenBot.display
          );
        } else {
          if (userEco.timeout - (Date.now() - userEco.daily) > 0) {
            var ᴄʟᴏᴄᴋ = OpenBot.ms(
              userEco.timeout - (Date.now() - userEco.daily)
            );
            return await OpenBot.imagebutton(
              OpenBot,
              ocID,
              `*🔖Here, ${finalname} for ${OpenBot.pushname || OpenBot.Tname}:*
❌𝗘𝗿𝗿𝗼𝗿: You've already collected your daily reward!
💵𝗡𝗲𝘅𝘁 𝗗𝗮𝗶𝗹𝘆: ${ᴄʟᴏᴄᴋ.hours}h ${ᴄʟᴏᴄᴋ.minutes}m ${ᴄʟᴏᴄᴋ.seconds}s`,
              OpenBot.display
            );
          }

          userEco.daily = Date.now();
          userEco.money = userEco.money + 500;
          userEco.save().catch((error) => {
            return OpenBot.handlerror(OpenBot, ocID, error);
          });
          return await OpenBot.imagebutton(
            OpenBot,
            ocID,
            `*🔖Here, ${finalname} for ${OpenBot.pushname || OpenBot.Tname}:*
✅ 𝗗𝗮𝗶𝗹𝘆 𝗦𝘁𝗮𝘁𝘂𝘀: You've collected your daily reward!
💵 𝐃𝐚𝐢𝐥𝐲 𝐌𝐨𝐧𝐞𝐲:  500 
💰 𝗧𝗼𝘁𝗮𝗹 𝗕𝗮𝗹𝗮𝗻𝗰𝗲: ${userEco.money}`,
            OpenBot.display
          );
        }
      }
    );
  } catch (error) {
    return OpenBot.handlerror(OpenBot, ocID, error);
  }
};
