const babelPollyfill = require("babel-polyfill");
const sshTask = require("./tasks/ssh");
const extendShipit = require("./extendShipit");

module.exports = shipit => {
    extendShipit(shipit);
  sshTask(shipit);
  shipit.on("init", async () => {
    await shipit.start("ssh:setup_bastion");
  });
};
