"use client";

import {useEffect,useState} from "react";
import Link from "next/link";


type Product={

id:string;
title:string;
slug:string;
thumbnail:string;
short_description:string;
price:number;
discount_price:number;
free_product:boolean;

};



export default function StorePage(){

const [products,setProducts]=useState<Product[]>([]);


async function loadProducts(){

const res=await fetch(
"/api/store/products/list"
);

const data=await res.json();


setProducts(
(data.products || [])
.filter(
(p:Product)=>true
)
);

}



useEffect(()=>{

loadProducts();

},[]);



return(

<div className="min-h-screen bg-gray-50 p-8">


<div className="mx-auto max-w-7xl">


<div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
  <div>
    <h1 className="text-4xl font-bold">
      TechGajana Store
    </h1>

    <p className="mt-2 text-gray-500">
      Premium digital products
    </p>
  </div>

  <div className="md:self-start">
    <Link
      href="/cart"
      className="rounded-xl bg-black px-6 py-3 text-white shadow hover:bg-gray-800"
    >
      🛒 View Cart
    </Link>
  </div>
</div>






<div className="mt-10 grid gap-6 md:grid-cols-3">


{
products.map(product=>(


<div
key={product.id}
className="rounded-2xl bg-white p-5 shadow"
>


<img
src={product.thumbnail}
className="h-52 w-full rounded-xl object-cover"
/>



<h2 className="mt-4 text-xl font-bold">
{product.title}
</h2>


<p className="mt-2 text-gray-500">
{product.short_description}
</p>



<div className="mt-4 flex gap-3">


{
product.free_product?

<p className="font-bold text-green-600">
FREE
</p>

:

<p className="font-bold">
₹{product.discount_price || product.price}
</p>

}



</div>



<Link
href={`/store/${product.slug}`}
className="mt-5 block rounded-xl bg-black p-3 text-center text-white"
>
View Product
</Link>



</div>


))

}


</div>


</div>


</div>

)

}