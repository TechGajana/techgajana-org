import Razorpay from "razorpay";
import {createClient} from "@/lib/supabase/server";


const razorpay=new Razorpay({

key_id:
process.env.RAZORPAY_KEY_ID!,

key_secret:
process.env.RAZORPAY_KEY_SECRET!

});



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



const amount=
Number(body.amount)*100;



const order=await razorpay.orders.create({

amount,

currency:"INR",

receipt:
`receipt_${Date.now()}`

});



return Response.json({

order

});


}catch(error){

return Response.json(
{
error:"Payment order failed"
},
{
status:500
}
);

}

}