"use client";


import {useState} from "react";
import {useRouter} from "next/navigation";

import {createClient} 
from "@/lib/supabase/client";



export default function ResetPassword(){


const router=useRouter();

const supabase=createClient();


const [password,setPassword]
=
useState("");

const [msg,setMsg]
=
useState("");



async function update(){


const {error}
=
await supabase.auth.updateUser({
password
});


if(error){

setMsg(error.message);

return;

}


setMsg(
"Password updated successfully"
);



setTimeout(()=>{

router.push("/login");

},1500);


}



return (

<div className="
min-h-screen flex items-center justify-center
">


<div className="
border p-6 rounded-xl w-full max-w-md
">


<h1 className="text-2xl font-bold mb-4">

Reset Password

</h1>


<input

type="password"

placeholder="New Password"

value={password}

onChange={
e=>setPassword(e.target.value)
}

className="
border p-3 rounded-lg w-full mb-4
"

/>



<button

onClick={update}

className="
bg-black text-white p-3 rounded-lg w-full
"

>

Update Password

</button>


<p>
{msg}
</p>


</div>


</div>

)


}