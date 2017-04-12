const axios = require('axios');

exports.handler = (event, context, callback) => {
    axios.get(event.StageVariables.baseUrl + event.StageVariables.path, {
        headers: { Accept: 'application/vnd.hmrc.1.0+json' }
    }).then(res => callback(null, res.data))
      .catch(err => callback('404 - not found'));
};