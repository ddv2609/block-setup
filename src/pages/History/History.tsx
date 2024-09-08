import { Button, Space, Table, TableProps } from "antd";
import styles from "./History.module.css";
import { useNavigate } from "react-router-dom";

interface Setup {
  key: number,
  block: number,
  splits: number[],
  created: string,
}

function History() {
  const nav = useNavigate();

  const handleApplySetup = (record: Setup) => {
    localStorage.setItem(
      "currentSetup",
      JSON.stringify(record.splits)
    );
    nav("/");
  };

  const handleDeleteSetup = (record: Setup) => {
    
  };


  const columns: TableProps<Setup>["columns"] = [
    {
      title: "No.",
      key: "id",
      align: "center",
      render: (_, record: Setup, index: number) => index + 1,
    },
    {
      title: "Block",
      key: "block",
      align: "center",
      render: (_, record: Setup) => record.block,
      sorter: (a, b) => a.block - b.block,
    },
    {
      title: "Splits",
      key: "splits",
      align: "center",
      render: (_, record: Setup) => record.splits.join("-"),
      ellipsis: true,
      width: "30%",
    },
    {
      title: "Created time",
      key: "time",
      align: "center",
      render: (_, record: Setup) => record.created,
      sorter: (a, b) =>
        new Date(a.created).getMilliseconds() -
        new Date(b.created).getMilliseconds(),
    },
    {
      title: "Action",
      key: "apply",
      align: "center",
      render: (_, record: Setup) => (
        <Space>
          <Button
            onClick={() => handleApplySetup(record)}
          >
            Apply
          </Button>
          <Button
            onClick={() => handleDeleteSetup(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.history}>
      <Button type="primary" onClick={() => nav("/")}>Back</Button>
      <Table
        columns={columns}
        dataSource={JSON.parse(localStorage.getItem("setups") || "[]")}
      />
    </div>
  );
}

export default History;
