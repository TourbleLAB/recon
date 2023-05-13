module.exports = (client) => {
  setInterval(() => {
    client.user.setActivity("github/notsolitus - r!help", { type: "WATCHING" });
  }, 2000);
};
