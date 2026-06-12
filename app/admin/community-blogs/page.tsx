"use client";

import {useEffect,useState} from "react";


export default function CommunityBlogsPage(){

const [blogs,setBlogs]=useState<any[]>([]);
const [loading,setLoading]=useState(true);



async function loadBlogs(){

try{

const res=await fetch(
"/api/admin/blogs/users"
);

const data=await res.json();

setBlogs(
data.blogs || []
);


}catch(error){

console.log(error);

}
finally{

setLoading(false);

}

}



async function updateStatus(
id:string,
status:string
){

await fetch(
"/api/admin/blogs/status",
{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id,
status
})
}
);


loadBlogs();

}



useEffect(()=>{

loadBlogs();

},[]);



if(loading){

return(
<div className="p-8">
Loading...
</div>
)

}



return(

<div className="p-8">


<h1 className="text-3xl font-bold">
Community Blogs
</h1>


<p className="mt-2 text-gray-500">
Review user submitted blogs
</p>



<div className="mt-8 grid gap-6">


{
blogs.map((blog)=>(


<div
key={blog.id}
className="rounded-2xl border bg-white p-6 shadow"
>


<h2 className="text-xl font-bold">
{blog.title}
</h2>


<p className="mt-3 text-gray-500">
{blog.excerpt}
</p>


<div className="mt-4">

<p>
Status:
<b>
{" "}
{blog.status}
</b>
</p>

</div>



<div className="mt-5 flex gap-3">


<button
onClick={()=>updateStatus(
blog.id,
"approved"
)}
className="rounded-lg bg-green-600 px-4 py-2 text-white"
>
Approve
</button>



<button
onClick={()=>updateStatus(
blog.id,
"rejected"
)}
className="rounded-lg bg-red-600 px-4 py-2 text-white"
>
Reject
</button>


</div>


</div>


))
}


</div>


</div>

)

}