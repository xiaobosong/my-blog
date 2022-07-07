import React, { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '../layouts';
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/home'));
const Login = lazy(() => import(/* webpackChunkName: "home" */ '../pages/login'));
const Sign = lazy(() => import('../pages/sign'))
const Video = lazy(() => import('../pages/video'))
const MessageBoard = lazy(() => import('../pages/messageBoard'))
const Article = lazy(() => import('../pages/article'))
const rootRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/sign',
        element: <Sign></Sign>
    },
    {
        path: '',
        element: <Layout.BaseLayout />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },

            {
                path: '/video',
                element: <Video></Video>
            },
            {
                path: '/article',
                element: <Article></Article>
            },
            {
                path: '/Message/board',
                element: <MessageBoard></MessageBoard>
            },
        ]
    }

]
export default rootRoutes