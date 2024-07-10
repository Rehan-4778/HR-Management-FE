import React from "react";
import DocumentManagement from "./DocumentManagement";

const foldersData = [
  {
    name: "Employee Uploads",
    items: 1,
  },
  {
    name: "Resumes and Applications",
    items: 0,
  },
  {
    name: "Signed Documents",
    items: 1,
  },
  {
    name: "Tasklist Attachments",
    items: 0,
  },
  {
    name: "Workflow Attachments",
    items: 1,
  },
];

function DocumentsPage() {
  return (
    <div className="App">
      <DocumentManagement folders={foldersData} />
    </div>
  );
}

export default DocumentsPage;
