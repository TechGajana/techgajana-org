"use client";

import {useEffect,useState} from "react";
import {useParams} from "next/navigation";

export default function BlogDetails(){

const params=useParams();

const [blog,setBlog]=useState<any>(null);
const [loading,setLoading]=useState(true);


async function loadBlog(){

try{

const res=await fetch("/api/blogs/list");

const data=await res.json();

const found=data.blogs?.find(
(item:any)=>item.slug===params.slug
);


setBlog(found);


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}



useEffect(()=>{

loadBlog();

},[]);



if(loading){

return(
<div className="p-10">
Loading...
</div>
);

}



if(!blog){

return(
<div className="p-10">
Blog not found
</div>
);

}



return(

<article className="min-h-screen bg-gray-50 p-6">

<div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">


{blog.image && (

<img
src={blog.image}
className="mb-8 h-96 w-full rounded-2xl object-cover"
/>

)}



<h1 className="text-5xl font-bold">

{blog.title}

</h1>



<p className="mt-4 text-gray-400">

{new Date(blog.created_at).toLocaleDateString()}

</p>



<div
className="mt-8 leading-8 text-gray-700"
>

{blog.content}

</div>


</div>

</article>

);

}