import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  beforeUpload: (file) => {
    console.log(file);
    return false;
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const UpLoadFile = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading
      company data or other banned files.
    </p>
  </Dragger>
);
export default UpLoadFile;
