const express = require('express');
const bodyParser = require('body-parser');
const password = '$DyyzYPq9JCm-FW';

const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const uri = "mongodb+srv://organicUser:$DyyzYPq9JCm-FW@cluster0.3l9g8.mongodb.net/organicdb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("organicdb").collection("products");

  app.get('/products', (req,res)=>{
      productCollection.find({})
      .toArray((err,documents)=>{
          res.send(documents);
      })
  })

  app.post("/addProduct", (req,res)=>{
    const product = req.body;
    productCollection.insertOne(product)
    .then(result =>{
        console.log('data added successfully');
        res.send('success');
    })
  })

  app.delete('/delete/:id',(req,res) =>{
      productCollection.deleteOne({_id: ObjectId(req.params.id)})
      .then (result =>{
          console.log(result);
      })
  })

});

// client.connect(err => {
//     const productCollection = client.db("organicdb").collection("products");
//     app.post("/addProduct", (req,res)=>{
//       collection.insertOne(product)
//       .then(result=>{
//           console.log('one product added');
//       })
//     })
//   });


app.listen(3000);