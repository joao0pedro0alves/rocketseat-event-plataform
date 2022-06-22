import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
    uri: "https://api-sa-east-1.graphcms.com/v2/cl4phztg5216401xl23l23odn/master",
    cache: new InMemoryCache(),
})
