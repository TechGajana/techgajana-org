"use client";

import {useEffect,useState} from "react";
import Link from "next/link";


export default function UserBlogs(){


const [blogs,setBlogs]=useState<any[]>([]);
const [loading,setLoading]=useState(true);



async function loadBlogs(){

const res=await fetch(
"/api/user/blogs/list"
);


const data=await res.json();


setBlogs(
data.blogs || []
);


setLoading(false);

}



useEffect(()=>{

loadBlogs();

},[]);



async function deleteBlog(id:string){

const ok=confirm(
"Delete this blog?"
);


if(!ok)return;


await fetch(
"/api/user/blogs/delete",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id
})
}
);


loadBlogs();

}



if(loading){

return(
<div className="p-10">
Loading...
</div>
);

}



return(

<div className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-6xl">


<div className="flex items-center justify-between">

<h1 className="text-3xl font-bold">
My Blogs
</h1>


<Link
href="/dashboard/blogs/create"
className="rounded-xl bg-black px-5 py-3 text-white"
>
Create Blog
</Link>


</div>



<div className="mt-8 grid gap-6">


{
blogs.map((blog)=>(

<div
key={blog.id}
className="rounded-2xl bg-white p-6 shadow"
>


<h2 className="text-xl font-bold">
{blog.title}
</h2>


<p className="mt-3 text-gray-500">
{blog.short_description}
</p>



<div className="mt-5 flex items-center justify-between">


<span
className="rounded-full bg-yellow-100 px-4 py-2 text-sm"
>
{blog.status}
</span>



<button
onClick={()=>deleteBlog(blog.id)}
className="text-red-500"
>
Delete
</button>


</div>


</div>


))
}



</div>


</div>

</div>

)

}