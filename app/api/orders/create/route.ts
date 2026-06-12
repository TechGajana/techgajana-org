import {createClient} from "@/lib/supabase/server";


export async function POST(req:Request){

try{


const supabase=await createClient();



const {
data:{
user
}
}=await supabase.auth.getUser();



if(!user){

return Response.json(
{
error:"Unauthorized"
},
{
status:401
}
);

}



const body=await req.json();



const cart=body.items;



let total=0;



cart.forEach((item:any)=>{

const price=
item.store_products.discount_price ||
item.store_products.price;


total+=price*item.quantity;

});




const {data:order,error}=await supabase
.from("orders")
.insert({

user_id:user.id,

total_amount:total

})
.select()
.single();





if(error)
throw error;





const items=cart.map(
(item:any)=>({

order_id:order.id,

product_id:
item.store_products.id,

quantity:item.quantity,

price:
item.store_products.discount_price ||
item.store_products.price

})
);




await supabase
.from("order_items")
.insert(items);





return Response.json({

success:true,

order

});



}catch(error){


return Response.json(
{
error:"Order creation failed"
},
{
status:500
}
);


}

}