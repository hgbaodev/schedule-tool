import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload, Table } from "antd";
import * as XLSX from "xlsx";

const { Dragger } = Upload;

const UpLoadFile = () => {
  const [tableData, setTableData] = useState([]);

  const props = {
    name: "file",
    multiple: true,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    beforeUpload: async (file) => {
      try {
        const result = [];
        const arrayBuffer = await file.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Chuyển đổi dữ liệu từ worksheet thành mảng đối tượng
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        jsonData.forEach((item, index) => {
          if (!isNaN(item[0])) {
            result.push({
              key: index,
              stt: item[0],
              maMh: item[1],
              tenMh: item[2],
              soTc: item[3],
              siSo: item[4],
              hoVaTen: item[5],
              maVienChuc: item[7],
              nhom: item[8],
              toTH: item[9],
              thu: item[10],
              tietBd: item[11],
              soTiet: item[12],
              maPhong: item[13],
              tenLop: item[14],
              tuanHoc: item[15],
            });
          }
        });

        // In dữ liệu ra console
        console.log(jsonData);

        // Lưu dữ liệu vào state để hiển thị trên bảng
        setTableData(result);
      } catch (error) {
        console.error("Lỗi khi đọc file Excel:", error);
      }
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã MH",
      dataIndex: "maMh",
      key: "maMh",
    },
    {
      title: "Tên MH",
      dataIndex: "tenMh",
      key: "tenMh",
    },
    {
      title: "Số TC",
      dataIndex: "soTc",
      key: "soTc",
    },
    {
      title: "Sĩ số",
      dataIndex: "siSo",
      key: "siSo",
    },
    {
      title: "Ho và tên",
      dataIndex: "hoVaTen",
      key: "hoVaTen",
    },
    {
      title: "Mã viên chức",
      dataIndex: "maVienChuc",
      key: "maVienChuc",
    },
    {
      title: "Nhóm",
      dataIndex: "nhom",
      key: "nhom",
    },
    {
      title: "Tổ thực hành",
      dataIndex: "toTH",
      key: "toTH",
    },
    {
      title: "Thứ",
      dataIndex: "thu",
      key: "thu",
    },
    {
      title: "Tiết BĐ",
      dataIndex: "tietBd",
      key: "tietBd",
    },
    {
      title: "Số tiết",
      dataIndex: "soTiet",
      key: "soTiet",
    },
    {
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
    },
    {
      title: "Tên lớp",
      dataIndex: "tenLop",
      key: "tenLop",
    },
    {
      title: "Tuần hoc",
      dataIndex: "tuanHoc",
      key: "tuanHoc",
    },
  ];

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      {tableData.length > 0 && (
        <Table dataSource={tableData} columns={columns} />
      )}
    </div>
  );
};

export default UpLoadFile;
