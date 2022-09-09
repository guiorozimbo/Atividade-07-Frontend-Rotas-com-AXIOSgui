const { request, response } = require("express")
const cors=require("cors")
const express=require("express")
const app=express()

app.use(express.json())
app.use(cors())

let products =[
  {
    id:1,
    productName: "Arroz Rei Arthur 5kg"
  }
]

app.get("/listAllProducts",(request,response)=>{
  return response.json(products)
})

app.post("/createProducts",(request,response)=>{
  let lastId
  if(products.length===0){
    lastId=0
  }
  else{
    lastId=products[products.length-1].id
  }
  const {productName}=request.body
  products.push({
   id: lastId +1,
   productName: productName
  })

  return response.json("Product registered successfully!")
})
app.delete("/deleteProducts/:id",(request,response)=>{
const {id}= request.params
const product=products.find(product=> Number(product.id)===Number(id))
if(!product){
  return response.json("Product not found")
}

products=products.filter(product=> Number(product.id)!==Number(id))
return response.send("Deleted product")
})

app.listen(3333,()=>{
  console.log("Backend Rodando!")
})