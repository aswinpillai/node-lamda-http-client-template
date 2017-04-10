const axios = require('axios');

exports.handler = (event, context, callback) => {
    axios.get(event.baseUrl + event.path)
         .then(res => callback(null, res.data))
         .catch(err => callback('404 - not found'));
};