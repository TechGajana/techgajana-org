"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function DashboardPage(){

const router=useRouter();

const [user,setUser]=useState<any>(null);
const [loading,setLoading]=useState(true);

async function loadDashboard(){

try{

const res=await fetch("/api/auth/session");

const data=await res.json();

if(!data.user){
router.push("/login");
return;
}

setUser(data.user);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}


useEffect(()=>{

loadDashboard();

},[]);


if(loading){

return(
<div className="p-10">
Loading...
</div>
);

}


return(
<div className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-7xl">


<div className="rounded-3xl bg-black p-8 text-white">

<h1 className="text-4xl font-bold">
Welcome 👋
</h1>

<p className="mt-3 text-gray-300">
{user?.email}
</p>

<p className="mt-4 text-gray-400">
Manage your TechGajana account.
</p>

</div>



<div className="mt-8 grid gap-6 md:grid-cols-3">


<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Services
</p>

<h2 className="mt-3 text-3xl font-bold">
Explore
</h2>

<Link
href="/services"
className="mt-4 inline-block text-sm font-medium"
>
View Services →
</Link>

</div>



<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Bookings
</p>

<h2 className="mt-3 text-3xl font-bold">
Manage
</h2>

<Link
href="/dashboard/bookings"
className="mt-4 inline-block text-sm font-medium"
>
View Requests →
</Link>

</div>



<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Profile
</p>

<h2 className="mt-3 text-3xl font-bold">
Account
</h2>

<Link
href="/profile"
className="mt-4 inline-block text-sm font-medium"
>
Update →
</Link>

</div>


</div>



<div className="mt-10 grid gap-6 md:grid-cols-2">



<div className="rounded-2xl bg-white p-6 shadow">

<h2 className="text-2xl font-bold">
Quick Actions
</h2>


<div className="mt-5 space-y-3">


<Link
href="/services"
className="block rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
>
Explore Services
</Link>



<Link
href="/dashboard/blogs/create"
className="block rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
>
Create Blog
</Link>


<Link
href="/dashboard/blogs"
className="block rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
>
My Blogs
</Link>


<Link
href="/dashboard/bookings"
className="block rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
>
My Bookings
</Link>


<Link
href="/profile"
className="block rounded-xl bg-gray-100 p-4 hover:bg-gray-200"
>
Edit Profile
</Link>


</div>

</div>




<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="text-2xl font-bold">
Account Details
</h2>


<div className="mt-5 space-y-4">


<div>

<p className="text-sm text-gray-500">
Email
</p>

<p className="rounded-lg bg-gray-100 p-3">
{user?.email}
</p>

</div>



<div>

<p className="text-sm text-gray-500">
User ID
</p>

<p className="break-all rounded-lg bg-gray-100 p-3 text-sm">
{user?.id}
</p>

</div>


</div>


</div>


</div>


</div>

</div>
);

}