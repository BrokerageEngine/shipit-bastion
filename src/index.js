const sshTask = require("./tasks/ssh");
const extendShipit = require("./extendShipit");

module.exports = shipit => {
    extendShipit(shipit);
  sshTask(shipit);
   shipit.on("init:after_ssh_pool", async () => {
    await shipit.start("ssh:setup_bastion");
   });
	/*
	 * This is only required for older versions of shipit-cli
  shipit.on("task_start", async (event) => {
    if (shipit.pool && 
      !shipit.pool.isProxied 
      && event.task !== "ssh:setup_bastion") {
        //console.log("Going to setup the bastion")
      await shipit.start("ssh:setup_bastion");
    }
  });

    */
};
