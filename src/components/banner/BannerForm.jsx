import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { ArrowLeft, ArrowRightSmall, Upload, Picture, RedTrash, Date, ArrowDownGray } from "@icons";
import { DatePicker } from "antd";

const BannerForm = () => {
  const location = useLocation().pathname.split("/");
  const page = location[location.length - 2];
  const { id } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxSize: 1024 * 1024,
    maxFiles: 2,
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleRemoveFile = (lastModified) => {
    setUploadedFiles(uploadedFiles.filter((item) => item.lastModified !== lastModified));
  };

  const isDetailPage = page === "detail";

  return (
    <div className="w-full mt-7 bg-[#FFFFFF] px-6 py-4 rounded-3xl">
      <div className="flex items-baseline justify-between">
        <div>
          <div className="flex gap-4 items-center">
            <Link to="/dashboard/banners">
              <ArrowLeft />
            </Link>
            <h1 className="text-lg font-medium">{page === "detail" ? "Detail" : id ? "Edit" : "Add"} Banner</h1>
          </div>
          <div className="flex items-center gap-2 mt-2 pb-5">
            <Link className="text-primary text-xs font-normal" to="/dashboard">Home</Link>
            <ArrowRightSmall />
            <Link className="text-primary text-xs font-normal" to="/dashboard/banners">Banner Management</Link>
            <ArrowRightSmall />
            <Link className="text-primary text-xs font-normal" to="">{page === "detail" ? "Detail Banner" : id ? "Edit Banner" : "Add Banner"}</Link>
          </div>
        </div>
      </div>

      <div className="py-6 flex flex-col gap-6 border-t border-surface-border">
        <div className="flex w-full gap-12">
          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="name">Banner Name</label>
            <input
              className="bg-surface-background placeholder:text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              type="text"
              id="name"
              placeholder="Enter Banner Name"
              disabled={isDetailPage}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="release-date" >Release Date</label>
            <DatePicker
              placeholder="Select Release Date"
              className="bg-surface-background hover:border-surface-border active-border-surface-border focus-border-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              type="date"
              id="release-date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9'
              }}
              suffixIcon={<Date />}
              disabled={isDetailPage} 
            />
          </div>
        </div>

        <div className="flex w-full gap-12">
          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="end-date" >End Date</label>
            <DatePicker
              placeholder="Select End Date"
              className="bg-surface-background hover:border-surface-border active-suborder-surface-border focus-suborder-surface-border focus:ring-0 text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              type="date"
              id="end-date"
              style={{
                border: '1px solid #DBDCDE',
                outline: 'none',
                boxShadow: 'none',
                background: '#F4F5F9'
              }}
              suffixIcon={<Date />}
              disabled={isDetailPage}
            />
          </div>

          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="target-url">Target URL</label>
            <input
              className="bg-surface-background placeholder:text-type-text-light text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none"
              type="text"
              id="target-url"
              placeholder="Enter Target URL"
              disabled={isDetailPage}
            />
          </div>
        </div>

        <div className="flex w-full gap-12">
          <div className="flex flex-col gap-5 w-full">
            <label className="text-[14.22px]" htmlFor="type">Banner Type</label>
            <div className="relative w-full">
              <ArrowDownGray className="absolute right-4 top-1/2 -translate-y-1/2" />
              <select
                defaultValue=""
                className="bg-surface-background text-type-text-light border rounded-lg border-surface-border px-4 py-3 text-[14.22px] outline-none appearance-none w-full"
                name="type"
                id="type"
                disabled={isDetailPage}
              >
                <option value="" disabled>Select Banner Type</option>
                <option value="A">Banner A</option>
                <option value="B">Banner B</option>
                <option value="C">Banner C</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 cursor-pointer flex-col w-full">
            {page !== "detail" && (
              <div className="bg-surface-background border border-surface-border flex flex-col gap-3 p-5 px-10 mb-4 rounded-xl">
                <label className="text-[14.22px]">
                  Banner Photo
                </label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-w rounded-md p-6 flex flex-col border-primary items-center justify-center text-center bg-gray-50"
                >
                  <input {...getInputProps()} />
                  <div className="mb-2">
                    <Upload />
                  </div>
                  <p className="text-[12.64px] text-primary font-semibold">
                    Click to upload <span className="text-black">or drag and drop</span>
                  </p>
                  <p className="text-black text-[12.64px]">SVG, PNG, JPG</p>
                  <p className="text-xs text-type-text-light">(max, 800x400px)</p>
                </div>
              </div>
            )}

            {uploadedFiles?.map((file, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-primary rounded-xl">
                <div className="flex items-center gap-3">
                  <Picture />
                  <p className="text-primary font-normal text-base">{file.name}</p>
                </div>

                <button onClick={() => handleRemoveFile(file.lastModified)}><RedTrash /></button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="flex gap-5">
          <Link to="/dashboard/banners" className={`flex justify-center items-center rounded-lg w-[100px] text-[12.64px] h-8 border ${isDetailPage ? "bg-type-text-light text-white" : "border-primary text-primary"}`}>{isDetailPage ? "Close" : "Cancle"}</Link>
          {!isDetailPage && (
             <button className="rounded-lg w-[100px] h-8 bg-primary text-[12.64px] text-white">{id ? "Save" : "Add Banner"}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerForm;
