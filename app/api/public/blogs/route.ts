import {createClient} from "@/lib/supabase/server";


export async function GET(){

try{

const supabase=await createClient();



const {
data:adminBlogs,
error:adminError
}=await supabase
.from("blogs")
.select("*")
.eq(
"published",
true
)
.order(
"created_at",
{
ascending:false
}
);



if(adminError)
throw adminError;




const {
data:userBlogs,
error:userError
}=await supabase
.from("user_blogs")
.select("*")
.eq(
"status",
"approved"
)
.order(
"created_at",
{
ascending:false
}
);



if(userError)
throw userError;



const blogs=[

...(adminBlogs || []).map(
(blog)=>({
...blog,
source:"admin"
})
),


...(userBlogs || []).map(
(blog)=>({

id:blog.id,

title:blog.title,

excerpt:blog.excerpt,

content:blog.content,

thumbnail_url:
blog.cover_image,

category:blog.category,

author:"Community",

published:true,

source:"user"

})
)

];



return Response.json({
blogs
});


}catch(error){

console.log(error);


return Response.json(
{
error:"Failed loading blogs"
},
{
status:500
}
);

}

}