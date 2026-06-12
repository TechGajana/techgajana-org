"use client";

import {useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";

import ImageUpload from "@/components/admin/image-upload";
import RichTextEditor from "@/components/admin/rich-text-editor";


interface Blog{
id:string;
title:string;
slug:string;
excerpt:string;
content:string;
thumbnail_url:string;
category:string;
tags:string[];
author:string;
reading_time:number;
featured:boolean;
published:boolean;
seo_title:string;
seo_description:string;
}


interface UserBlog{
id:string;
title:string;
excerpt:string;
content:string;
cover_image:string;
category:string;
status:string;
profiles?:{
name:string;
email:string;
};
}


export default function BlogsPage(){


const [blogs,setBlogs]=useState<Blog[]>([]);
const [userBlogs,setUserBlogs]=useState<UserBlog[]>([]);

const [loading,setLoading]=useState(false);

const [thumbnailUrl,setThumbnailUrl]=useState("");
const [content,setContent]=useState("");



async function fetchBlogs(){

try{

const res=await fetch(
"/api/blogs/list"
);

const data=await res.json();

setBlogs(
data.blogs||[]
);


const userRes=await fetch(
"/api/admin/blogs/users"
);


const userData=await userRes.json();

setUserBlogs(
userData.blogs||[]
);


}catch(error){

console.error(error);

}

}



useEffect(()=>{

fetchBlogs();

},[]);




async function handleSubmit(
e:React.FormEvent<HTMLFormElement>
){

e.preventDefault();

setLoading(true);


const form=e.currentTarget;

const formData=new FormData(form);



const body={

title:formData.get("title"),

slug:formData.get("slug"),

excerpt:formData.get("excerpt"),

content,

thumbnail_url:thumbnailUrl,

category:formData.get("category"),

tags:
(String(formData.get("tags")))
.split(",")
.map(
tag=>tag.trim()
),

author:formData.get("author"),

reading_time:Number(
formData.get("reading_time")
),

featured:
formData.get("featured")==="on",

published:
formData.get("published")==="on",

seo_title:formData.get("seo_title"),

seo_description:
formData.get("seo_description")

};



try{

const res=await fetch(
"/api/blogs/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(body)
}
);



if(res.ok){

form.reset();

setThumbnailUrl("");

setContent("");

fetchBlogs();

}


}catch(error){

console.error(error);

}
finally{

setLoading(false);

}

}





async function handleDelete(
id:string
){

if(!confirm("Delete this blog?"))
return;


await fetch(
"/api/blogs/delete",
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


fetchBlogs();

}





async function updateUserBlog(
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


fetchBlogs();

}




return(

<div>


<div>

<h1 className="text-3xl font-bold">
Blogs
</h1>

<p className="mt-2 text-gray-500">
Manage admin and user blogs.
</p>

</div>



<form
onSubmit={handleSubmit}
className="mt-10 space-y-4 rounded-2xl border bg-white p-6"
>


<input
name="title"
placeholder="Blog Title"
required
className="w-full rounded-lg border p-3"
/>


<input
name="slug"
placeholder="Slug"
required
className="w-full rounded-lg border p-3"
/>


<textarea
name="excerpt"
placeholder="Excerpt"
className="w-full rounded-lg border p-3"
/>



<ImageUpload

value={thumbnailUrl}

onChange={setThumbnailUrl}

uploadEndpoint="/api/upload/blog-image"

/>



<RichTextEditor

value={content}

onChange={setContent}

/>



<input
name="category"
placeholder="Category"
className="w-full rounded-lg border p-3"
/>


<input
name="tags"
placeholder="AI, Next.js"
className="w-full rounded-lg border p-3"
/>


<input
name="author"
placeholder="Author"
className="w-full rounded-lg border p-3"
/>


<input
name="reading_time"
type="number"
placeholder="Reading time"
className="w-full rounded-lg border p-3"
/>


<input
name="seo_title"
placeholder="SEO title"
className="w-full rounded-lg border p-3"
/>


<textarea
name="seo_description"
placeholder="SEO description"
className="w-full rounded-lg border p-3"
/>



<div className="flex gap-5">

<label>
<input
type="checkbox"
name="featured"
/>
 Featured
</label>


<label>
<input
type="checkbox"
name="published"
defaultChecked
/>
 Published
</label>

</div>



<button
className="rounded-xl bg-black px-6 py-3 text-white"
>

{
loading?
"Creating..."
:
"Create Blog"
}

</button>


</form>











<div className="mt-12 overflow-x-auto rounded-2xl border bg-white">

<table className="min-w-full">

<thead className="bg-gray-100">

<tr>

<th className="px-6 py-4 text-left">
Image
</th>

<th className="px-6 py-4 text-left">
Title
</th>

<th className="px-6 py-4 text-left">
Category
</th>

<th className="px-6 py-4 text-left">
Action
</th>

</tr>

</thead>


<tbody>


{
blogs.map(blog=>(

<tr
key={blog.id}
className="border-t"
>


<td className="px-6 py-4">

<Image

src={
blog.thumbnail_url ||
"/images/placeholder.png"
}

alt={blog.title}

width={80}

height={80}

className="rounded-lg object-cover"

/>

</td>



<td className="px-6 py-4">

{blog.title}

</td>


<td className="px-6 py-4">

{blog.category}

</td>



<td className="px-6 py-4">


<div className="flex gap-3">


<Link
href={`/admin/blogs/${blog.id}`}
>

<button className="rounded-lg bg-blue-500 px-4 py-2 text-white">

Edit

</button>


</Link>



<button

onClick={()=>
handleDelete(blog.id)
}

className="rounded-lg bg-red-500 px-4 py-2 text-white"

>

Delete

</button>


</div>


</td>



</tr>

))

}


</tbody>

</table>

</div>



</div>

)

}