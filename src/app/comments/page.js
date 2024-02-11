'use client' 
import { useSearchParams } from 'next/navigation'
import { useEffect, useState  } from "react";
import { Button, Card, CardContent, CardHeader, CardActions , Grid, IconButton, Skeleton, Typography } from "@mui/material";


export default function Page() {

    const searchParams = useSearchParams()
    const postId = searchParams.get('postId')
    const [allComments, setAllComments] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/'+postId+'/comments')
          .then(response => response.json())
          .then(json => {
            setAllComments(json)
          })
      }, [])
      
      useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts/'+postId)
          .then(response => response.json())
          .then(json => {
            setAllPosts(json)
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

    
    <Button size="small" href={"./?param=Posts"} >Go Back?</Button>

        <Grid padding={2}  display="flex" justifyContent="center">           
           <Card elevation={4} sx={{ maxWidth: 1245 }} >
                <CardHeader title = {"Title: "+ allPosts.title} subheader={
                    allUsers.map((user)=>{
                        if(allPosts.userId === user.id) {
                            return "Posted by: " +user.name
                        }
                    })
                }/>
                <CardContent>
                        {allPosts.body}
                </CardContent>
            </Card>
        </Grid>        
    

    <h1>Comments</h1>
    <Grid container>
       {allComments.map((comment) => {
       return(
        <Grid lg = {3} md = {4} sm = {6} xs = {12} key = {comment.id}  padding={2}>

            <Card elevation={4}>
                <CardHeader title = {comment.name} subheader = {comment.email} />
                <CardContent>
                    {comment.body}
                </CardContent>
            </Card>
        </Grid>
       )
   })}
   </Grid>
    </>
  ) 
}