"use client";

import {useEffect,useState} from "react";
import Link from "next/link";

type Category={
id:string;
name:string;
};


type Product={
id:string;
title:string;
thumbnail:string;
price:number;
active:boolean;
status:string;
};


export default function StoresPage(){

const [categories,setCategories]=useState<Category[]>([]);
const [products,setProducts]=useState<Product[]>([]);

const [thumbnail,setThumbnail]=useState("");
const [zip,setZip]=useState("");

const [loading,setLoading]=useState(false);


async function loadData(){

const cat=await fetch(
"/api/store/categories/list"
);

const catData=await cat.json();

setCategories(
catData.categories || []
);


const prod=await fetch(
"/api/store/products/list"
);

const prodData=await prod.json();

setProducts(
prodData.products || []
);

}


useEffect(()=>{

loadData();

},[]);



async function uploadFile(
file:File,
endpoint:string
){

const form=new FormData();

form.append(
"file",
file
);


const res=await fetch(
endpoint,
{
method:"POST",
body:form
}
);


const data=await res.json();

return data.url;

}




async function submitProduct(
e:React.FormEvent<HTMLFormElement>
){

e.preventDefault();

setLoading(true);

const form = e.currentTarget;

const formData = new FormData(form);


const body={

title:
formData.get("title"),

slug:
formData.get("slug"),

short_description:
formData.get("short"),

full_description:
formData.get("description"),

thumbnail,

zip_file:zip,

category_id:
formData.get("category"),

product_type:
formData.get("type"),


tags:
String(formData.get("tags"))
.split(",")
.map((x)=>x.trim()),


price:Number(
formData.get("price")
),


discount_price:Number(
formData.get("discount")
),


free_product:
formData.get("free")==="on",


featured:
formData.get("featured")==="on",


active:
formData.get("active")==="on",


status:
formData.get("status"),


demo_url:
formData.get("demo"),


documentation_url:
formData.get("docs"),


seo_title:
formData.get("seo_title"),


seo_description:
formData.get("seo_description")

};



try{

const res=await fetch(
"/api/store/products/create",
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
"Product creation failed"
);

}


// reset after successful save
form.reset();

setThumbnail("");

setZip("");

await loadData();


}catch(error){

console.log(error);

}finally{

setLoading(false);

}

}




async function removeProduct(
id:string
){

await fetch(
"/api/store/products/delete",
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


loadData();

}




return (

<div className="space-y-8">


<div className="flex items-center justify-between">

<div>

<h1 className="text-3xl font-bold">
Store Management
</h1>

<p className="text-gray-500 mt-1">
Manage products and categories
</p>

</div>


<div className="flex gap-3">


<Link
href="/admin/stores/categories"
className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
>
Create Category
</Link>


</div>


</div>



<form
onSubmit={submitProduct}
className="rounded-2xl border bg-white p-6 space-y-4"
>


<input
name="title"
placeholder="Product title"
required
className="input"
/>


<input
name="slug"
placeholder="product-slug"
required
className="input"
/>



<textarea
name="short"
placeholder="Short description"
className="input"
/>



<textarea
name="description"
placeholder="Full description"
className="input"
/>



<select
name="category"
className="input"
>

<option>
Select category
</option>

{
categories.map(c=>(

<option
key={c.id}
value={c.id}
>
{c.name}
</option>

))
}

</select>



<input
name="type"
placeholder="Product type (template/course)"
className="input"
/>



<input
name="tags"
placeholder="tags comma separated"
className="input"
/>



<input
name="price"
placeholder="Price"
type="number"
className="input"
/>


<input
name="discount"
placeholder="Discount price"
type="number"
className="input"
/>



<input
name="demo"
placeholder="Demo URL"
className="input"
/>



<input
name="docs"
placeholder="Documentation URL"
className="input"
/>



<input
name="seo_title"
placeholder="SEO title"
className="input"
/>



<textarea
name="seo_description"
placeholder="SEO description"
className="input"
/>



<input
type="file"
onChange={async(e)=>{

if(e.target.files){

const url=await uploadFile(
e.target.files[0],
"/api/upload/store-thumbnail"
);

setThumbnail(url);

}

}}
/>



<input
type="file"
onChange={async(e)=>{

if(e.target.files){

const url=await uploadFile(
e.target.files[0],
"/api/upload/store-file"
);

setZip(url);

}

}}
/>



<div className="flex gap-6">

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



<select
name="status"
className="input"
>

<option value="draft">
Draft
</option>

<option value="published">
Published
</option>

</select>



<button
className="rounded-xl bg-black px-6 py-3 text-white"
>

{
loading
?"Saving..."
:"Create Product"
}

</button>


</form>





<div className="rounded-2xl border bg-white">

<table className="w-full">

<thead>

<tr className="border-b">

<th className="p-4 text-left">
Product
</th>

<th>
Price
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
products.map(p=>(

<tr
key={p.id}
className="border-b"
>


<td className="p-4">

<div className="flex gap-3">

<img
src={p.thumbnail}
className="h-16 w-16 rounded object-cover"
/>

{p.title}

</div>

</td>


<td>
₹{p.price}
</td>


<td>
{p.status}
</td>


<td>

<button
onClick={()=>removeProduct(p.id)}
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