'use client' 
import { useSearchParams } from 'next/navigation'
import { useEffect, useState  } from "react";
import { Button, Box , Card, CardContent, CardHeader, CardActions , Grid, IconButton, Skeleton, Typography } from "@mui/material";
import * as React from 'react'

export default function Todo() {

    const searchParams = useSearchParams()
    const userId = searchParams.get('userId')
    const [allTodos, setAllTodos] = useState([])
    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/todos')
          .then(response => response.json())
          .then(json => {
            setAllTodos(json)
          })
      }, [])
      useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users/'+userId)
          .then(response => response.json())
          .then(json => {
            setAllUsers(json)
          })
      }, [])
    


  return (
    <>

    
    <Button size="small" href={"./?param=Users"} >Go Back?</Button>

        <Grid padding={2}  display="flex" justifyContent="center">           
        
                <Box>
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Users number: {allUsers.id}
                            </Typography>
                            <Typography variant="h3" component="div">
                                {allUsers.name}
                            </Typography>
                            <Typography color="text.secondary">
                                allUsersname: {allUsers.allUsersname}
                            </Typography>
                            <Typography color="text.secondary">
                                email: {allUsers.email}
                            </Typography>
                            <Typography color="text.secondary">
                                Phone No: {allUsers.phone}
                            </Typography>
                            
                            <Typography sx={{mb: 2}} color="text.secondary">
                               website: {allUsers.website}
                            </Typography>
                            
                            </CardContent>
                           
                        </React.Fragment>
                    </Card>
                </Box>
        </Grid>        
    

    <h1>Todos:</h1>
    <Grid container>
       {allTodos.map((todo) => {
       return(
        <Grid lg = {3} md = {4} sm = {6} xs = {12} key = {todo.id}  padding={2}>

            <Card elevation={4}>
                <CardHeader title = {todo.title} />
                <CardContent>
                    Status: {
                        todo.completed === false ? <>Not yet Completed</> 
                        : <>Completed</>
                    }
                </CardContent>
            </Card>
        </Grid>
       )
   })}
   </Grid>
    </>
  ) 
}