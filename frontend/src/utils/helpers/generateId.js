import * as bcrypt from "bcryptjs";

const generateId = async () => {
  const timestamp = Date.now().toString();
  const salt = await bcrypt.genSalt(8);

  if (localStorage.getItem("uuid") === null) {
    let uuid = await bcrypt.hash(timestamp, salt);
    uuid = uuid.split(".").join("0");
    uuid = uuid.split("_").join("0");
    uuid = uuid.split("/").join("0");
    uuid = uuid.split("$").join("0");
    await localStorage.setItem("uuid", uuid.toString());
  }
};

export default generateId;
