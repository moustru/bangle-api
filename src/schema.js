const { find } = require('lodash');
const Authors = require('./data/authors');
const Posts = require('./data/posts');

let {
    // базовые типы GraphQL
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    // для создания требований к полям и аргументам
    GraphQLNonNull,
    // для создания схемы
    GraphQLSchema
} = require('graphql');

// базовые типы включают ID, String, Int, Float, Boolean. Здесь добавляется новый пользовательский тип Author
const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represent an author',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        twitterHandle: {type: GraphQLString}        
    })
});

// новый тип Post
const PostType = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        body: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: function(post) {
                return find(Authors, a => a.id == post.author_id);
            }
        }
    })
});

// определяется рутовый элемент для отправной точки запросов (Root Query)
const BlogQueryRootType = new GraphQLObjectType({
    name: 'BlogAppSchema',
    description: "Blog Application Schema Query Root",
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            resolve: function() {
                return Authors
            }
        },

        posts: {
            type: new GraphQLList(PostType),
            description: "List of all Posts",
            resolve: function() {
                return Posts
            }
        }
    })
});

// определение схемы
const BlogAppSchema = new GraphQLSchema({
    query: BlogQueryRootType
});

module.exports = BlogAppSchema;