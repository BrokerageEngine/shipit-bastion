function extendShipit(shipit) {
  const Shipit = shipit.constructor;

  Shipit.prototype.sshOptions = function sshOptions(options) {
    const realOptions = Object.assign(
      {},
      shipit.config.bastionOptions || {},
      options || {}
    );
    return realOptions;
  };
}
module.exports = extendShipit;
