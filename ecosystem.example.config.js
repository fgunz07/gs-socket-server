const path = require('path');

module.exports = {
  apps: [
    {
      name: 'socket',
      script: 'build/bin/www.js',
      env: {
        NODE_ENV: 'development',
        NODE_PORT: 3000,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6279,
        REDIS_USER: '',
        REDIS_PASS: '',
        AUTH_TOKEN: '123',
        MONGO_HOST: '',
        MONGO_PORT: 27017,
        MONGO_DBNAME: '',
        MONGO_USER: '',
        MONGO_PASS: '',
        MONGO_COLLECTION: '',
      },
      instances: 1,
      exec_mode: 'cluster',
      watch: true,
      max_memory_restart: '150M',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: `${path.join(__dirname, 'pm2')}/app-error-${process.pid}.log`,
      out_file: `${path.join(__dirname, 'pm2')}/app-out-${process.pid}.log`,
      pid_file: `${path.join(__dirname, 'pm2')}/app-${process.pid}.log`,
    },
  ],
};
