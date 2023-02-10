const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}
type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}
type Query {
    me:User
}
type Auth {
    token: ID!
    user: User
}
type Mutation {
    login(email: String!, password: String!):Auth
    addUser(username: String!, email:String!, password: String!):Auth
    saveBook(book:bookInput, _id:ID!): User
    removeBook(bookId:String!, _id:ID!):User
}
input bookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
}`

module.exports = typeDefs;