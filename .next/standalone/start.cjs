const path = require('path');
const fs = require('fs');

process.env.NODE_ENV = 'production';
process.env.HOSTNAME = '0.0.0.0';
if (!process.env.PORT) {
  process.env.PORT = '3000';
}

require('./server.js');
