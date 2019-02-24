const extendShipit = require("../../extendShipit");
const { ProxyConnectionPool, Connection } = require("ssh-proxy-pool");


module.exports = async shipit => {





    shipit.blTask("ssh:setup_bastion", async () => {
 
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
        proxyUser: shipit.config.bastionUser,
        proxyHost: shipit.config.bastionHost,
    };

      const connections = shipit.pool.connections.map(connection => {
        const newConn = new Connection({remote: "nobody@brokerageengine.com"}); //DJE - this gets the super constructor to pass
        newConn.setFromOriginalConnection(connection);
        newConn.addOptions(shipit.config.bastionOptions);
        return newConn;
      });
      shipit.log("Changing connection pool to proxy connection pool");
      shipit.pool = new ProxyConnectionPool(connections);
    }
  });
};
