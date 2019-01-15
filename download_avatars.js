var request = require('request');
var secrets = require('./secrets');

function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
    };

    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var contributors = JSON.parse(body);
            cb(err, contributors);
        };
    });
}

getRepoContributors("jquery", "jquery", function (err, contributors) {
    contributors.forEach(function (contributor) {
    });
});

function downloadImageByURL(url, filePath) {
    var fs = require('fs');
    request.get(url)
        .on('error', function (err) {
            throw err;
        })
        .on('response', function (response) {
            console.log('Response Status Code: ', response.statusCode);
            console.log('Response Message: ', response.statusMessage);
            console.log('Content Type: ', response.headers['content-type']);
            console.log('Download complete')
        })
        .pipe(fs.createWriteStream(filePath))
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")