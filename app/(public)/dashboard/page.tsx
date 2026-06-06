"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function DashboardPage(){

const router = useRouter();

const [user,setUser]=useState<any>(null);
const [loading,setLoading]=useState(true);


async function getUser(){

try{

const res = await fetch(
"/api/auth/session"
);

const data = await res.json();


if(!data.user){

router.push("/login");
return;

}


setUser(data.user);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}



useEffect(()=>{

getUser();

},[]);



if(loading){

return (
<div className="p-10">
Loading...
</div>
)

}



return (

<div className="min-h-screen bg-gray-50 p-10">


<div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow">


<h1 className="text-3xl font-bold">

Welcome 👋

</h1>


<p className="mt-2 text-gray-500">

TechGajana User Dashboard

</p>



<div className="mt-8 space-y-4">


<div>

<b>Email:</b>

<p>
{user.email}
</p>

</div>



<div>

<b>User ID:</b>

<p className="break-all">
{user.id}
</p>

</div>



</div>


</div>


</div>

)

}