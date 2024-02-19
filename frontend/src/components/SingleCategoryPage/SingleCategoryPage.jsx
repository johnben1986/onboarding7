import styles from "./SingleCategoryPage.module.scss";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import AuthenticatedPage from "../Authenticated/AuthenticatedPage";
import { PlusOutlined } from "@ant-design/icons";
import { useAPI } from "../../hooks/useAPI";
import {
  blobToBase64,
  setTitle,
  isUrlFound,
  handleImageUpload,
} from "../../helpers/utils";
import AuthenticatedFragment from "components/Authenticated/AuthenticatedFragment";
const { TextArea } = Input;

const SingleCategoryPage = ({ categoryId }) => {
  const { api } = useAPI();
  

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [category, setCategory] = useState({
    
    name: "",
  });

  useEffect(() => {
    const fetchCategoryId = async () => {
      const response = await api.getCategory({ id: categoryId });
      setCategory({ id: response.result[0].id });
      const imageUrl = `${process.env.NEXT_PUBLIC_IMAGES_URL}/categories/${response.result[0].id}.png`;
      if (await isUrlFound(imageUrl)) {
        setFileList([
          {
            uid: "-1",
            name: `${response.result[0].id}.png`,
            status: "done",
            thumbUrl: imageUrl,
          },
        ]);
      }
      form.setFieldsValue({
        name: response.result[0].name,
        
      });
      setTitle(response.result[0].name);
    };

    if (categoryId) {
      fetchCategoryId();
    }
  }, [categoryId, api]);

  const submitCategory = async (values) => {
    
    const image =
      fileList.length > 0 && fileList[0].originFileObj
        ? await blobToBase64(fileList[0].originFileObj)
        : null;
    if (categoryId) {
      await api.updateCategory({
        id: category.id,
        name: values.name,
        image: image,
        
      });
      message.success("The category has successfully been modified!");
    } else {
      await api.addCategory({
        name: values.name,
        image: image,
        
      });
      message.success("New category successfully added!");
    }
    form.setFieldsValue({
      name: "",
    });
  };

  const handleDeleteCategory = async () => {
    await api.deleteCategory({ id: category.id });
    form.setFieldsValue({
      name: "",
    });
    message.success("Category successfully deleted!");
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <AuthenticatedPage>
      <AuthenticatedFragment permission={"categories:create"}>
        <Form
          className={styles.form}
          name="basic"
          form={form}
          
          
          
          
          
          
          
          onFinish={submitCategory}
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            
            
            
            
            
            
          >
            <Input value={category.name} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            
            
            
            
            
            
          >
            <TextArea
              showCount
              maxLength={500}
              style={{
                height: 300,
              }}
            />
          </Form.Item>
          <Form.Item
            label="Category picture"
            valuePropName="fileList"
            className={styles.imageUpload}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={handleImageUpload}
              showUploadList={{
                showPreviewIcon: false,
                showDownloadIcon: false,
                showRemoveIcon: true,
              }}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
          {categoryId ? (
            <Form.Item
              
              
              
              
              className={styles.buttonDiv}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button
                type="danger"
                style={{ marginLeft: "1em" }}
                onClick={handleDeleteCategory}
              >
                Delete
              </Button>
            </Form.Item>
          ) : (
            <Form.Item
              wrapperCol={{
                offset: 11,
                span: 12,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      </AuthenticatedFragment>
    </AuthenticatedPage>
  );
};

export default SingleCategoryPage;
