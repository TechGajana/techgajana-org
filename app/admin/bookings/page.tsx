"use client";

import {useEffect,useState} from "react";

export default function BookingsPage(){

const [bookings,setBookings]=useState<any[]>([]);
const [loading,setLoading]=useState(true);


async function loadBookings(){

try{

const res=await fetch("/api/bookings/list");

const data=await res.json();

setBookings(data.bookings||[]);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}


async function updateStatus(id:string,status:string){

try{

await fetch("/api/bookings/update",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id,
status
})
});

loadBookings();

}catch(error){

console.log(error);

}

}


useEffect(()=>{

loadBookings();

},[]);


if(loading){

return <div className="p-6">Loading...</div>;

}


return(
<div className="p-6">

<h1 className="mb-6 text-3xl font-bold">
Bookings
</h1>

<div className="space-y-4">

{bookings.length===0?(
<div className="rounded-xl border bg-white p-6">
No bookings found
</div>
):(

bookings.map((booking)=>(
<div
key={booking.id}
className="rounded-xl border bg-white p-6"
>

<h2 className="text-xl font-bold">
{booking.name}
</h2>

<p className="text-gray-500">
{booking.email}
</p>

<p className="mt-4">
{booking.message}
</p>

<div className="mt-4">
<span className="font-semibold">
Service:
</span>{" "}
{booking.service_slug}
</div>


<div className="mt-4 flex items-center gap-3">

<span className="font-semibold">
Status:
</span>

<select
value={booking.status}
onChange={(e)=>
updateStatus(
booking.id,
e.target.value
)
}
className="rounded-lg border p-2"
>

<option value="pending">
Pending
</option>

<option value="processing">
Processing
</option>

<option value="completed">
Completed
</option>

<option value="cancelled">
Cancelled
</option>

</select>

</div>


</div>
))

)}

</div>

</div>
);

}