# API Project: URL Shortener Microservice for freeCodeCamp


### User Stories

1. I can POST a URL to `[project_url]/api/shorturl/new` and I will receive a shortened URL in the JSON response. Example : `{"original_url":"www.google.com","short_url":1}`
2. If I pass an invalid URL that doesn't follow the valid `http(s)://www.example.com(/more/routes)` format, the JSON response will contain an error like `{"error":"invalid URL"}`. *HINT*: to be sure that the submitted url points to a valid site you can use the function `dns.lookup(host, cb)` from the `dns` core module.
3. When I visit the shortened URL, it will redirect me to my original link.

(Note: Mongo DB model has been used to store the url against the id, when the new post request is made the url is inserted into the mongo model (e.g:https://www.google.com) and when the get request is made against the respected id(e.g in model it is saved on id=5) it then it will redirect to the saved url (/api/shorturl/5))

#### Creation Example:

POST https://button-stick.glitch.me/api/shorturl/new - body (urlencoded) :  url=https://www.google.com

#### Usage:

https://button-stick.glitch.me/api/shorturl/3

#### Will redirect to:

http://forum.freecodecamp.com
