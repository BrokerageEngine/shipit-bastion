# shipit-bastion

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Deploy to Bastion / Jump Servers with ShipIt** ✨

This plugin adds features to make it easier to deploy projects to servers that are on the other
side of bastion / jump servers.

# Features


* **bastionUser** - This sets the userid for the user on the bastion server. 
* **bastionHost** - This sets the host for the bastion server.
* **USER env** - If no bastion user is set the system uses process.env.USER for the bastion connection
* **env Override** - You can set the process.env.BASTION_USER to set the user for the bastion from the env  
* **shipit.sshOptions()** - this method can be passed to any command to use the bastion settings



# License

MIT © 2019 Brokerage Engine, Inc
