import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import logo from '../../../assets/icons/chat.png';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';
import { selectCurrentRole, } from '../../../redux/features/auth/authSlice';
import React from 'react';

const DashboardSideBar = () => {
    const role = useAppSelector(selectCurrentRole);
    const adminItems = [
        {
            label: 'AddRoom',
            link: '/dashboard/addroom',
            icon: UserOutlined
        },
        {
            label: 'AllRoom',
            link: '/dashboard/allroom',
            icon: UserOutlined
        },

        {
            label: 'AddSlot',
            link: '/dashboard/addslot',
            icon: VideoCameraOutlined
        },
        {
            label: 'AllSlot',
            link: '/dashboard/allslot',
            icon: UserOutlined
        },
        {
            label: 'UserManagement',
            link: '/dashboard/users',
            icon: UserOutlined
        },
        {
            label: 'Bookings',
            link: '/dashboard/bookings',
            icon: UploadOutlined
        }
    ];
    const userItems = [
        {
            label: 'My Bookings',
            link: '/dashboard/mybookings',
            icon: UserOutlined
        },
        {
            label: 'Profile',
            link: '/dashboard/myprofile',
            icon: VideoCameraOutlined
        }
    ];

    // Render the NavLink components dynamically
    // const items = navItems.map((item, index) => (
    //     <NavLink key={index} to={item.link} className="nav-link">
    //         {item.label}
    //     </NavLink>
    // ));

    const items = (role === 'admin'
        ? adminItems
        : role === 'user'
            ? userItems
            : []
    ).map((item, index) => ({
        key: String(index + 1),  // Unique key for each menu item
        label: <NavLink to={item.link}>{item.label}</NavLink>,  // Using NavLink for routing
        icon: React.createElement(item.icon)  // Dynamically create the icon component
    }));

    return (
        <Sider
            breakpoint="lg"
            style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >

            <div className="demo-logo-vertical" />
            <NavLink to='/'><img src={logo} className="lg:w-[50px] ml-[30px] mt-[10px] w-20" alt="" /></NavLink>
            <Menu
                theme="dark"
                mode="inline"// Default selected item
                items={items}  // Pass the dynamically created items
            />
        </Sider>
    );
};

export default DashboardSideBar;