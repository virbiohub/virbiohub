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
    <form className="form-group " style={{ marginTop: "8%" }}>
      <div>
        <div className=" text-center">
          <label>
            <b>Enter The {title} Protein Sequence:</b>
          </label>
          <div>
            <textarea
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

          <div className=" text-center p-2 text-white">
            <label className=" ">OR</label>
          </div>
        </div>
      </div>
      <div className="">
        <label>
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
              isInputEntered ? { background: "rgba(255,255,255,0.4)" } : {}
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
