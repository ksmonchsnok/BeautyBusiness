import React, { Component } from "react";
import { Table, Tag, Input, Button } from "antd";
import "antd/dist/antd.css";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

export default class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: ""
    };
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Promotion",
        dataIndex: "promotion",
        key: "promotion",
        filters: [
          {
            text: "32",
            value: "32"
          },
          {
            text: "42",
            value: "42"
          }
        ],
        onFilter: (value, record) => record.promotion.indexOf(value) === 0
      },
      {
        title: "Discount",
        dataIndex: "discount",
        key: "discount"
      },
      {
        title: "Tags",
        key: "tags",
        dataIndex: "tags",

        render: tags => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? "geekblue" : "green";
              if (tag === "loser") {
                color = "volcano";
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        )
      }
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        promotion: 32,
        discount: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
      },
      {
        key: "2",
        name: "Jim Green",
        promotion: 42,
        discount: "London No. 1 Lake Park",
        tags: ["loser"]
      },
      {
        key: "3",
        promotion: "Joe Black",
        age: 32,
        discount: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
      }
    ];
    return (
      <div id="Report">
        <div
          className="container"
          style={{ marginTop: "4rem", marginBottom: "3rem" }}
        >
          {" "}
          <h2>Report</h2>
          <div className="col">
            {" "}
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
              // loading={true}
              pagination={{ pageSize: 50 }}
              scroll={{ y: "50vh", x: "90vh" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
