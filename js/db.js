const Datastore = require('nedb');
const recentDb = new Datastore({ filename: path.resolve(dbPath , 'recent.db'), autoload: true });
const directoryDb  = new Datastore({ filename: path.resolve(dbPath , 'driectory.db'), autoload: true });
/* database function */
const directory = {
  add: async function(path) {
    const self = this;
    let dfd = jQuery.Deferred();
    if (!path) {
      console.error("empty path");
      dfd.reject({ code: dbcodes.empty });
      return dfd.promise();
    }
    let findStatus = await self.findone({path: path});
    console.log("Logged Output: findStatus", findStatus)
    if (findStatus.code != dbcodes.success) {
      // for Adding first suite
      directoryDb.insert({path: path}, async function(err, newDoc) {
        if (err) {
          console.error(`err-> ${err}`);
          dfd.reject({ code: dbcodes.error });
          return dfd.promise();
        }
        console.log(newDoc);
        dfd.resolve({ code: dbcodes.success, docs: newDoc });
        return dfd.promise();
      });
    }
    return dfd.promise();
  },
  // add: (path)=>{
  //   let dfd = jQuery.Deferred();
  //   if(!path){
  //     dfd.resolve({code: dbcodes.empty});
  //     return dfd.promise()
  //   }
  //   directoryDb.findOne({ path: path }, function(err, doc) {
  //     if (err) {
  //       console.error(`error while finding-> ${path}`);
  //       dfd.resolve({code: dbcodes.error});
  //       return dfd.promise()
  //     }
  //     if (doc != null) {
  //       console.warn(`${path} ->already exist.`);
  //       dfd.resolve({ code: dbcodes.exist })
  //       return dfd.promise()
  //     }
  //     directoryDb.insert({ path: path }, function(err, newDoc) {
  //       if (err) {
  //         console.warn(`error-> ${err}`);
  //         dfd.resolve({ code: dbcodes.error })
  //         return dfd.promise()
  //       }
  //       dfd.resolve({ code: dbcodes.success, docs: newDoc })
  //       return dfd.promise()
  //     });
  //     return dfd.promise()
  //   });
  // },
  findone: (_id)=>{
    const dfd = jQuery.Deferred();
    directoryDb.find({path: path}).sort({timeStamp: -1}).exec(function(err, docs) {
      if (err) {
        console.error("Exception while finding.");
        dfd.reject({ code: dbcodes.error });
        return dfd.promise();
      }
      if(docs.length >= 0){
        console.log('nothing found');
        dfd.resolve({ code: dbcodes.empty });
        return dfd.promise();
      }
      console.log(docs);
      dfd.resolve({ code: dbcodes.success, docs: docs });
    });
    return dfd.promise();
  },
  findall: _=>{
    const dfd = jQuery.Deferred();
    directoryDb.find({}).sort({timeStamp: -1}).exec(function(err, docs) {
      if (err) {
        console.error("Exception while finding in history.");
        dfd.reject({ code: dbcodes.error });
        return dfd.promise();
      }
      console.log(docs);
      dfd.resolve({ code: dbcodes.success, docs: docs });
    });
    return dfd.promise();
  },
  delete: (_id)=>{
    let dfd = jQuery.Deferred();
    if (!_id) {
      console.error("_id undefined.");
      dfd.reject({ code: dbcodes.error });
      return dfd.promise();
    }
    directoryDb.remove({_id: _id}, {}, function(err, numRemoved) {
      if (err) {
        console.error(`Exception deleting path Items: ${_id}`);
        dfd.resolve({ code: dbcodes.error });
        return dfd.promise();
      }
      dfd.resolve({ code: dbcodes.success, docs: numRemoved });
    });
    return dfd.promise();
  },
}