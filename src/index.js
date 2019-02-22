const sshTask = require("./tasks/ssh");

module.exports = shipit => {
  sshTask(shipit);
  shipit.on("init", async () => {
    await shipit.start("ssh:setup_bastion");
  });
};
