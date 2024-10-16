import { useEffect } from "react";
import specialImg from "../../assets/img/specialities/specialities-01.png";
import DataTable from "datatables.net-dt";
import PageHeader from "../../components/PageHeader/PageHeader";
import Banner from '../../assets/img/banner.png'

const Dashboard = () => {
  useEffect(() => {
    new DataTable(".datatable");
  });
  return (
    <>
      <PageHeader title="Dashboard" />

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h2>Instruction for Application User</h2>
            </div>
            <div>
              <img src={Banner} alt="banner" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
