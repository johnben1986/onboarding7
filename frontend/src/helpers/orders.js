import utils from "web3-utils";
import abi from "ethereumjs-abi";

function encodeType(name, fields) {
  const result = `${name}(${fields
    .map(({ name, type }) => `${type} ${name}`)
    .join(",")})`;
  return result;
}

function typeHash(name, fields) {
  return utils.sha3(encodeType(name, fields));
}

function structHash(name, fields, data) {
  return utils.sha3(encodeData(name, fields, data));
}

function encodeData(name, fields, data) {
  const encTypes = [];
  const encValues = [];

  
  encTypes.push("bytes32");
  encValues.push(typeHash(name, fields));

  
  for (const field of fields) {
    let value = data[field.name];
    if (field.type === "string" || field.type === "bytes") {
      encTypes.push("bytes32");
      value =
        field.type === "bytes" && value === "0x"
          ? utils.sha3Raw(value)
          : utils.sha3(value);
      encValues.push(value);
    } else {
      encTypes.push(field.type);
      encValues.push(value);
    }
  }

  
  return abi.rawEncode(encTypes, encValues);
}

export const hashOrder = (order, eip712Data) => {
  return structHash(eip712Data.name, eip712Data.fields, order).toString("hex");
};
