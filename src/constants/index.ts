import { MenuProps } from "antd";

const PRIMARY_COLOR = "#01B4E4";
const PRIMARY_HOVER_COLOR = "#02a9d7";
const ROW_HOVER_COLOR = "#01b3e417";

export const itemsDropdown: MenuProps['items'] = [
  {
    label: "1",
    key: 1,
  },
  {
    label: "2",
    key: 2,
  },
  {
    label: "3",
    key: 3,
  },
  // {
  //   label: "4",
  //   key: 4,
  // },
  // {
  //   label: "5",
  //   key: 5,
  // }
];

export const customStylesAntd = {
  Button: {
    colorPrimary: PRIMARY_COLOR,
    defaultHoverColor: PRIMARY_COLOR,
    defaultHoverBorderColor: PRIMARY_COLOR,
    colorPrimaryHover: PRIMARY_HOVER_COLOR,
    colorPrimaryActive: PRIMARY_COLOR,
  },
  Table: {
    colorPrimary: PRIMARY_COLOR,
    rowHoverBg: ROW_HOVER_COLOR,
    bodySortBg: ROW_HOVER_COLOR,
  },
  InputNumber: {
    activeBorderColor: PRIMARY_COLOR,
  }
}