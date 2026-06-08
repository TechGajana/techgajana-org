"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";


export default function BookServicePage(){

const params = useSearchParams();

const service =
params.get("service");


const [loading,setLoading]=useState(false);
const [message,setMessage]=useState("");



async function submit(
e:React.FormEvent<HTMLFormElement>
){

e.preventDefault();

setLoading(true);


const form =
new FormData(e.currentTarget);



const body={

service,

name:form.get("name"),

email:form.get("email"),

message:form.get("message")

};



const res =
await fetch(
"/api/bookings/create",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(body)
}
);



if(res.ok){

setMessage(
"Request submitted successfully"
);

}


setLoading(false);

}



return (

<div className="
min-h-screen bg-gray-50 p-6
">

<form
onSubmit={submit}
className="
mx-auto max-w-xl rounded-2xl
bg-white p-8 shadow space-y-4
"
>


<h1 className="
text-3xl font-bold
">
Start Project
</h1>


<input
name="name"
placeholder="Your Name"
required
className="w-full border p-3 rounded"
/>


<input
name="email"
placeholder="Email"
type="email"
required
className="w-full border p-3 rounded"
/>


<textarea

name="message"

placeholder="Tell us about your requirement"

className="w-full border p-3 rounded"

/>



<button
className="
rounded-xl bg-black
px-6 py-3 text-white
"
>

{
loading
?
"Sending..."
:
"Submit Request"
}

</button>


{
message &&
<p className="text-green-600">
{message}
</p>
}


</form>

</div>

)

}