const monk = require('monk');
require('dotenv').config();

const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');

urls.createIndex({ slug: 1 }, { unique: true });

module.exports = { urls }
