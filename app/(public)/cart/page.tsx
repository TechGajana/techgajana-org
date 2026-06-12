"use client";

import {useEffect,useState} from "react";
import Link from "next/link";


type CartProduct={
id:string;
title:string;
slug:string;
thumbnail:string;
price:number;
discount_price:number;
free_product:boolean;
};


type CartItem={
id:string;
quantity:number;
store_products:CartProduct;
};



export default function CartPage(){

const [items,setItems]=useState<CartItem[]>([]);

const [loading,setLoading]=useState(true);



async function loadCart(){

try{

const res=await fetch(
"/api/cart/list"
);


const data=await res.json();


setItems(
data.items || []
);


}catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}



useEffect(()=>{

loadCart();

},[]);





async function removeItem(id:string){

try{


const res=await fetch(
"/api/cart/remove",
{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id
})
}
);



if(res.ok){

setItems(
items.filter(
(item)=>item.id!==id
)
);

}


}catch(error){

console.log(error);

}

}





const total=items.reduce(
(sum,item)=>{

const product=item.store_products;


return sum+
(
product.discount_price ||
product.price
)
*
item.quantity;


},
0
);





if(loading){

return(

<div className="p-10">

Loading cart...

</div>

)

}




return(

<div className="min-h-screen bg-gray-50 p-8">

<div className="mx-auto max-w-6xl">


<h1 className="text-4xl font-bold">

Your Cart

</h1>



{
items.length===0 ?

<div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">


<h2 className="text-2xl font-semibold">

Cart is empty

</h2>


<Link
href="/store"
className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-white"
>

Explore Store

</Link>


</div>


:


<div className="mt-8 grid gap-8 lg:grid-cols-3">



<div className="space-y-5 lg:col-span-2">


{
items.map(
(item)=>(

<div
key={item.id}
className="flex gap-5 rounded-2xl bg-white p-5 shadow"
>


<img

src={
item.store_products.thumbnail ||
"/images/placeholder.png"
}

className="h-32 w-32 rounded-xl object-cover"

/>



<div className="flex-1">


<h2 className="text-xl font-bold">

{item.store_products.title}

</h2>



<p className="mt-3 text-lg font-semibold">

₹
{
item.store_products.discount_price ||
item.store_products.price
}

</p>



<button

onClick={()=>removeItem(item.id)}

className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white"

>

Remove

</button>


</div>


</div>

)

)

}



</div>






<div className="h-fit rounded-2xl bg-white p-6 shadow">


<h2 className="text-2xl font-bold">

Summary

</h2>



<div className="mt-6 flex justify-between">

<span>
Items
</span>


<span>
{items.length}
</span>


</div>



<div className="mt-4 flex justify-between text-xl font-bold">

<span>
Total
</span>


<span>

₹{total}

</span>


</div>



<Link href="/checkout">

<button
className="mt-8 w-full rounded-xl bg-black px-6 py-4 text-white"
>
Proceed Checkout
</button>

</Link>



</div>




</div>

}



</div>

</div>

)

}