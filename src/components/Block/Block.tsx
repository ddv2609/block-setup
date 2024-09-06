import { Col, Row } from "antd";
import styles from "./Block.module.css";

interface BlockProps {
  split: number
}

function Block({
  split
}: BlockProps) {

  return (
    <div className={styles.block}>
      <Row justify="space-around" gutter={[6, 6]} className={styles.itemsWrapper}>
        { [...Array(split)].map((_, index) => (
          <Col span={`${Math.floor(24/split)}`} key={index}>
            <div className={styles.item}></div>
          </Col>
        )) }
      </Row>
    </div>
  );
}

export default Block;