import { typeDefs } from "./schema"
import { ApolloServer } from "apollo-server"
import resolvers  from "./resolvers"

const server = new ApolloServer({
  typeDefs,
  resolvers,
  
})

server.listen(4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
});

