import { useState } from "react";
import "./SequenceInput.css";

const SequenceInput = ({
  title,
  fileRef,
  value,
  onChange,
  onFileChange,
  isFastaFormat,
  isFileSelected,
}) => {
  const isInputEntered = value.length != 0;

  return (
    <form className="form-group " style={{ margin: "5%" }}>
      <div>
        <div className=" text-center">
          <label className="mb-2">
            <b>Enter The {title} Protein Sequence:</b>
          </label>
          <div>
            <textarea
              style={{ background: "#EEEEEE" }}
              className="form-control"
              aria-label="textarea"
              value={value}
              onChange={onChange}
              disabled={isFileSelected}
            ></textarea>

            {value.length > 0 && !isFastaFormat && (
              <span> Please enter sequence in fasta format.</span>
            )}
          </div>

          <div className=" text-center p-2">
            <label className=" ">OR</label>
          </div>
        </div>
      </div>
      <div className="">
        <label className="mb-2">
          <b>Select Fasta File</b>
        </label>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="myfile"
            name="receptor_protein_sequence_file"
            ref={fileRef}
            onChange={onFileChange}
            disabled={isInputEntered ? true : ""}
          />
          <label
            className="custom-file-label"
            style={
              isInputEntered ? { background: "rgba(238,238,238,0.5)" } : { background: "#EEEEEE" }
            }
          >
            Choose file
          </label>
        </div>
      </div>
    </form>
  );
};

export default SequenceInput;
