"use client";


import {
useEffect,
useState
} from "react";


import {useRouter} from "next/navigation";


export default function ProfilePage(){


const router=useRouter();


const [profile,setProfile]=useState<any>({
name:"",
email:"",
avatar_url:""
});


const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);



async function loadProfile(){


const res =
await fetch(
"/api/profile/get"
);


const data =
await res.json();


setProfile(data);


}



useEffect(()=>{

loadProfile();

},[]);




async function updateProfile(){


setLoading(true);


await fetch(
"/api/profile/update",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
name:profile.name,
avatar_url:profile.avatar_url
})
}
);


setLoading(false);


alert("Profile Updated");

}



async function updatePassword(){


const res =
await fetch(
"/api/profile/password",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
password
})
}
);


if(res.ok){

alert(
"Password Updated"
);

setPassword("");

}

}



async function logout(){

await fetch(
"/api/auth/logout",
{
method:"POST"
}
);


router.push("/login");

}



return (

<div className="min-h-screen bg-gray-50 p-10">


<div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">


<h1 className="mb-6 text-3xl font-bold">
My Profile
</h1>



<input
value={profile.email||""}
disabled
className="mb-3 w-full rounded border p-3"
/>



<input
value={profile.name||""}
onChange={
e=>
setProfile({
...profile,
name:e.target.value
})
}
placeholder="Name"
className="mb-3 w-full rounded border p-3"
/>




<input
value={profile.avatar_url||""}
onChange={
e=>
setProfile({
...profile,
avatar_url:e.target.value
})
}
placeholder="Avatar URL"
className="mb-3 w-full rounded border p-3"
/>




<button
onClick={updateProfile}
className="rounded bg-black px-5 py-3 text-white"
>

{
loading
?
"Saving..."
:
"Save Profile"
}

</button>




<hr className="my-8"/>



<h2 className="mb-3 text-xl font-bold">
Change Password
</h2>


<input
type="password"
value={password}
onChange={
e=>setPassword(e.target.value)
}
placeholder="New Password"
className="mb-3 w-full rounded border p-3"
/>



<button
onClick={updatePassword}
className="rounded bg-blue-600 px-5 py-3 text-white"
>
Update Password
</button>




<hr className="my-8"/>



<button
onClick={logout}
className="rounded bg-red-500 px-5 py-3 text-white"
>

Logout

</button>


</div>

</div>

)

}   