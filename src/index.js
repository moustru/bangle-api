const graphqlHTTP = require('express-graphql');
const schema = require('./schema');

module.exports = app => {
    app.use('/', graphqlHTTP({
        schema, 
        graphiql: true // для отображения GraphiQL IDE
    }))
}