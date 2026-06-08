"use client";

import {useEffect,useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function BookingsPage(){

const router=useRouter();

const [bookings,setBookings]=useState<any[]>([]);
const [loading,setLoading]=useState(true);


async function loadBookings(){

try{

const sessionRes=await fetch("/api/auth/session");
const session=await sessionRes.json();

if(!session.user){
router.push("/login");
return;
}


const res=await fetch("/api/bookings/list");

const data=await res.json();


if(res.ok){
setBookings(data.bookings || []);
}


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}



useEffect(()=>{

loadBookings();

},[]);



if(loading){

return(
<div className="p-10">
Loading bookings...
</div>
);

}



return(
<div className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-6xl">


<div className="rounded-3xl bg-black p-8 text-white">

<h1 className="text-3xl font-bold">
My Service Requests
</h1>

<p className="mt-2 text-gray-300">
Track your service booking status
</p>

</div>



{bookings.length===0 ? (

<div className="mt-8 rounded-2xl bg-white p-10 text-center shadow">

<h2 className="text-xl font-semibold">
No bookings yet
</h2>

<p className="mt-2 text-gray-500">
Book a service and it will appear here.
</p>


<Link
href="/services"
className="mt-5 inline-block rounded-xl bg-black px-6 py-3 text-white"
>
Explore Services
</Link>


</div>

):(


<div className="mt-8 grid gap-6">


{bookings.map((item)=>(
<div
key={item.id}
className="rounded-2xl bg-white p-6 shadow"
>


<div className="flex flex-col justify-between gap-4 md:flex-row">


<div>


<h2 className="text-xl font-bold">
{item.service_name || "Service Request"}
</h2>


<p className="mt-2 text-gray-500">
{item.message}
</p>


<p className="mt-3 text-sm text-gray-400">
Created:
{" "}
{new Date(item.created_at).toLocaleDateString()}
</p>


</div>



<div>


<span
className={`rounded-full px-4 py-2 text-sm font-medium
${
item.status==="approved"
?"bg-green-100 text-green-700"
:item.status==="rejected"
?"bg-red-100 text-red-700"
:"bg-yellow-100 text-yellow-700"
}
`}
>

{item.status || "pending"}

</span>


</div>


</div>


</div>

))}


</div>

)}



</div>

</div>

);

}