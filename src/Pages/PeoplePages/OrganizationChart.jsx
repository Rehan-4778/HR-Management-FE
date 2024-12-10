import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationChart } from "../../store";
import User from "../../assets/images/people.png";

const OrganizationChart = () => {
  const selectedCompany = useSelector((state) => state.auth.selectedCompany);

  const organizationData = useSelector(
    (state) => state?.employee?.organizationChart
  );
  const dispatch = useDispatch();

  const fetchChartData = async () => {
    await dispatch(
      getOrganizationChart({ companyId: selectedCompany?.company?._id })
    );
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const renderTree = (data) =>
    data?.map((node) => (
      <TreeNode
        key={node.id}
        label={
          <div>
            <div className="flex flex-col items-center bg-red-100 px-6 py-5 rounded-md w-1/2 mx-auto">
              <img
                src={node.image || User}
                alt={node.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />

              <div>
                <div className="font-semibold">{node.name}</div>
                <div className="text-sm">{node.jobTitle}</div>
              </div>
            </div>
          </div>
        }
      >
        {node.subordinates && renderTree(node.subordinates)}
      </TreeNode>
    ));

  return (
    <div>
      {organizationData.length > 0 ? (
        <Tree label={<div>Owner/Admin</div>}>
          {renderTree(organizationData)}
        </Tree>
      ) : (
        <div className="w-full flex justify-center items-center mt-32">
          <p>Loading organization chart...</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationChart;
