'use client'
import { Button, Card, CardContent, CardHeader, CardActions , Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { useEffect, useState, Fragment } from "react";

const Posts = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [allPosts, setAllPosts] = useState([{
      id: null,
      name: null,
      email: null,
      body: null
    }])
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => {
      setIsLoading(true)
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          setAllPosts(json)
          setIsLoading(false)
        })
    }, [])
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
          .then(response => response.json())
          .then(json => {
            setAllUsers(json)
          })
      }, [])
    return (
      <>

        <Grid display="flex" justifyContent="center">
            <h1>Posts</h1>
        </Grid>
  
        {isLoading ? <Skeleton variant="rounded" width={210} height={60} /> : <Grid container spacing={2} sx={{mt:3}}>
    
  
    {allPosts.map((posts) => {
       return(
           <Grid item  md = {4} sm = {6} xs = {12} key = {posts.id}>
  
  <Card elevation={4} width={150}>
               <CardHeader title = {"Title: "+ posts.title} subheader={
                allUsers.map((user)=>{
                    if(posts.userId === user.id) {
                        return "Posted by: " +user.name
                    }
                })
               }/>
               <CardContent>
               {posts.body}
               </CardContent>
               <CardActions>
      <Button size="small" href={"./comments?postId="+posts.id} >See Comments</Button>
    </CardActions>
           </Card>
           </Grid>
       )
   })}
  
  
     
  
       
  
   </Grid>}
  
   
      
     
      </>
    )

}
 
export default Posts;