import express from 'express'
import axios from 'axios'

const app=express();
const port=3000;
app.set('views','backend')
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/noAuth',async(req,res)=>{
    const url='https://jokeapi-v2.p.rapidapi.com/joke/Any';

    const params={
        format:'json',
        blacklistFlags: 'nsfw,racist'
    };
    const headers={
    'x-rapidapi-key': 'f3e7efa088mshdd5955c84b062d7p14c446jsn7d3cf5d4efad',
    'x-rapidapi-host': 'jokeapi-v2.p.rapidapi.com'
    };
    try {
    const {data}=await axios.get(url,{params,headers});
    if(data.type==='twopart'){
        res.render('index.ejs',{
           content : {
             setup: data.setup,
            delivery: data.delivery
           }
        }) 
    } else{
        res.render('index.ejs',{
          content:{
              setup: data.joke,
            delivery: null
          }
        })
    }
    } catch (error) {
        res.status(500).send(`Error fetching joke`);
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});