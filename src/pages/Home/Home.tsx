import {
  Button,
  Col,
  Dropdown,
  InputNumber,
  InputNumberProps,
  Row,
  Space,
} from "antd";
import styles from "./Home.module.css";
import { useState } from "react";
import Block from "../../components/Block/Block";
import { itemsDropdown } from "../../constants";
import { useNavigate } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";

interface Setup {
  key: string,
  block: number,
  splits: number[],
  created: string,
}

function Home() {
  const [blocks, setBlocks] = useState<number[]>( 
    localStorage.getItem("currentSetup") 
    ? JSON.parse(localStorage.getItem("currentSetup") || "[]")
    : []
  );

  const nav = useNavigate();

  const [messageApi, contextHolder] = useMessage();

  const handleChangeBlockNumber: InputNumberProps["onChange"] = (amount) => {
    setBlocks(amount ? (Array(amount).fill(1) as number[]) : []);
  };

  const handleSplitBlock = (block: number, { key }: any) => {
    const newBlocks = [...blocks];
    newBlocks[block] = Number(key);
    setBlocks(newBlocks);
  };

  const handleSaveSetup: React.MouseEventHandler<HTMLElement> = () => {
    localStorage.setItem("currentSetup", JSON.stringify(blocks));

    const newListSetups: Setup[] = JSON.parse(localStorage.getItem("setups") || "[]");
    const id = blocks.join("");
    let hadSetup = newListSetups.some((setup) => setup.key === id);
    if (!hadSetup) {
      newListSetups.unshift({
        key: id,
        block: blocks.length,
        splits: blocks,
        created: new Date().toISOString(),
      });
      localStorage.setItem("setups", JSON.stringify(newListSetups));
      messageApi.success("Save setup successfully");
    } else 
      messageApi.warning("Setup already exists");
  };

  const handleNavToHistories: React.MouseEventHandler<HTMLElement> = () => {
    nav("/setup-history");
  }

  return (
    <div className={styles.home}>
      { contextHolder }
      <InputNumber
        min={0}
        placeholder="Enter the block number"
        defaultValue={blocks.length}
        onChange={handleChangeBlockNumber}
        className={styles.inputBlocks}
      />

      <div className={styles.saveBtn}>
        <Space size="large">
          <Button type="primary" 
            onClick={handleSaveSetup} 
            disabled={blocks.length ? false : true}>Save</Button>
          <Button type="primary" onClick={handleNavToHistories}>Apply setup history</Button>
        </Space>
      </div>

      <div className={styles.blocks}>
        <Row justify="start" gutter={[24, 24]}>
          {blocks.map((split, index) => (
            <Col key={index}>
              <Dropdown
                menu={{
                  items: itemsDropdown,
                  onClick: (props) => handleSplitBlock(index, props),
                }}
                trigger={["click"]}
              >
                <div>
                  <Block split={split} />
                </div>
              </Dropdown>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
