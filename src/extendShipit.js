function extendShipit(shipit) {
  const Shipit = shipit.constructor;

  Shipit.prototype.sshOptions = function sshOptions(options) {
    const config = shipit.config;

    const realOptions = Object.assign(
      {},
      config.bastionOptions ? shipit.bastionOptions["ssh"]  || {} : {},
      options || {}
    );
    return realOptions;
  };
  Shipit.prototype.scpOptions = function sshOptions(options) {
   return shipit.sshOptions();
  };
  Shipit.prototype.rsyncOptions = function sshOptions(options) {
    const config = shipit.config;

    const realOptions = Object.assign(
      {},
      config.bastionOptions ? shipit.bastionOptions["rsync"]  || {} : {},
      options || {}
    );
    return realOptions;
  };
}
module.exports = extendShipit;
