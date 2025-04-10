import { useState } from "react";
import LinkedinPostForm from "src/components/PostForm/LinkedinPostForm";
import ApiCaller from "src/utils/APIUtils";

function handleSubmit(body: any) {
    ApiCaller.post("/p/v1/posts",body).then(res=>{
        console.log(res);
    })
}

export default function PostCreationPage() {
    const [data, setData] = useState([]);
    return (
        <div>
        <LinkedinPostForm/>
        </div>
    );
}