import styles from "./EditSellerPage.module.scss";
import useWallet from "hooks/useWallet";
import Button from "components/utils/Button";
import { Form, Input, message, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  blobToBase64,
  isUrlFound,
  handleImageUpload,
} from "../../helpers/utils";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";

const { TextArea } = Input;

const EditSellerPage = ({ userId }) => {

  const { currentAddress, wrapWalletFlow, sendContractTransaction } =
    useWallet();
    const router = useRouter();
  const { api } = useAPI();
  const [user, setUser] = useState(null);
  const [fileList, setFileList] = useState([]);

  const targetUser = userId ? userId : currentAddress;

  const onFinish = async (values) => {
    const image =
      fileList.length > 0 && fileList[0].originFileObj
        ? await blobToBase64(fileList[0].originFileObj)
        : null;
    try{
      await api.updateUser({
        id: targetUser,
        name: values.name || "", 
        email: values.email || "",
        telegram: values.telegram || "",
        twitter: values.twitter || "",
        linkedin: values.linkedin || "",
        instagram: values.instagram || "",
        description: values.description || "",
        image: image || "",
      });
      message.success("Updated successfully");
      router.push('/users/me');
    }
    catch(error) {
      console.log('Update Error', error);
    }
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const getUser = async () => {
      const user = await api.getUserPrivate({ id: targetUser });
      const formData = user.result[0];
      const imageUrl = `${process.env.NEXT_PUBLIC_IMAGES_URL}/vendors/${user.result[0].id}.png`;
      if (await isUrlFound(imageUrl)) {
        setFileList([
          {
            uid: "-1",
            name: `${user.result[0].id}.png`,
            status: "done",
            thumbUrl: imageUrl,
          },
        ]);
      }
      form.setFieldsValue(formData);
      setUser(formData);
    };
    getUser();
  }, [targetUser, api]);

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  async function handleBanUser(targetUser) {
    await wrapWalletFlow("Ban user", async () => {
      await sendContractTransaction(
        { name: "Exchange", network: "Polygon" },
        "banUser",
        [targetUser]
      );
    });
  }

  async function handleUnbanUser(targetUser) {
    await wrapWalletFlow("Unban user", async () => {
      await sendContractTransaction(
        {
          name: "Exchange",
          network: "Polygon",
        },
        "unbanUser",
        [targetUser]
      );
    });
  }

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <>
      <PlusOutlined className={styles.plusOutlined} />
      Upload
    </>
  );
  const inputClassName = "mb-1 h-14 rounded border-none pl-6";

  return (
    <>
      <AuthenticatedFragment permission={"users:update"} owner={targetUser}>
        
        <main className="bg-image4 py-5">
          <h1 className="mb-2 text-center font-brand-heading text-3xl text-white">
            Edit Profile Info
          </h1>
          <div className="mx-1 mb-5 rounded-xl border-2 border-white bg-primary-newBgColor/40 p-6 text-white lg:mx-auto lg:w-1/2">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item label={<label className="text-lg text-white">Address</label>}>
                <div className="text-white">{targetUser}</div>
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">E-mail</label>}
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input
                  placeholder="Your email won't be public"
                  className={inputClassName}
                />
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Name</label>}
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className={inputClassName} />
              </Form.Item>

              <Form.Item
                label={<label className="text-sm text-white">Profile picture</label>}
                valuePropName="fileList"
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleChange}
                  beforeUpload={handleImageUpload}
                  className={styles.updateUser}
                  showUploadList={{
                    showPreviewIcon: false,
                    showDownloadIcon: false,
                    showRemoveIcon: true,
                  }}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Telegram</label>}
                name="telegram"
              >
                <Input className={inputClassName} />
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Twitter</label>}
                name="twitter"
              >
                <Input className={inputClassName} />
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Linkedin</label>}
                name="linkedin"
              >
                <Input className={inputClassName} />
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Instagram</label>}
                name="instagram"
              >
                <Input className={inputClassName} />
              </Form.Item>
              <Form.Item
                label={<label className="text-sm text-white">Description</label>}
                name="description"
              >
                <TextArea rows={8} className={inputClassName} />
              </Form.Item>

              <Form.Item className="w-full text-center">
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <AuthenticatedFragment permission={"users:update"}>
                  <span> </span>

                  <Button
                    type="primary"
                    style={{ backgroundColor: "red !important" }}
                    onClick={() => {
                      user?.is_blacklisted
                        ? handleUnbanUser(targetUser)
                        : handleBanUser(targetUser);
                    }}
                  >
                    {user?.is_blacklisted ? "Unban" : "Ban"}
                  </Button>
                </AuthenticatedFragment>
              </Form.Item>
            </Form>
          </div>
        </main>
      </AuthenticatedFragment>
    </>
  );
};

export default EditSellerPage;
