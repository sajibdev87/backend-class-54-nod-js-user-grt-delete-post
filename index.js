const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3000;

// middle wire
app.use(cors())
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hajbnqv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
          try{
                    const database =client.db('ForthDatabase')
                    const userCollection =database.collection("Users");
                    // user post 
                    app.post('/users', async(req,res) => {
                              const user = req.body;
                              const result =await userCollection.insertOne(user);
                              res.send(result)
                    })
                    // all users get
                    app.get('/users',async(req,res)=>{
                              const query ={};
                              const search =userCollection.find(query);
                             const users = await search.toArray();
                             res.send(users)
                    })
                    // user delete
                    app.delete('/users/:id',async(req,res)=>{
                    const id = req.params.id;
                    const query = { _id: new ObjectId(id)}
                    const result = await userCollection.deleteOne(query);
                    res.send(result)
                    })

          }
         
          finally{}
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Our Forth Server Run On: ${port}`)
})