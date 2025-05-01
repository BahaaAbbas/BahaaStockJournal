import { DashboardProvider } from "../../contexts/DashboardContext"
import { LayoutSidebarProvider } from "../../contexts/LayoutSidebarContext"
import { ReportsProvider } from "../../contexts/ReportsContext"
import LayoutHolder from "./LayoutHolder"

const Layout = () => {



  return (

    <LayoutSidebarProvider>
      <ReportsProvider>
        <DashboardProvider>
          <LayoutHolder />
        </DashboardProvider>
      </ReportsProvider>

    </LayoutSidebarProvider>
  )
}

export default Layout
