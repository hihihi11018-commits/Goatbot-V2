module.exports.config = {
  name: "nickname",
  version: "1.0.0",
  hasPermission: 1,
  credits: "Othman",
  description: "تغيير الكنية لجميع أعضاء المجموعة",
  commandCategory: "group",
  usages: "~nickname [الاسم] | ~unnickname",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const threadID = event.threadID;

  if (args[0] === "unnickname") {
    const info = await api.getThreadInfo(threadID);
    const members = info.participantIDs;

    for (const uid of members) {
      try {
        await api.changeNickname("", threadID, uid);
      } catch (e) {}
    }

    return api.sendMessage("✅ تم حذف الكنيات من الجميع.", threadID);
  }

  const nickname = args.join(" ");

  if (!nickname) {
    return api.sendMessage(
      "❌ الاستعمال:\n~nickname الاسم\n~unnickname",
      threadID
    );
  }

  const info = await api.getThreadInfo(threadID);
  const members = info.participantIDs;

  for (const uid of members) {
    try {
      await api.changeNickname(nickname, threadID, uid);
    } catch (e) {}
  }

  return api.sendMessage(
    `✅ تم تغيير كنية الجميع إلى: ${nickname}`,
    threadID
  );
};
