import { LayoutSidebarProvider } from "../../contexts/LayoutSidebarContext"
import LayoutHolder from "./LayoutHolder"

const Layout = () => {



  return (
    <LayoutSidebarProvider>
      <LayoutHolder />
    </LayoutSidebarProvider>
  )
}

export default Layout
