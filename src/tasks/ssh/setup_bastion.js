const utils = require("shipit-utils");
const extendShipit = require("../../extendShipit");
const { ProxyConnectionPool, Connection } = require("ssh-proxy-pool");

module.exports = shipit => {
  utils.registerTask(shipit, "ssh:setup_bastion", async () => {
    extendShipit(shipit);
    if (!shipit.config.bastionHost) {
      shipit.config.bastionOptions = {};
      return;
    }
    if (!shipit.config.bastionUser) {
      if (process.env.BASTION_USER) {
        shipit.config.bastionUser = process.env.BASTION_USER;
      } else {
        shipit.config.bastionUser = process.env.USER;
      }
      shipit.log(
        `Using bastion ${shipit.config.bastionUser}@${
          shipit.config.bastionHost
        }`
      );
      shipit.config.bastionOptions = {
        forwardAgent: shipit.config.forwardAgent || "yes",
        proxy: `ssh -W %h:%p ${shipit.config.bastionUser}@${
          shipit.config.bastionHost
        }`
      };

      const connections = shipit.pool.connections.map(connection => {
        console.log(connection.remote);
        const newConn = new Connection(null);
        newConn.setFromOriginalConnection(connection);
        return newConn;
      });

      shipit.pool = new ProxyConnectionPool(connections);
    }
  });
};
