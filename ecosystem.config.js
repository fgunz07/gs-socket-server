const path = require("path");

module.exports = {
  apps : [{
    name: "socket_server",
    script: 'build/index.js',
    env: {
      NODE_ENV: "production",
    },
    instances: 2,
    exec_mode: "cluster",
    watch: true,
    max_memory_restart: "150M",
    error_file: __dirname+"/pm2/error.log",
    out_file: __dirname+"/pm2/error.log",
    pid_file: __dirname+"/pm2/pid.log"
  }],
  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
