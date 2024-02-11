'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
const drawerWidth = 240;
import Posts from '../posts/page';
import Users from '../users/page';
import { useSearchParams } from 'next/navigation'
import { useEffect, useState  } from "react";
import { BarChart } from '@mui/x-charts/BarChart';

export default function Dashboard() {
  
  const [component, setComponent] = useState('Dashboard')
  const searchParams = useSearchParams()
  const parameterPage = searchParams.get('param')
 
  
  useEffect(() => {
    setComponent(parameterPage)
  }, [])
  const [allTodos, setAllTodos] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [allComments, setAllComments] = useState([])
  const [allPosts, setAllPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => {
        setAllTodos(json)
      })
  }, [])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setAllUsers(json)
      })
  }, [])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        setAllPosts(json)
      })
  }, [])
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(response => response.json())
      .then(json => {
        setAllComments(json)
      })
  }, [])

  const userTodoCounts = allUsers.map(user => {
    const userTodos = allTodos.filter(todo => todo.userId === user.id);
    return userTodos.length;
  });
   console.log(userTodoCounts)

  var todoCount  = Object.keys(allTodos).length;
  var userCount  = Object.keys(allUsers).length;
  var commentCount  = Object.keys(allComments).length;
  var postCount  = Object.keys(allPosts).length;


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
       
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Prelims Project
          </Typography>
        </Toolbar>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <List>
          <ListItem  disablePadding onClick={()=>{
            setComponent('Dashboard')
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  disablePadding onClick={()=>{
            setComponent('Posts')
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Posts"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  disablePadding onClick={()=>{
            setComponent('Users')
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Divider/>
          Welcome
        <Divider/>
        <Toolbar/>
        {component === 'Dashboard' && <>

        Statistics  
        <Divider/>
        <BarChart
          series={[
            { data: [userCount, postCount, commentCount, todoCount] }
          ]}
          height={290}
          xAxis={[{ data: ['Users', 'Posts', 'Comments', 'Todos'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
        <Divider/>
        <Toolbar/>



        User&apos;s Todos Count
        <Divider/>

        <BarChart
          series={[
            { data: 
          
              userTodoCounts
            
             }
          ]}
          height={290}
          xAxis={[{ data: 
            allUsers.map(user => user.name)

          , scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        /> </>}
        {component === 'Posts' && <Posts/>}
        {component === 'Users' && <Users/>}
      </Box>
    </Box>
  );
}
