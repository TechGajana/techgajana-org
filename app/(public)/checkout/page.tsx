"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";


export default function CheckoutPage(){


const router=useRouter();


const [items,setItems]=useState<any[]>([]);


const [loading,setLoading]=useState(true);



useEffect(()=>{

loadCart();

},[]);



async function loadCart(){

const res=await fetch(
"/api/cart/list"
);


const data=await res.json();


setItems(data.items||[]);


setLoading(false);

}





async function placeOrder(){


const res=await fetch(
"/api/orders/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
items
})
}
);



const data=await res.json();



if(data.success){

alert(
"Order created successfully"
);


router.push(
"/dashboard/orders"
);


}


}





if(loading){

return <div className="p-10">
Loading...
</div>

}


async function payNow(){

const createRes = await fetch(
"/api/payment/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:1000
})
}
);


const createData = await createRes.json();


const options={

key:
process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,


amount:
createData.order.amount,


currency:"INR",


name:"TechGajana",


description:"Product Purchase",


order_id:
createData.order.id,


handler:async function(response:any){

    const orderRes = await fetch(
"/api/orders/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
items
})
}
);


const orderData =
await orderRes.json();


const databaseOrderId =
orderData.order.id;


const verifyRes = await fetch(
"/api/payment/verify",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

order_id:databaseOrderId,

razorpay_order_id:
response.razorpay_order_id,

razorpay_payment_id:
response.razorpay_payment_id,

razorpay_signature:
response.razorpay_signature

})
}
);



const verifyData =
await verifyRes.json();



if(verifyData.success){

alert(
"Payment completed successfully"
);


router.push("/dashboard/orders");


}else{

alert(
"Payment verification failed"
);

}


}

};



const razorpay =
new window.Razorpay(options);



razorpay.open();

}



return(

<div className="p-8">


<h1 className="text-4xl font-bold">
Checkout
</h1>



<div className="mt-8 space-y-4">


{
items.map(
(item)=>(

<div
key={item.id}
className="rounded-xl bg-white p-5 shadow"
>

{item.store_products.title}


</div>

)

)
}


</div>



<button
onClick={payNow}
className="rounded-xl bg-black px-8 py-4 text-white"
>
Pay Now
</button>


</div>

)

}