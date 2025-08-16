import AppHeader from '../comonents/AppHeader';
import { Outlet } from "react-router";

const GuesstLayout = () => {

  return (
    <>
      <AppHeader /> <hr/><hr/><hr/><hr/><hr/><hr/>GuesstLayout
      <div id="detail" >
        <Outlet />
      </div>
    </>
  )
}

export default GuesstLayout
