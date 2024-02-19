import * as XLSX from "xlsx";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import AuthenticatedPage from "../Authenticated/AuthenticatedPage";
import { useAPI } from "../../hooks/useAPI";
import { setTitle } from "helpers/utils";
import Button from "components/utils/Button";

function downloadTemplate(categories) {
  if (!categories) {
    return;
  }

  const template = [
    [
      "Please fill in line 4 and below with your domains. Mark the domain categories by putting a non-empty string in the respective category column. Up to 3 categories per domain are allowed.",
    ],
    ["Domain Name", "Description", ...categories.map((c) => c.name)],
    ["name", "description", ...categories.map((c) => `c_${c.id}`)],
    [
      "example.x",
      "Please replace this and the following lines with your domains",
    ],
  ].map((row) =>
    row.map((cell) => ({
      v: cell,
      t: "s",
    })),
  );
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(template);
  ws["!cols"] = Array(100).fill({ wpx: 100 });
  XLSX.utils.book_append_sheet(wb, ws, "Template");
  XLSX.writeFile(wb, "template.xlsx");
  return template;
}

function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const wb = XLSX.read(data, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const keys = dataParse[2];
      const keyColumns = {};
      keys.forEach((key, i) => {
        keyColumns[key] = i;
      });

      const domains = [];
      for (let i = 0; i < dataParse.length; i++) {
        const row = dataParse[i];
        if (i < 3) {
          continue;
        }

        const domain = {
          name: (row[keyColumns["name"]] || "").trim().toLowerCase(),
          description: row[keyColumns["description"]],
          category_ids: [],
        };

        if (
          !domain.name.match(
            /^[.a-z0-9-]+\.(crypto|nft|wallet|blockchain|x|bitcoin|dao|888|zil|klever)$/,
          )
        ) {
          continue;
        }

        for (let j = 0; j < keys.length; j++) {
          const key = keys[j];
          if (key.startsWith("c_")) {
            const categoryId = parseInt(key.substring(2));
            if (row[j]) {
              if (domain.category_ids.length < 3) {
                domain.category_ids.push(categoryId);
              }
            }
          }
        }
        domains.push(domain);
      }
      resolve(domains);
    };

    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsBinaryString(file);
  });
}

export default function BulkUploadTool() {
  useEffect(() => {
    setTitle("Bulk Upload Tool");
  }, []);

  const { api } = useAPI();

  const [allCategories, setAllCategories] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loadedDomains, setLoadedDomains] = useState([]);

  const isUploading = useRef(false);

  const [messageApi, contextHolder] = message.useMessage();

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await api.getCategories();
      setAllCategories(categories.result);
    };
    fetchData();
  }, [api]);

  return (
    <AuthenticatedPage title="List a domain">
      <main className="bg-image4 py-5">
      {contextHolder}
      <h1 className="text-brand-heading mb-10 text-center text-3xl text-white">
        Bulk Upload Domains
      </h1>
      <div className="space-y-4 text-center">
        <Button onClick={() => downloadTemplate(allCategories)}>
          Download Template
        </Button>
        <div>
          <Upload
            onRemove={() => {
              setFileList([]);
              setLoadedDomains([]);
            }}
            beforeUpload={async (file) => {
              setFileList([file]);

              const domains = await parseFile(file);

              setLoadedDomains(domains);

              console.log(domains);

              return false;
            }}
            fileList={fileList}
          >
            <Button>
              <UploadOutlined /> Load Filled Template{" "}
            </Button>
          </Upload>
          <div>Loaded domains: {loadedDomains.length}</div>
        </div>
        <Button
          onClick={async () => {
            if (isUploading.current) {
              return;
            }
            try {
              isUploading.current = true;

              if (loadedDomains.length === 0) {
                messageApi.error("No domains loaded");
                return;
              }

              messageApi.open({
                type: "loading",
                content: "Uploading domains...",
                duration: 0,
                key: "uploading-domains",
              });
              try {
                const result = await api.bulkUploadDomains({
                  domains: loadedDomains,
                });
                message.destroy("uploading-domains");

                if (result.failed) {
                  messageApi.warning("Some domains failed to upload");
                } else {
                  messageApi.success("All domains uploaded successfully");
                }

                setResult(result);
              } catch (e) {
                message.destroy("uploading-domains");
                messageApi.error(
                  "Failed to upload domains. Please try again later. If the problem persists, please contact us.",
                );
                throw e;
              }
            } finally {
              isUploading.current = false;
            }
          }}
        >
          Upload Domains
        </Button>
        <div className="m-auto mb-8 flex items-center justify-center">
          {result && (
            <div>
              {result.added > 0 && (
                <div style={{ color: "#72ff72" }}>
                  Added {result.added} new domains.
                </div>
              )}
              {result.updated > 0 && (
                <div style={{ color: "#72ff72" }}>
                  Updated {result.updated} existing domains.
                </div>
              )}
              {result.failed > 0 && (
                <div style={{ color: "red" }}>
                  <div>{result.failed} domains failed to upload:</div>
                  <div>
                    {result.errors.map((error, i) => (
                      <div key={i}>
                        {error.domain} - {error.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </main>
    </AuthenticatedPage>
  );
}
