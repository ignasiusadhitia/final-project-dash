import React, { useRef, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';

import { Download, Trash, Image } from '@icons';

const Dropzone = ({ name, value, handleChange }) => {
  const [images, setImages] = useState([]);
  const hiddenInputRef = useRef(null);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
      }
    },
  });

  useEffect(() => {
    setImages([acceptedFiles[0]?.path]) || [];
  }, [acceptedFiles]);

  useEffect(() => {
    if (value && !undefined && !null) {
      setImages([value]);
    } else {
      setImages([]);
    }
  }, [value]);

  const handelCancelImage = () => {
    setImages('');
    hiddenInputRef.current.value = '';
  };

  const files = images.map((fileName, index) => (
    <li key={index} className="flex items-center justify-between text-primary">
      <div className="flex items-center gap-2">
        <Image />
        {fileName}
      </div>
      <Trash className="cursor-pointer" onClick={() => handelCancelImage()} />
    </li>
  ));

  return (
    <>
      <div className="border-2 bg-surface-background py-3 px-4 rounded-lg space-y-3 flex flex-col">
        <p className="text-sm self-start">Category Icon</p>
        <div
          {...getRootProps({
            className:
              'border-dashed border-2 border-primary rounded-md flex flex-col items-center justify-center gap-2 text-sm py-2 cursor-pointer',
          })}
        >
          <input
            ref={hiddenInputRef}
            className="opacity-0"
            name={name}
            required={images.length <= 0}
            type="file"
            onChange={handleChange}
          />
          <input {...getInputProps()} />
          <div>
            <Download />
          </div>
          <div className="text-center text-black">
            <p>
              <span className="text-primary">Click to Upload</span> or drag and
              drop
            </p>
            <p>SVG, PNG, JPG</p>
            <p className="text-[#89868D]">(max, 800x400px)</p>
          </div>
        </div>
      </div>
      {images.length > 0 && (
        <div className={`p-3 mt-3 border rounded-md border-primary`}>
          <ul>{files}</ul>
        </div>
      )}
    </>
  );
};

Dropzone.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Dropzone;
