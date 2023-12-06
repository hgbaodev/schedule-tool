import { Layout, theme } from "antd";
import UpLoadFile from "./pages/upload-file";
import { Content } from "antd/es/layout/layout";

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <div style={{ padding: 24, background: colorBgContainer }}>
          <UpLoadFile />
        </div>
      </Content>
    </Layout>
  );
};

export default App;
