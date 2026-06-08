"use client";

import { useEffect, useState } from "react";
import Link from "next/link";


export default function ServicesPage(){

const [services,setServices]=useState<any[]>([]);
const [search,setSearch]=useState("");
const [loading,setLoading]=useState(true);



async function fetchServices(){

try{

const res =
await fetch(
"/api/services/list",
{
cache:"no-store"
}
);


const data =
await res.json();


setServices(
data.services || []
);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}



useEffect(()=>{

fetchServices();

},[]);




const filtered =
services.filter((item)=>{

return item.title
?.toLowerCase()
.includes(
search.toLowerCase()
);

});



if(loading){

return (
<div className="p-10">
Loading services...
</div>
)

}



return (

<main className="
min-h-screen bg-gray-50 p-6
">


<div className="
mx-auto max-w-7xl
">


<h1 className="
text-4xl font-bold
">

Our Services

</h1>


<p className="
mt-2 text-gray-500
">

Business solutions powered by technology

</p>



<input

value={search}

onChange={
e=>setSearch(e.target.value)
}

placeholder="Search services..."

className="
mt-8 w-full rounded-xl border
bg-white p-4
"

/>



<div className="
mt-8 grid gap-6
md:grid-cols-2
lg:grid-cols-3
">



{
filtered.map((service)=>(


<Link

key={service.id}

href={`/services/${service.slug}`}

className="
rounded-2xl bg-white p-6 shadow
hover:shadow-xl transition
"

>


{(service.image || service.image_url || service.thumbnail) && (
  <img
    src={
      service.image ||
      service.image_url ||
      service.thumbnail
    }
    alt={service.title}
    className="mb-4 h-48 w-full rounded-xl object-cover"
  />
)}



<h2 className="
text-xl font-bold
">

{service.title}

</h2>


<p className="
mt-2 text-sm text-gray-500
">

{service.short_description}

</p>



<div className="
mt-5 font-semibold
">

Explore →

</div>


</Link>


))

}



</div>


</div>


</main>

)

}