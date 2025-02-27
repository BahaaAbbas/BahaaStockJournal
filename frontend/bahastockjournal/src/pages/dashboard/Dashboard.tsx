import { DashboardProvider } from "../../contexts/DashboardContext"
import DashboardHolder from "./DashboardHolder"

const Dashboard = () => {

  return (
    
    <DashboardProvider>
      <DashboardHolder />
    </DashboardProvider>
    

  )

}

export default Dashboard
