"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";
import Link from "next/link";


type Product={

id:string;
title:string;
slug:string;
short_description:string;
full_description:string;
thumbnail:string;
gallery:string[];
zip_file:string;
price:number;
discount_price:number;
free_product:boolean;
demo_url:string;
documentation_url:string;
category_id:string;

store_categories?:{
name:string;
};

};



export default function ProductDetailsPage(){

const params=useParams();

const slug=params.slug as string;


const [product,setProduct]=useState<Product|null>(null);

const [loading,setLoading]=useState(true);



async function loadProduct(){

try{


const res=await fetch(
`/api/store/products/get?slug=${slug}`
);


const data=await res.json();


setProduct(data.product);


}catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}



useEffect(()=>{

if(slug){

loadProduct();

}

},[slug]);



if(loading){

return(

<div className="p-10">
Loading...
</div>

)

}



if(!product){

return(

<div className="p-10">
Product not found
</div>

)

}


async function addToCart(){

if(!product){

return;

}


try{

const res=await fetch(
"/api/cart/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
product_id:product.id
})
}
);


const data=await res.json();


if(!res.ok){

alert(
data.error || "Failed to add cart"
);

return;

}


alert("Added to cart");


}catch(error){

console.log(error);

alert("Something went wrong");

}

}



return(

<div className="min-h-screen bg-gray-50 p-8">

<div className="mx-auto max-w-6xl">


<div className="grid gap-8 md:grid-cols-2">


{/* Images */}

<div>


<img
src={
product.thumbnail ||
"/images/placeholder.png"
}
alt={product.title}
className="h-[450px] w-full rounded-3xl object-cover"
/>



{
product.gallery &&
product.gallery.length>0 &&

<div className="mt-5 grid grid-cols-4 gap-3">

{

product.gallery.map(
(image,index)=>(

<img
key={index}
src={image}
alt=""
className="h-24 w-full rounded-xl object-cover"
/>

)

)

}

</div>

}



</div>





{/* Product Info */}

<div className="rounded-3xl bg-white p-8 shadow">


{
product.store_categories &&

<p className="text-sm text-gray-500">

{product.store_categories.name}

</p>

}



<h1 className="mt-3 text-4xl font-bold">

{product.title}

</h1>



<p className="mt-4 text-gray-500">

{product.short_description}

</p>




<div className="mt-6">


{

product.free_product ?


<p className="text-3xl font-bold text-green-600">

FREE

</p>


:


<div>


{
product.discount_price>0 &&

<p className="text-gray-400 line-through">

₹{product.price}

</p>

}



<p className="text-4xl font-bold">

₹
{
product.discount_price ||
product.price
}

</p>


</div>


}


</div>





<div className="mt-8 flex flex-wrap gap-4">


{

product.demo_url &&

<a
href={product.demo_url}
target="_blank"
className="rounded-xl border px-6 py-3"
>

Live Demo

</a>

}





{

product.documentation_url &&

<a
href={product.documentation_url}
target="_blank"
className="rounded-xl border px-6 py-3"
>

Documentation

</a>

}





{

product.free_product &&

<a
href={product.zip_file}
className="rounded-xl bg-black px-6 py-3 text-white"
>

Download

</a>

}





{

!product.free_product &&

<button
onClick={addToCart}
className="rounded-xl bg-black px-6 py-3 text-white"
>
Add To Cart
</button>

}



</div>



</div>


</div>





{/* Description */}


<div className="mt-10 rounded-3xl bg-white p-8 shadow">


<h2 className="text-3xl font-bold">

About this product

</h2>



<p className="mt-5 leading-8 text-gray-600">

{product.full_description}

</p>


</div>



<Link

href="/store"

className="mt-8 inline-block rounded-xl bg-gray-900 px-6 py-3 text-white"

>

Back To Store

</Link>



</div>


</div>

)

}