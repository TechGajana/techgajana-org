"use client";

import {useEffect,useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function DashboardPage(){

const router=useRouter();

const [user,setUser]=useState<any>(null);
const [stats,setStats]=useState({
requests:0,
projects:0,
downloads:0
});
const [loading,setLoading]=useState(true);


async function loadDashboard(){

try{

const sessionRes=await fetch("/api/auth/session");
const session=await sessionRes.json();

if(!session.user){
router.push("/login");
return;
}

setUser(session.user);


const statsRes=await fetch("/api/dashboard/stats");
const statsData=await statsRes.json();

setStats({
requests:statsData.requests||0,
projects:statsData.projects||0,
downloads:statsData.downloads||0
});


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
)

}


return(
<div className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-7xl">


<div className="
rounded-3xl bg-black p-8 text-white
">

<h1 className="text-4xl font-bold">
Welcome 👋
</h1>

<p className="mt-3 text-gray-300">
{user.email}
</p>

<p className="mt-4 text-gray-400">
Manage your services, projects and purchases.
</p>

</div>



<div className="
mt-8 grid gap-6 md:grid-cols-3
">


<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Requests
</p>

<h2 className="mt-3 text-4xl font-bold">
{stats.requests}
</h2>

</div>


<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Projects
</p>

<h2 className="mt-3 text-4xl font-bold">
{stats.projects}
</h2>

</div>


<div className="rounded-2xl bg-white p-6 shadow">

<p className="text-gray-500">
Downloads
</p>

<h2 className="mt-3 text-4xl font-bold">
{stats.downloads}
</h2>

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
className="
block rounded-xl bg-gray-100 p-4 hover:bg-gray-200
"
>
Explore Services
</Link>


<Link
href="/dashboard/bookings"
className="
block rounded-xl bg-gray-100 p-4 hover:bg-gray-200
"
>
View Requests
</Link>


<Link
href="/profile"
className="
block rounded-xl bg-gray-100 p-4 hover:bg-gray-200
"
>
Update Profile
</Link>


</div>

</div>




<div className="rounded-2xl bg-white p-6 shadow">


<h2 className="text-2xl font-bold">
Account
</h2>


<div className="mt-5 space-y-3">


<p>
Email:
</p>

<p className="rounded-lg bg-gray-100 p-3">
{user.email}
</p>


<p>
User ID:
</p>

<p className="break-all rounded-lg bg-gray-100 p-3 text-sm">
{user.id}
</p>


</div>


</div>


</div>


</div>

</div>
)

}