import crypto from "crypto";
import {createClient} from "@/lib/supabase/server";


export async function POST(req:Request){

try{


const body=await req.json();


const {
razorpay_order_id,
razorpay_payment_id,
razorpay_signature,
order_id
}=body;



if(
!razorpay_order_id ||
!razorpay_payment_id ||
!razorpay_signature ||
!order_id
){

return Response.json(
{
success:false,
message:"Missing payment details"
},
{
status:400
}
);

}



const generatedSignature =
crypto
.createHmac(
"sha256",
process.env.RAZORPAY_KEY_SECRET!
)
.update(
`${razorpay_order_id}|${razorpay_payment_id}`
)
.digest("hex");



if(
generatedSignature !== razorpay_signature
){

return Response.json(
{
success:false,
message:"Invalid payment signature"
},
{
status:400
}
);

}



const supabase =
await createClient();



const {
error
}=await supabase
.from("orders")
.update({

payment_status:"paid",

payment_id:
razorpay_payment_id,

razorpay_order_id,

order_status:"completed",

updated_at:
new Date().toISOString()

})
.eq(
"id",
order_id
);



if(error){

console.log(
"Order update error:",
error
);


return Response.json(
{
success:false,
message:
"Payment verified but order update failed"
},
{
status:500
}
);

}



return Response.json({

success:true,

message:
"Payment completed successfully"

});



}catch(error){


console.log(
"Payment verification error:",
error
);



return Response.json(
{
success:false,
message:"Verification failed"
},
{
status:500
}
);


}

}