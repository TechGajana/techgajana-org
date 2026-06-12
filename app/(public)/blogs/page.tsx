"use client";

import {useEffect,useState} from "react";


export default function BlogsPage(){


const [blogs,setBlogs]=useState([]);



async function loadBlogs(){

const res=await fetch(
"/api/public/blogs"
);

const data=await res.json();

setBlogs(
data.blogs || []
);

}



useEffect(()=>{

loadBlogs();

},[]);



return(

<div className="p-8">


<h1 className="text-4xl font-bold">
Blogs
</h1>


<div className="mt-8 grid gap-6 md:grid-cols-3">


{
blogs.map((blog:any)=>(


<div
key={blog.id}
className="rounded-2xl bg-white p-6 shadow"
>


<h2 className="text-xl font-bold">
{blog.title}
</h2>


<p className="mt-3 text-gray-500">
{blog.excerpt}
</p>


<p className="mt-3 text-sm">
{blog.category}
</p>


</div>


))

}


</div>


</div>

)

}