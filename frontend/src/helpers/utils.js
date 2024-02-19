import { message, Upload } from "antd";

export const blobToBase64 = (blob) => {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

export const isUrlFound = (url) =>
  fetch(url, { method: "HEAD", cache: "no-store", mode: "no-cors" })
    .then((response) => {
      console.log(response);
      return { 200: true, 404: false }[response.status];
    })
    .catch((exception) => {
      console.log(exception);
      return undefined;
    });

export const handleImageUpload = (file) => {
  const isImage = ["image/png", "image/jpeg", "image/jpg"].includes(file.type);
  if (!isImage) {
    message.error("You can only upload supported image files!");
  }
  const isLte5M = file.size / 1024 / 1024 <= 5;
  if (!isLte5M) {
    message.error("Image must smaller than or equal to 5MB!");
  }

  return ((!isImage || !isLte5M) && Upload.LIST_IGNORE) || false;
};
export const setTitle = (title) => {
  if (title) {
    document.title = `${title} | Web3 Onboarding`;
  } else {
    document.title = `Web3 Onboarding`;
  }
};

export const svgToPng = (svgString, width, height) => {
  return new Promise((resolve, reject) => {
    const svgData =
      "data:image/svg+xml;base64," + Buffer.from(svgString).toString("base64");

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    const image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/png"));
    };

    image.src = svgData;
  });
};
