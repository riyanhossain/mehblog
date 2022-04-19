import React, { Fragment, useContext, useState } from "react";
import { Layout, Avatar, Menu, Breadcrumb, Button } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Title from "antd/lib/typography/Title";
import Approve from "./Approve";
import Allarticles from "./Allarticles";

const { Header, Footer, Sider, Content } = Layout;

function Dashboard() {
  const [user, setUser, dtoggle, setDtoggle] = useContext(UserContext);

  const navigate = useNavigate();

  const [menuToggle, setMenuToggle] = useState({
    approve: true,
    allarticles: false,
  });

  return (
    <Fragment>
      <Layout>
        <Header style={{ padding: 10 }}>
          <Title
            style={{ color: "white" }}
            level={3}
            onClick={() => {
              navigate("/");
              setDtoggle(!dtoggle);
            }}
          >
            MehBlog
          </Title>
        </Header>
        <Layout>
          <Sider>
            <Menu defaultSelectedKeys={["Dashboard"]} mode="inline">
              <Menu.Item
                key="Dashboard"
                onClick={() =>
                  setMenuToggle({ approve: true, allarticles: false })
                }
              >
                Approve
              </Menu.Item>
              <Menu.Item
                key="All Articles"
                onClick={() =>
                  setMenuToggle({ approve: false, allarticles: true })
                }
              >
                All Articles
              </Menu.Item>
              <Menu.Item
                key="mehblog"
                onClick={() => {
                  navigate("/");
                  setDtoggle(!dtoggle);
                }}
              >
                Back to Mehblog
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: "0 50px", minHeight: "80vh" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              {menuToggle.approve ? <Approve /> : <Allarticles />}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design mehblog dashboard Created by mehrab
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </Fragment>
  );
}

export default Dashboard;
