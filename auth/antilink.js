//  ╔◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[ Foxbot by magneum ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎"
//  ║⧉༻ 🤖𝐅𝐨𝐱𝐁𝐨𝐭🕊️𝐌𝐮𝐥𝐭𝐢-𝐃𝐞𝐯𝐢𝐜𝐞🤖
//  ║  𝐢𝐬 𝐚 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐌𝐮𝐥𝐭𝐢𝐏𝐮𝐫𝐩𝐨𝐬𝐞 - 𝐔𝐬𝐞𝐫𝐛𝐨𝐭 𝐰𝐢𝐭𝐡 𝐌𝐨𝐝𝐞𝐫𝐚𝐭𝐢𝐨𝐧, 𝐀𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐨𝐧 𝐚𝐧𝐝 𝟐𝟎𝟎++ 𝐦𝐨𝐫𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬!
//  ║
//  ║🌟 A versatile WhatsApp multi-purpose bot designed for group management and user convenience.
//  ║🚀 Simplifies group management tasks and enhances the overall user experience.
//  ║⚠️ Please note: Engaging in spamming activities may lead to account suspension. Use responsibly!
//  ║🎉 Foxbot is intended for fun and convenience, but we're not responsible for account bans.
//  ║🔀 forking the repository is allowed, but customized versions or modified plugins are unsupported.
//  ║⚠️ Exercise caution and take responsibility for any modifications made to the bot.
//  ║📞 Need assistance or have issues? Contact our developers at +918436686758 and +918250889325.
//  ║🔄 We'll continue providing updates and support for the original version of the bot.
//  ║👉 Enjoy the features and functionality of Foxbot responsibly! Make the most out of your
//  ║   WhatsApp group management experience! 🎉
//  ║
//  ║🐞 Developers: +918436686758, +918250889325
//  ╚◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[ Foxbot by magneum ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎"
require("@/logger/global");
exports.noLink = async (Foxbot, Foxchat) => {
  var FetchCurrentGroupLink = await Foxbot.groupInviteCode(Foxchat.chat);
  var GroupLinkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
  var isGroupLink = GroupLinkRegex.exec(Foxbot.budy);
  var PresentGroupLink = new RegExp(
    `https://chat.whatsapp.com/${FetchCurrentGroupLink}`,
    "i"
  );
  var isCurrentGroupLink = PresentGroupLink.test(Foxbot.budy);
  if (isGroupLink && !isCurrentGroupLink) {
    await Foxbot.groupParticipantsUpdate(
      Foxchat.chat,
      [Foxbot.sender],
      "remove"
    ).catch((error) => Foxbot.handlerror(Foxbot, Foxchat, error));
    await Foxchat.reply(
      `*😥Apologies:* _${Foxbot.pushname}_
*KryZen❌Anti-Link*
> _Kicked! One Less MoFo!_`
    );
    return await Foxbot.sendMessage(Foxchat.chat, {
      delete: {
        remoteJid: Foxchat.chat,
        fromMe: false,
        id: Foxbot.quoted.id,
        participant: Foxbot.quoted.sender,
      },
    });
    ("◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱[ Foxbot by magneum ]☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱☱◎");
  } else if (
    Foxbot.budy.includes("https://t.me/") &&
    Foxbot.budy.includes("discord.gg") &&
    Foxbot.budy.includes("discord.com") &&
    Foxbot.budy.includes("/t.me/") &&
    Foxbot.budy.includes("wa.me/") &&
    Foxbot.budy.includes("www.")
  ) {
    await Foxbot.groupParticipantsUpdate(
      Foxchat.chat,
      [Foxbot.sender],
      "remove"
    ).catch((error) => Foxbot.handlerror(Foxbot, Foxchat, error));
    await Foxchat.reply(
      `*😥Apologies:* _${Foxbot.pushname}_
*KryZen❌Anti-Link*
> _Kicked! One Less MoFo!_`
    );
    return await Foxbot.sendMessage(Foxchat.chat, {
      delete: {
        remoteJid: Foxchat.chat,
        fromMe: false,
        id: Foxbot.quoted.id,
        participant: Foxbot.quoted.sender,
      },
    });
  } else {
  }
};
