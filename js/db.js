const Datastore = require('nedb');
const recentDb = new Datastore({ filename: path.resolve(dbPath , 'recent.db'), autoload: true });
const directoryDb  = new Datastore({ filename: path.resolve(dbPath , 'driectory.db'), autoload: true });

const directory = {
  add: ()=>{
    if(!path){
      return {'code': 'empty'}
    }
  },
  find: ()=>{
    //TODO: find in db
    if('found') return true
    else return false;
  },
  findAll: _=>{

  },
  delete: ()=>{
    // path || _id
  }
}
directory.add();