import { Button, Layout, Menu, theme } from 'antd';
import DashboardSideBar from '../ui/Dashboard/DashboardSideBar';
import { NavLink, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';

const { Header, Content, Footer } = Layout;


const DashboardLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const user = useAppSelector(selectCurrentUser);
    // console.log(user)
    return (
        <Layout>
            <DashboardSideBar />
            <Layout>
                <Header style={{ padding: 0, background: '#001529', paddingRight: '20px' }} >
                    <div className="flex justify-end">
                        <NavLink to="/"><Button className='font-semibold'>Go Home</Button></NavLink>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0', background:'white' }}>
                    <div
                        style={{
                            padding: 24,
                            background: 'white',
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;