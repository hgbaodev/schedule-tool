import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import * as XLSX from "xlsx";
import { refactorData } from "../utils/refactorData";

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

        console.log(jsonData);

        for (let i = 0; i < jsonData.length; i++) {
          const item = jsonData[i];
          if (!isNaN(item[0])) {
            item[1] = item[1] ?? jsonData[i - 1][1];
            item[2] = item[2] ?? jsonData[i - 1][2];
            item[7] = item[7] ?? jsonData[i - 1][7];

            result.push({
              stt: item[0],
              maMh: item[1],
              tenMh: item[2],
              soTc: item[3],
              siSo: item[4],
              hoVaTen: item[5],
              maVienChuc: item[6],
              nhom: item[7],
              toTH: item[8],
              thu: item[9],
              tietBd: item[10],
              soTiet: item[11],
              maPhong: item[12],
              tenLop: item[13],
              tuanHoc: item[14],
            });
          }
        }

        // In dữ liệu ra console
        console.log(result);

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

  if (tableData.length > 0) {
    console.log(refactorData(tableData));
  }

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
    </div>
  );
};

export default UpLoadFile;
