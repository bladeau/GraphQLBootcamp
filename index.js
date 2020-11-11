import {GraphQLServer} from 'graphql-yoga'

// Demo user data
const users = [
  {id:'1', name: 'Andrew', email:'andrew@example.com', age: 27},
  {id:'2', name: 'Sarah', email:'sarah@example.com'},
  {id:'3', name: 'Mike', email:'mike@example.com'},
  {id:'4', name: 'User4', email:'4@example.com', age:24},
  {id:'5', name: 'User5', email:'5@example.com'},
]

const posts=[
  {id:'1', title:'title a', body:'body a', published:true, author:'1'},
  {id:'2', title:'title b', body:'body b', published:true, author:'1'},
  {id:'3', title:'title c', body:'body c', published:true, author:'2'},
  {id:'4', title:'title d', body:'body d', published:true, author:'1'},
  {id:'5', title:'title e', body:'body e', published:false, author:'3'},
]
const comments=[
  {id:'1', text:'comment a', author:'1', post:'1'},
  {id:'2', text:'comment b', author:'2', post:'1'},
  {id:'3', text:'comment c', author:'3', post:'5'},
  {id:'4', text:'comment d', author:'1', post:'3'},
]

// Type definitions (schema)
const typeDefs =`
  type Query{
    posts(query: String):[Post!]!
    users(query: String): [User!]!
    product: Product!
    post: Post!
    comments: [Comment!]!
   
  }
  type Comment{
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
  type Product {
    id: ID!
    title: String!
    price: Float!
    releaseYear: Int
    rating: Float
    inStock: Boolean!
  }
  type User{
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]
    comments: [Comment]!
  }
  type Post{
    id: ID!
    title: String!
    body: String
    published: Boolean!
    author: User!
    comments: [Comment]!
  }
`

const resolvers = {
  Query: {
    users(parent, args, ctx, info){
      if(!args.query){
        return users
      }

      return users.filter((user)=>{
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    post(){
      return{
        id: '092',
        title: 'GraphQL 101',
        body: '',
        published: false
      }
    },
    product() {
      return {
        id: '123',
        title: 'Watch',
        price: 39.99,
        rating: 4.8,
        inStock: false
      }
    },
    posts(parent, args, ctxt, info){
      if(!args.query){
        return posts
      }
      return posts.filter((post)=>{
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })

    },
    comments(){
      return comments
    }
  },
  Post:{
    author(parent, args, ctx, info){
        return users.find((user)=>{
          return user.id === parent.author
        })
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment)=>{
        return comment.post === parent.id
      })
    }
  },
  User:{
    posts(parent, args, ctx, info){
      return posts.filter((post)=>{
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info){
      return comments.filter((comment)=>{
        return comment.author === parent.id
      })
    }
  },
  Comment:{
    author(parent, args, ctx, info){
      return users.find((user)=>{
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info){
      return posts.find((post)=>{
        return post.id === parent.post
      })
    }
  }
}



const server = new GraphQLServer({typeDefs, resolvers })

server.start(()=>{
  console.log('The server is up!')
})