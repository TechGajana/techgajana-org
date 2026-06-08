"use client";

import {useEffect,useState} from "react";
import Link from "next/link";

export default function BlogsPage(){

const [blogs,setBlogs]=useState<any[]>([]);
const [loading,setLoading]=useState(true);
const [search,setSearch]=useState("");


async function loadBlogs(){

try{

const res=await fetch("/api/blogs/list");

const data=await res.json();

setBlogs(data.blogs || []);

}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}


useEffect(()=>{

loadBlogs();

},[]);



const filteredBlogs=blogs.filter((blog)=>{

return (
blog.title
?.toLowerCase()
.includes(search.toLowerCase())
);

});



if(loading){

return(
<div className="p-10">
Loading blogs...
</div>
);

}



return(

<div className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-7xl">


<div className="rounded-3xl bg-black p-10 text-white">


<h1 className="text-5xl font-bold">
TechGajana Blogs
</h1>


<p className="mt-3 text-gray-300">
Insights, tutorials and technology updates
</p>


<input
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search blogs..."
className="mt-6 w-full rounded-xl bg-white p-4 text-black"
/>


</div>



{filteredBlogs.length===0?(

<div className="mt-10 rounded-2xl bg-white p-10 text-center shadow">

No blogs found

</div>

):(


<div className="mt-10 grid gap-8 md:grid-cols-3">


{filteredBlogs.map((blog)=>(


<Link
key={blog.id}
href={`/blogs/${blog.slug}`}
className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1"
>


{blog.image && (

<img
src={blog.image}
className="h-52 w-full object-cover"
/>

)}



<div className="p-6">


<h2 className="text-xl font-bold">

{blog.title}

</h2>


<p className="mt-3 text-gray-500">

{blog.short_description}

</p>


<p className="mt-4 text-sm text-gray-400">

{new Date(blog.created_at).toLocaleDateString()}

</p>


</div>


</Link>


))}


</div>


)}



</div>

</div>

);

}