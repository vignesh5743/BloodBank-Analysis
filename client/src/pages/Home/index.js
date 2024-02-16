import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllBloodBroupsInInventory } from "../../apicalls/dashboard";
import { SetLoading } from "../../redux/loadersSlice";
import { message ,Button ,Space} from "antd";
import InvetoryTable from "../../components/InventoryTable";
//import { getLoggedInUserName } from "../../utils/helpers";

import { Link } from 'react-router-dom';

// import Query1 from "../query/query1"; 
// import Query2 from "../query/query2";



function Home() {
  const { currentUser } = useSelector((state) => state.users);
  const [bloodGroupsData = [], setBloodGroupsData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllBloodBroupsInInventory();
      dispatch(SetLoading(false));
      if (response.success) {
        setBloodGroupsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const colours = [
    "#2B3467",
    "#1A5F7A",
    "#B8621B",
    "#245953",
    "#2C3333",
    "#804674",
    "#A84448",
    "#635985",
    "#0db1de",
  ];
  return (
    <div>

      {currentUser.userType === "organisation" && (
        <>
          <div className="grid grid-cols-4 gap-5 mb-5 mt-2">
            {bloodGroupsData.map((bloodGroup, index) => {
              const color = colours[index];
              return (
                <div
                  className={`p-5 flex justify-between text-white rounded items-center`}
                  style={{ backgroundColor: color }}
                >
                  <h1 className="text-5xl uppercase">
                    {bloodGroup.bloodGroup}
                  </h1>

                  <div className="flex flex-col justify-between gap-2">
                    <div className="flex justify-between gap-5">
                      <span>Total In</span>
                      <span>{bloodGroup.totalIn} ML</span>
                    </div>
                    <div className="flex justify-between gap-5">
                      <span>Total Out</span>
                      <span>{bloodGroup.totalOut} ML</span>
                    </div>

                    <div className="flex justify-between 5">
                      <span>Available</span>
                      <span>{bloodGroup.available} ML</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Inventory
          </span>
          <InvetoryTable
            filters={{
              organisation: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
          

      <h1>Query pages</h1>
      <br/>
      <Space size="large">
        <Button type="primary">
          <Link to="/query5">Query1</Link>
        </Button>
        <Button type="primary">
          <Link to="/query6">Query2</Link>
        </Button>
        <Button type="primary">
          <Link to="/query7">Query3</Link>
        </Button>
        <Button type="primary">
          <Link to="/query8">Query4</Link>
        </Button>
        <Button type="primary">
            <Link to="/query9">Query5</Link>
        </Button>
      </Space>

        </>
      )}

      {currentUser.userType === "donor" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Donations
          </span>
          <InvetoryTable
            filters={{
              donor: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}

      {currentUser.userType === "hospital" && (
        <div>
          <span className="text-xl text-gray-700 font-semibold">
            Your Recent Requests / Consumptions
          </span>
          <InvetoryTable
            filters={{
              hospital: currentUser._id,
            }}
            limit={5}
            userType={currentUser.userType}
          />
        </div>
      )}

     
    </div>

  );
}

export default Home;
