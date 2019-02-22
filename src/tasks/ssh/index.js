const setupBastionTask = require("./setup_bastion");

module.exports = shipit => {
  setupBastionTask(shipit);

  shipit.on("published", async () => {
    await shipit.start("ssh:setup_bastion");
  });
};
