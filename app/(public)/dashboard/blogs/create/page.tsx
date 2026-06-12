"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function CreateBlogPage(){

const router=useRouter();

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");

const [form,setForm]=useState({

title:"",
category:"",
excerpt:"",
cover_image:"",
content:""

});


function change(
e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>
){

setForm({
...form,
[e.target.name]:e.target.value
});

}



async function submitBlog(
e:React.FormEvent
){

e.preventDefault();

setLoading(true);
setError("");


if(
!form.title ||
!form.content
){

setError(
"Title and content required"
);

setLoading(false);

return;

}



try{


const res=await fetch(
"/api/user/blogs/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
}
);



const data=await res.json();



if(!res.ok){

setError(
data.error || "Failed"
);

return;

}



router.push(
"/dashboard/blogs"
);



}catch(e){

setError(
"Something went wrong"
);


}finally{

setLoading(false);

}


}



return(

<div className="min-h-screen bg-gray-50 p-6">


<div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow">


<h1 className="text-3xl font-bold">
Create Blog
</h1>


<p className="mt-2 text-gray-500">
Share your knowledge with the TechGajana community
</p>



<form
onSubmit={submitBlog}
className="mt-8 space-y-5"
>



<div>

<label className="text-sm font-medium">
Title
</label>

<input

name="title"

value={form.title}

onChange={change}

placeholder="Enter blog title"

className="mt-2 w-full rounded-xl border p-3 outline-none"

/>

</div>




<div>

<label className="text-sm font-medium">
Category
</label>


<input

name="category"

value={form.category}

onChange={change}

placeholder="Technology, AI, Web..."

className="mt-2 w-full rounded-xl border p-3 outline-none"

/>

</div>




<div>

<label className="text-sm font-medium">
Cover Image URL
</label>


<input

name="cover_image"

value={form.cover_image}

onChange={change}

placeholder="https://image-url.com"

className="mt-2 w-full rounded-xl border p-3 outline-none"

/>

</div>




<div>

<label className="text-sm font-medium">
Short Description
</label>


<textarea

name="excerpt"

value={form.excerpt}

onChange={change}

placeholder="Short summary..."

rows={3}

className="mt-2 w-full rounded-xl border p-3 outline-none"

/>

</div>




<div>

<label className="text-sm font-medium">
Content
</label>


<textarea

name="content"

value={form.content}

onChange={change}

placeholder="Write your article..."

rows={12}

className="mt-2 w-full rounded-xl border p-3 outline-none"

/>

</div>



{
error &&

<p className="text-sm text-red-500">
{error}
</p>

}



<button

disabled={loading}

className="rounded-xl bg-black px-6 py-3 text-white disabled:opacity-50"

>

{
loading
?
"Submitting..."
:
"Submit For Review"
}

</button>



</form>


</div>


</div>

)

}