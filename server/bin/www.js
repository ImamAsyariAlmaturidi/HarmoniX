const app = require('../app')
const port = process.env_PORT || 80

app.listen(port, () => {
    console.log(`server running in port ${port} `)
})