
import './App.css'

import {useQuery,useMutation,useQueryClient} from "@tanstack/react-query";

const POSTS = [
  {id:1,title:"Saurav"},
  {id:2,title:"Kumar"}
]

// posts -> ["posts"]
// posts/1 -> ["posts",post.id]
// posts?authorId=1 -> ["posts",{authorId:1}]
// posts/2/comments -> ["posts",post.id,"comments"]

function App() {
  const queryClient = useQueryClient();
  const postQuery = useQuery({
    queryKey:["posts"],
    queryFn: obj=>
      wait(1000).then(()=>{
      console.log(obj)
      return [...POSTS]
    }),
    staleTime:1000
  })

  // const postQuery = useQuery({
  //   queryKey:["posts"],
  //   queryFn: obj=>
  //     wait(1000).then(()=>{
  //     console.log(obj)
  //     return [...POSTS]
  //   }),
  //   refetchInterval:1000 -> refetch the data every one second
  // })

  const postQuery1 = useQuery({
    queryKey:["posts",1],
    queryFn: obj=>
      wait(1000).then(()=>{
      console.log(obj)
      return [...POSTS].filter((el)=> el.id === 1)
    })
  })

  function wait(duration){
    return new Promise(resolve=>setTimeout(resolve,duration));
  }

  const newPostMutation = useMutation({
    mutationFn:title=>{
      return wait(1000).then(()=>POSTS.push({id:crypto.randomUUID(),title}))
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["posts"])
    }
  })

  if(postQuery.isLoading) return <h1>Loading...</h1>

  if(postQuery.error) return <pre>{JSON.stringify(postQuery.error)}</pre>

  console.log(postQuery);

  return (
    <>
      {postQuery.data.map((el)=>(
        <div key={el.id}>{el.title}</div>
      ))}

      {postQuery1.data.map((el)=>(
        <div key={el.id}>{el.title}</div>
      ))}

      <button disabled={newPostMutation.isLoading} onClick={()=> newPostMutation.mutate("New Posts")}>Add New</button>
    </>
  )
}

export default App
