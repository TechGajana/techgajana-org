"use client";


import {useState} from "react";
import Link from "next/link";


export default function ForgotPassword(){


const [email,setEmail]=useState("");

const [message,setMessage]=useState("");

const [loading,setLoading]=useState(false);



async function submit(e:React.FormEvent){

e.preventDefault();

setLoading(true);


const res =
await fetch(
"/api/auth/forgot-password",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email
})
});


const data =
await res.json();


if(!res.ok){

setMessage(data.error);

}else{

setMessage(
"Reset link sent to your email"
);

}


setLoading(false);

}



return (

<main className="
min-h-screen flex items-center justify-center
">


<form
onSubmit={submit}
className="
w-full max-w-md
border rounded-xl p-6 space-y-4
"
>


<h1 className="text-2xl font-bold">
Forgot Password
</h1>


<input

type="email"

placeholder="Email"

required

value={email}

onChange={
e=>setEmail(e.target.value)
}

className="
w-full border p-3 rounded-lg
"

/>


{
message &&
<p className="text-sm">
{message}
</p>
}



<button
className="
bg-black text-white w-full p-3 rounded-lg
"
>

{
loading
?"Sending..."
:"Send Reset Link"
}

</button>



<Link
href="/login"
className="text-sm"
>
Back to Login
</Link>


</form>


</main>

)

}