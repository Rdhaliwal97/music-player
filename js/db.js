const Datastore = require('nedb');
const recentDb = new Datastore({ filename: path.resolve(dbPath , 'recent.db'), autoload: true });
const driectoryDb  = new Datastore({ filename: path.resolve(dbPath , 'driectory.db'), autoload: true });