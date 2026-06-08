"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";


export default function ServiceDetails(){


const params=useParams();


const [service,setService]=useState<any>(null);



async function load(){

const res =
await fetch(
"/api/services/list"
);


const data =
await res.json();


const found =
data.services.find(
(item:any)=>
item.slug===params.slug
);


setService(found);


}



useEffect(()=>{

load();

},[]);



if(!service){

return (
<div className="p-10">
Loading...
</div>
)

}



return (

<div className="
min-h-screen bg-gray-50 p-6
">


<div className="
mx-auto max-w-5xl rounded-2xl
bg-white p-8 shadow
">


<h1 className="
text-4xl font-bold
">

{service.title}

</h1>



<p className="
mt-4 text-gray-600
">

{service.full_description}

</p>



<div className="
mt-8 grid gap-4 md:grid-cols-3
">


<div className="rounded-xl border p-5">

<h3 className="font-bold">
Fast Delivery
</h3>

<p className="text-sm">
Professional execution
</p>

</div>



<div className="rounded-xl border p-5">

<h3 className="font-bold">
Support
</h3>

<p className="text-sm">
Dedicated assistance
</p>

</div>



<div className="rounded-xl border p-5">

<h3 className="font-bold">
Scalable
</h3>

<p className="text-sm">
Built for growth
</p>

</div>



</div>



<a
href={`/book-service?service=${service.slug}`}
className="
mt-8 inline-block rounded-xl
bg-black px-8 py-4 text-white
"
>
Get Started
</a>



</div>


</div>

)

}