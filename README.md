# Fetch
I'm on a mission to minimize my dependencies so I decided to build something very small and simple
that can replicate the experience I'm used to in browsers with `fetch`. Maybe not the promised-based
bit but still, something from the core of node so that it doesn't have to extend my network of
trusted modules.

## Usage
```javascript
const fetch = require('@dillonchr/fetch');

fetch({
    url: 'https://bot.whatismyipaddress.com'
}, (err, body) => {
    if (err) {
        return console.log('Module must be broken, heh.', err);
    }
    console.log('Looking into the mirror, I can tell we\'re at', body);
});
```

