const express = require('express');
const app = express()

app.use(express.static('dist'))

const listener = app.listen(process.env.PORT || 1234, () => {
    console.log(`Listening on port ${listener.address().port}`);
})


