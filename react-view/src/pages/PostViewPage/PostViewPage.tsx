import { useEffect } from "react";
import { useParams } from "react-router";
import ApiCaller from "src/utils/APIUtils";

export function PostViewPage() {
  const { postId } = useParams();

  useEffect(()=>{
    ApiCaller.get(`/p/v1/posts/${postId}`).then((res) => {
        console.log(res);
    })
  },[postId])
  return <div>{postId}</div>
}
