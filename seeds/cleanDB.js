import * as models from "../models/index.js";
import db from "../config/connection.js";

const clean = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db
      .listCollections({
        name: collectionName,
      })
      .toArray();

    if (modelExists.length) await db.dropCollection(collectionName);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default clean;
