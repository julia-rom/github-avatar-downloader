var request = require('request');
var secrets = require('./secrets');

var args = process.argv[2];

//general function that accepts repository owner and name, with a callback function
function getRepoContributors(repoOwner, repoName, cb) {
    var options = {
        url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
        headers: {
            'User-Agent': 'request',
            'Authorization': 'token ' + secrets.GITHUB_TOKEN
        }
    };
    //makes requests and returns array of contributors and passes data to cb function
    request(options, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            var contributors = JSON.parse(body);
            cb(err, contributors);
        };
    });
}

// calling function and loops through each contributor
getRepoContributors("jquery", "jquery", function (err, contributors) {
    contributors.forEach(function (contributor) {
        downloadImageByURL(contributor.avatar_url, "avatars/" + contributor.login)
    });
});


//downloads individual avatar images and saves to folder
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


