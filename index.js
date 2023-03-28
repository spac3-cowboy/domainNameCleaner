const http = require('http');
const url = require('url');

//Create a HTTP server that listens for incoming requests
const server = http.createServer((req, res) => {
  //Parse the URL of the incoming request
  const parsedUrl = url.parse(req.url, true);

  //If the request path is "/api/domain", extract the main domain name from the "url" query parameter and send a JSON response
  if (parsedUrl.pathname === '/api/domain') {
    const domain = getMainDomainName(parsedUrl.query.url);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ domain }));
  } else {
    //If the request path is not recognized, send a 404 error response
    res.statusCode = 404;
    res.end();
  }
});

//Function that extracts the main domain name from a given URL
function getMainDomainName(inputUrl) {
  const parsedUrl = url.parse(inputUrl); //Parse the URL
  const domainParts = parsedUrl.hostname.split('.'); //Split the hostname into parts
  const mainDomain = domainParts.slice(-2).join('.'); //Extract the last two parts of the hostname
  return mainDomain; //Return the main domain name
}

// function getMainDomainName(inputUrl) {
//     //Remove the protocol and any path/query parameters from the input URL
//     let domain = inputUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
//     domain = domain.split('/')[0];

//     const domainParts = domain.split('.'); //Split the domain into its subdomains and top-level domain parts
  
//     //If the domain has at least three parts, assume the main domain is the last two parts
//     if (domainParts.length >= 3) {
//       return domainParts.slice(-2).join('.');
//     } else {
//       return domain; //Otherwise, the main domain is just the whole domain
//     }
//   }
  

//Get the port number to listen on from the environment variable "PORT", or use the default value 3000
const PORT = process.env.PORT || 3000;

//Start the server listening on the specified port
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
