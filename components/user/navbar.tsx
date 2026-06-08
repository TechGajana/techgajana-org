"use client";

import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";


export default function UserNavbar(){

const router=useRouter();

const [open,setOpen]=useState(false);


async function logout(){

await fetch("/api/auth/logout",{
method:"POST"
});

router.push("/login");

}


return(
<header className="
sticky top-0 z-50
border-b bg-white/80
backdrop-blur
">

<div className="
mx-auto flex max-w-7xl
items-center justify-between
p-4
">


<Link
href="/dashboard"
className="
text-2xl font-bold
"
>

TechGajana

</Link>



<nav className="
hidden gap-8 md:flex
">


<Link
href="/dashboard"
className="hover:text-blue-600"
>
Dashboard
</Link>


<Link
href="/services"
className="hover:text-blue-600"
>
Services
</Link>


<Link
href="/store"
className="hover:text-blue-600"
>
Store
</Link>


<Link
href="/dashboard/bookings"
className="hover:text-blue-600"
>
Requests
</Link>


</nav>



<div className="relative">


<button
onClick={()=>setOpen(!open)}
className="
rounded-full bg-black
px-5 py-2 text-white
"
>

Account

</button>



{
open && (

<div className="
absolute right-0 mt-3
w-48 rounded-xl
border bg-white p-3 shadow
">


<Link
href="/dashboard/profile"
className="
block rounded p-2 hover:bg-gray-100
"
>
Profile
</Link>


<Link
href="/dashboard/settings"
className="
block rounded p-2 hover:bg-gray-100
"
>
Settings
</Link>


<button
onClick={logout}
className="
mt-2 w-full rounded p-2
text-left hover:bg-gray-100
"
>
Logout
</button>


</div>

)

}


</div>


</div>

</header>
)

}