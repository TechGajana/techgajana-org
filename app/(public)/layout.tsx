import UserNavbar from "@/components/user/navbar";

export default function PublicLayout({
children
}:{
children:React.ReactNode
}){

return(
<>
<UserNavbar/>

{children}

</>
)

}