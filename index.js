import {GraphQLServer} from 'graphql-yoga'

// Type definitions (schema)
const typeDefs =`
  type Query{
    title: ID!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    title(){
      return 'abc123'
    },
    price(){
      return 12.42
    },
    releaseYear(){
      return 1894
    },
    rating(){
      return null
    },
    inStock(){
      return true
    }
  }
}

const server = new GraphQLServer({typeDefs, resolvers })

server.start(()=>{
  console.log('The server is up!')
})