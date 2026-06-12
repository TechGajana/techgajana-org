"use client";

import {useEffect,useState} from "react";


type Category={
id:string;
name:string;
slug:string;
description:string;
active:boolean;
featured:boolean;
};


export default function CategoriesPage(){

const [categories,setCategories]=useState<Category[]>([]);
const [loading,setLoading]=useState(false);



async function loadCategories(){

const res=await fetch(
"/api/store/categories/list"
);

const data=await res.json();

setCategories(
data.categories || []
);

}



useEffect(()=>{

loadCategories();

},[]);



async function createCategory(
  e:React.FormEvent<HTMLFormElement>
){

e.preventDefault();

setLoading(true);

const form = e.currentTarget;


const formData = new FormData(form);


const body = {

name:
formData.get("name"),

slug:
formData.get("slug"),

description:
formData.get("description"),

featured:
formData.get("featured")==="on",

active:
formData.get("active")==="on"

};


try{

const res = await fetch(
"/api/store/categories/create",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify(body)
}
);


if(!res.ok){

throw new Error(
"Category creation failed"
);

}


// reset safely
form.reset();


await loadCategories();


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}




async function deleteCategory(
id:string
){

await fetch(
"/api/store/categories/delete",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
id
})
}
);


loadCategories();

}



return(

<div className="space-y-8">


<div>

<h1 className="text-3xl font-bold">
Store Categories
</h1>

<p className="text-gray-500">
Manage product categories
</p>

</div>



<form
onSubmit={createCategory}
className="space-y-4 rounded-2xl border bg-white p-6"
>


<input
name="name"
placeholder="Category name"
required
className="input"
/>



<input
name="slug"
placeholder="category-slug"
required
className="input"
/>



<textarea
name="description"
placeholder="Description"
className="input"
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
name="active"
defaultChecked
/>
 Active
</label>


</div>



<button
className="rounded-xl bg-black px-6 py-3 text-white"
>

{
loading
?"Saving..."
:"Create Category"
}

</button>


</form>





<div className="rounded-2xl border bg-white">

<table className="w-full">


<thead>

<tr className="border-b">

<th className="p-4 text-left">
Name
</th>

<th>
Slug
</th>

<th>
Status
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>

{
categories.map(c=>(

<tr
key={c.id}
className="border-b"
>


<td className="p-4">
{c.name}
</td>


<td>
{c.slug}
</td>


<td>

{
c.active
?
"Active"
:
"Disabled"
}

</td>


<td>

<button
onClick={()=>deleteCategory(c.id)}
className="text-red-500"
>
Delete
</button>

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