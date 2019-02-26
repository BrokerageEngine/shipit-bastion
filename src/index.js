const sshTask = require("./tasks/ssh");
const extendShipit = require("./extendShipit");

module.exports = shipit => {
    extendShipit(shipit);
  sshTask(shipit);
  // shipit.on("init", async () => {
    // This happens before the ssh pool is setup and it doesn't check to see if it is already set up.
  //   await shipit.start("ssh:setup_bastion");
  // });

  // shipit.on("init:ssh_pool", async () => {
    // waiting on pull request to see this emitted.
    //await shipit.start("ssh:setup_bastion");
  // });
  shipit.on("task_start", async (event) => {
    if (shipit.pool && 
      !shipit.pool.isProxied 
      && event.task !== "ssh:setup_bastion") {
      await shipit.start("ssh:setup_bastion");
    }
  });
};
