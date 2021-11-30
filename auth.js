let clientID = "adf07e19bd484386b0447496cefe7383"
let clientSecret = "4bd5a643ab53434cab807dbadb276518"

var options = {
  method: 'POST',
  url: 'https://oauth.fatsecret.com/connect/token',
  method : 'POST',
  auth : {
     user : clientID,
     password : clientSecret
  },
  headers: { 'content-type': 'application/json'},
  form: {
     'grant_type': 'client_credentials',
     'scope' : 'basic'
  },
  json: true
};

fetch(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

{"access_token":"eyJhbGciOiJSUzI1NiIsImtpZCI6IjYwNzdBNzkyMERFNDM1NDQ5QkUxNEEwNTI5QkZFNjQxNUEzOTZFRjgiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJZSGVua2cza05VU2I0VW9GS2JfbVFWbzVidmcifQ.eyJuYmYiOjE2MzgyNzk5MjgsImV4cCI6MTYzODM2NjMyOCwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiJhZGYwN2UxOWJkNDg0Mzg2YjA0NDc0OTZjZWZlNzM4MyIsInNjb3BlIjpbImJhc2ljIl19.pH0uhoo8rSOgqS5vcE87bFd5TJDp38VUdBsGA3Z0teQp03IzQJlJVps9MDOcFqZDJw2H6YVY_WV1Ri3g-Ezv5BtQqPqXMPqFe5MoHCu28KQm60hmpSrVjrXXq6qnjHGGGQW6_HpfZp24slh1FkF0bh9MKv8CdPvxF8VShgkPU75TzT66nAvylEkY86JMrQWAp53AUnw5E3CIg-bYhvQ_51TYnOO0GvmS6kUWFSEX7fxCTAWki1ed4cNE-W054UUAVt70OWjoWEGbhhseDkI0MbcNF0ulFEKyyB6eQXl3pk9wjKCRkXdYJ0LuR_ovenkTuMkNMrGBbOk8-zA0ksxPRP5JjJKeItQJEcKNvJ95nIz41fdVekoGJHkxzdD768cnkUcPqoJZc5DAF2U0oUDJXccGjyEoObZxR4cIfBnzqW_RomHlMvRvvjXGba3HbIk5WMOTJUpVU8qb2hmaqUf4z_6JnMbdY5LIbCJEkzcVJYt642dIdDviHucU5OVp086qpE57O4cs2O2Hdp_wCLp9nIKMNG5rHsIkCsfb2pZRR37MCNw-9mceW9vOI7-5UDgC_ikQF7IwuYfrZnsFg3X7vgzpogwupMoUsOtejONcsL3xnqmIneUZoas4Bs-xD-26THU962VPuKB24AAo_X2Q-PkIwAttZnW7peEfywEkd8A","expires_in":86400,"token_type":"Bearer","scope":"basic"}