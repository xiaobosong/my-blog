import React, { Suspense } from 'react';
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import { Spin } from 'antd';
import rootRoutes from './routers';

const RouterView = () => {
    return useRoutes(rootRoutes);
};

const WrapRoute: React.FC = () => {
    return (
        <Suspense
            fallback={
                <div style={{ textAlign: 'center', paddingTop: '20%' }}>
                    <Spin tip='Loading...' />
                </div>
            }
        >
            <Router>
                <RouterView />
            </Router>
        </Suspense>
    );
};

export default WrapRoute;
