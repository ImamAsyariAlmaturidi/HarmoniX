const app = require('../app')
const port = process.env_PORT || 3000

app.listen(port, () => {
    console.log(`server running in port ${port} `)
})