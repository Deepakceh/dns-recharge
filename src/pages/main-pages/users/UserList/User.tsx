import { useParams } from "react-router-dom"
import UserList from "./UserList"
import AddUser from "./AddUser"
import PageNotFound from "@/pages/otherPages/PageNotFound"

export default function User() {
  const { page } = useParams()
  console.log('get page name', page)

  const renderPage = () => {
    switch (page) {
      case 'list':
        return <UserList />
      case 'add':
      case 'edit':
      case 'view':
        return <AddUser />
      default:
        return <PageNotFound />
    }
  }

  return <>{renderPage()}</>
}
