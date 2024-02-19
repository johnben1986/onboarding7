import React, { useEffect } from "react";
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from "react-icons/io";
import { RadioGroup } from "@headlessui/react";
import { AlphaPicker, ChromePicker } from "react-color";
import { RxCross1 } from "react-icons/rx";
import { TbTrash } from "react-icons/tb";

const transparentBackgroundStyle = {
  backgroundImage:
    "linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
};

const defaultColorObject = {
  r: 255,
  g: 255,
  b: 255,
  a: 0,
};

export default function BackgroundPicker({
  setContent,
  content,
  enableFit = true,
  enableColor = true,
  enableColorAlpha = true,
  enableImageAlpha = true,
}) {
  const [displayColorPicker, setDisplayColorPicker] = React.useState(false);

  const backgroundColorObject =
    content.backgroundColorObject || defaultColorObject;

  const fileInputRef = React.useRef();

  useEffect(() => {
    console.log(content.imageAlpha);
  }, [content.imageAlpha]);

  useEffect(() => {
    if (content.backgroundColorObject) {
      setContent({
        ...content,
        backgroundColor: `
          rgba(
            ${backgroundColorObject.r},
            ${backgroundColorObject.g},
            ${backgroundColorObject.b},
            ${backgroundColorObject.a || 1}
          )`,
      });
    }
  }, [backgroundColorObject]);

  useEffect(() => {
    if (!content.image) {
      fileInputRef.current.value = "";
    }
  }, [content.image]);

  return (
    <div className="space-y-2">
      {enableColor && (
        <div className="space-y-0.5">
          <div className="text-lg">Background color</div>
          <div className="relative flex items-center gap-2">
            <button
              onClick={() => setDisplayColorPicker(true)}
              className="relative h-10 w-14 rounded border-4 border-white"
            >
              <div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  ...transparentBackgroundStyle,
                }}
              ></div>
              <div
                className="absolute top-0 left-0 h-full w-full"
                style={{
                  backgroundColor: content.backgroundColor,
                }}
              ></div>
            </button>
            {enableColorAlpha &&
              (backgroundColorObject.a !== 0 ? (
                <button
                  className="height flex items-center text-red-400 hover:text-red-500"
                  onClick={() =>
                    setContent({
                      ...content,
                      backgroundColorObject: defaultColorObject,
                    })
                  }
                >
                  <RxCross1 className="inline text-lg" />
                  <span>Clear</span>
                </button>
              ) : (
                <div className="text-gray-500">None</div>
              ))}
            {displayColorPicker ? (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setDisplayColorPicker(false)}
                />
                <div className="absolute top-4 left-14 z-10 -translate-y-1/3">
                  <ChromePicker
                    color={content.backgroundColorObject}
                    disableAlpha={!enableColorAlpha}
                    onChange={(color) =>
                      setContent({
                        ...content,
                        backgroundColorObject: color.rgb,
                      })
                    }
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}

      {enableFit && (
        <div className="w-fit">
          <div className="text-lg">Image fit</div>
          <RadioGroup
            value={content.imageFit}
            onChange={(val) => setContent({ ...content, imageFit: val })}
            className="text-base"
          >
            <RadioGroup.Option value="contain">
              {({ checked }) => (
                <span className="flex cursor-pointer items-center gap-1">
                  <IoMdRadioButtonOn
                    className={checked ? "text-blue-600" : "hidden"}
                  />
                  <IoMdRadioButtonOff className={checked ? "hidden" : ""} />
                  Contain
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="background">
              {({ checked }) => (
                <span className="flex cursor-pointer items-center gap-1">
                  <IoMdRadioButtonOn
                    className={checked ? "text-blue-600" : "hidden"}
                  />
                  <IoMdRadioButtonOff className={checked ? "hidden" : ""} />
                  Background
                </span>
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value="stretch">
              {({ checked }) => (
                <span className="flex cursor-pointer items-center gap-1">
                  <IoMdRadioButtonOn
                    className={checked ? "text-blue-600" : "hidden"}
                  />
                  <IoMdRadioButtonOff className={checked ? "hidden" : ""} />
                  Stretch
                </span>
              )}
            </RadioGroup.Option>
          </RadioGroup>
        </div>
      )}
      <div className="space-y-1">
        {enableColor && <div className="text-lg">Background image</div>}
        <div>
          <div className="flex w-full cursor-pointer items-center rounded bg-gray-300 text-base shadow-inner">
            <input
              type="file"
              accept="image/*"
              className="cursor-pointer rounded bg-gray-300 text-gray-900 file:m-2 file:cursor-pointer file:rounded file:border-none file:bg-blue-600 file:p-2 file:text-gray-100 file:shadow-sm file:hover:bg-blue-500 focus:outline-none file:active:bg-blue-700"
              ref={fileInputRef}
              onChange={(ev) => {
                const file = ev.target.files[0];

                if (file) {
                  const reader = new FileReader();

                  reader.onload = (ev) => {
                    
                    setContent({ ...content, image: ev.target.result });
                  };

                  reader.readAsDataURL(file);
                }
              }}
            />
            <div
              className="flex h-12 w-12 items-center justify-center p-2 text-red-600 hover:text-red-500"
              onClick={() => setContent({ ...content, image: null })}
            >
              <TbTrash className="h-full w-full" />
            </div>
          </div>
          {enableImageAlpha && (
            <div className="flex items-center gap-2 text-base">
              Transparency{" "}
              <AlphaPicker
                color={{ r: 0, g: 0, b: 0, a: content.imageAlpha }}
                onChange={(color) =>
                  setContent({
                    ...content,
                    imageAlpha: color.rgb.a,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="text-lg">Hyperlink to</div>

        <input
          className="w-full p-1"
          placeholder="https://"
          value={content.imageHyperlink}
          onChange={(ev) =>
            setContent({
              ...content,
              imageHyperlink: ev.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
