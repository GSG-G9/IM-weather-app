const app = require( './app')

app.listen(app.get("port"), () => {
    console.log('hey from port 5000')
})
