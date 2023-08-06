import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import SimpleUsers from "../../pages/SimpleUsers";
import {Switch, Route} from "react-router-dom";
import AdminEmployees from "../../pages/AdminEmployees";
import {CURRENT_USER_DATA} from "../../tools/constants";
import AdminSales from "../../pages/AdminSales";
import AdminRejected from "../../pages/AdminRejected";
import SuperAdminSimples from "../../pages/SuperAdminSimples";
import SuperAdminAdmins from "../../pages/SuperAdminAdmins";

const {Header, Sider, Content} = Layout;
const AdminLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const logout = () => {
        localStorage.removeItem(CURRENT_USER_DATA);
        props.history.push("/")
    }
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"/>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={JSON.parse(localStorage.getItem(CURRENT_USER_DATA))?.role === "ROLE_SIMPLE" ? [
                        {
                            key: '1',
                            icon: <UserOutlined/>,
                            label: 'Clients',
                            onClick: () => props.history.push("/simple/users")
                        },
                    ] : JSON.parse(localStorage.getItem(CURRENT_USER_DATA))?.role === "ROLE_ADMIN" ?
                        [
                            {
                                key: '1',
                                icon: <UserOutlined/>,
                                label: 'Employees',
                                onClick: () => props.history.push("/admin/employees")
                            },
                            {
                                key: '2',
                                icon: <UserOutlined/>,
                                label: 'Sales',
                                onClick: () => props.history.push("/admin/sales")
                            },
                            {
                                key: '3',
                                icon: <UserOutlined/>,
                                label: 'RejectedList',
                                onClick: () => props.history.push("/admin/rejected")
                            },
                        ] : JSON.parse(localStorage.getItem(CURRENT_USER_DATA))?.role === "ROLE_SUPER_ADMIN" ?
                            [
                                {
                                    key: '1',
                                    icon: <UserOutlined/>,
                                    label: 'Simple Users',
                                    onClick: () => props.history.push("/superadmin/simples")
                                },
                                {
                                    key: '2',
                                    icon: <UserOutlined/>,
                                    label: 'Admin Users',
                                    onClick: () => props.history.push("/superadmin/admins")
                                },
                            ] : []
                    }
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                        marginRight: "20px"
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <button type="button" className="btn btn-danger" onClick={logout}>Logout</button>
                    </div>

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: "calc(100vh - 112px)",
                        background: colorBgContainer,
                    }}
                >
                    <Switch>
                        <Route path="/simple/users" exact component={SimpleUsers}/>
                        <Route path="/admin/employees" exact component={AdminEmployees}/>
                        <Route path="/admin/sales" exact component={AdminSales}/>
                        <Route path="/admin/rejected" exact component={AdminRejected}/>
                        <Route path="/superadmin/simples" exact component={SuperAdminSimples}/>
                        <Route path="/superadmin/admins" exact component={SuperAdminAdmins}/>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;