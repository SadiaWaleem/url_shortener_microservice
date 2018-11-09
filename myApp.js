
var dns = require('dns');
var urlModel = require('./urlModel');
const url = require('url');

var count;
module.exports.saveAndFind = function(req, res) {
  var reqUrl = req.body.url;
  var reg = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/gi

  if (!reg.test(reqUrl)){
     res.json({"error": "Invalid URL"});
  }
  var urlObj = url.parse(reqUrl);
    dns.lookup(urlObj.hostname, function(err, address, family){
    if (err){
      res.json({"error": "Invalid Hostname"});
    }
    urlModel.find({}, function (err, docs){
      if (err) return;
      count = docs.length + 1;
    }) 
    urlModel.findOne({url: reqUrl}, function(err, storedUrl) {
              if (err) return;
              if (storedUrl) {
                res.json({"original_url": reqUrl, "short_url": storedUrl._id});
              } else {
                var newUrl = new urlModel({_id: count, url: reqUrl});
                newUrl.save();
                res.json({"original_url":reqUrl,"short_url":count});
                count++;
              }
    });
    
  })
}

module.exports.getOneUrl = function(req, res){
  urlModel.findOne({_id: req.params.id}, function (err, savedUrl){
    if (err) return;
    return res.redirect(savedUrl.url);
  });
};