import { Table, Button, Form, DatePicker, Select } from "antd";
import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState } from "react";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import { setTitle } from "helpers/utils";

const { Option } = Select;
const { RangePicker } = DatePicker;

const CashbacksPage = () => {
  useEffect(() => {
    setTitle("Cashbacks");
  }, []);

  const { api } = useAPI();
  const [unstoppableMints, setUnstoppableMints] = useState(null);
  const [filterData, setFilterData] = useState({});

  const tableColumns = [
    {
      title: "Submitted at",
      dataIndex: "inserted_at",
      key: "inserted_at",
    },
    {
      title: "Order Number",
      dataIndex: "order_number",
      key: "order_number",
    },
    {
      title: "Address",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Price, cents",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
    const getUnstoppableMints = async () => {
      const res = await api.getUnstoppableMints(filterData);
      setUnstoppableMints(res);
    };

    getUnstoppableMints();
  }, [api, filterData]);

  const onFinish = async (values) => {
    const data = {
      status: values.status,
    };

    if (values.dateRange != undefined) {
      data.start_timestamp = values.dateRange[0].toISOString();
      data.end_timestamp = values.dateRange[1].toISOString();
    }

    setFilterData(data);
  };

  const [form] = Form.useForm();

  const getContractValues = async () => {
    let addresses = [];
    let amounts = [];

    const inputVal = document.getElementById("maticRate").value;
    if (inputVal == undefined || inputVal === "") {
      return alert("Please input MATIC rate!");
    }

    const rate = parseFloat(inputVal);

    for (const mint of unstoppableMints) {
      addresses.push(mint.owner);
      amounts.push((mint.price / 100) * rate);
    }

    const res = JSON.stringify(addresses) + "," + JSON.stringify(amounts);
    document.getElementById("contractParamsOutput").innerHTML = res;
  };

  return (
    <AuthenticatedPage
      render={({ currentAddress, disconnectWallet }) => (
        <>
          <h1 className="text-center font-brand-heading text-xl text-black">
            Unstoppable Mints
          </h1>
          <div className="from-brand-darker-blue to-brand-blue mx-auto w-3/5 rounded-full bg-gradient-to-t px-16 py-20 text-left">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="inline"
              form={form}
            >
              <Form.Item name="dateRange" label="Date Range">
                <RangePicker />
              </Form.Item>
              <Form.Item name="status" label="Status">
                <Select allowClear className="w-22">
                  <Option value="sent">sent</Option>
                  <Option value="fail">fail</Option>
                  <Option value="ok">ok</Option>
                  <Option value="paid">paid</Option>
                </Select>
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
            <Table
              dataSource={unstoppableMints}
              columns={tableColumns}
              className="mt-10 w-full"
            />
          </div>
        </>
      )}
    />
  );
};

export default CashbacksPage;
