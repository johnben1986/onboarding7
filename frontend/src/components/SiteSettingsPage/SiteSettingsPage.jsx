import { Form, Input } from "antd";
import Button from "components/utils/Button";
import { useAPI } from "../../hooks/useAPI";
import React, { useEffect, useState } from "react";
import AuthenticatedPage from "components/Authenticated/AuthenticatedPage";
import { setTitle } from "helpers/utils";
import useWallet from "hooks/useWallet";

const SiteSettingsPage = () => {
  useEffect(() => {
    setTitle("SiteSettings");
  }, []);

  const { currentAddress } = useWallet();
  const { api } = useAPI();
  const [siteSettings, setSiteSettings] = useState({});
  const [form] = Form.useForm();

  const getSiteSettings = async () => {
    const res = await api.getSiteSettings();
    setSiteSettings(res);

    form.setFieldsValue({
      profanity_words: res.profanity_words,
    });
  };

  useEffect(() => {
    getSiteSettings();
  }, [api, getSiteSettings]);

  const onFinish = async (values) => {
    const data = {
      profanity_words: values.profanity_words.split(","),
    };

    try {
      const res = await api.updateSiteSettings({ site_settings: data });
      alert(res.message);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <AuthenticatedPage
      render={({ currentAddress, disconnectWallet }) => (
        <>
          <h1 className="text-center font-brand-heading text-black text-xl">
            Site Settings
          </h1>
          <div className="bg-brand-blue w-3/5 text-left p-20 mx-auto rounded text-white">
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              form={form}
              layout="vertical"
            >
              <Form.Item name="profanity_words" label="Profanity Words">
                <Input.TextArea rows={10}></Input.TextArea>
              </Form.Item>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </>
      )}
    />
  );
};

export default SiteSettingsPage;
