import { useParams } from "react-router-dom"
import UserList from "./UserList"
import AddUser from "./AddUser"
import PageNotFound from "@/pages/otherPages/PageNotFound"
import UserWallet from "../UserWallet/UserWallet"

export default function User() {
  const { page } = useParams()

  const renderPage = () => {
    switch (page) {
      case 'list':
        return <UserList />
      case 'add':
      case 'edit':
      case 'view':
        return <AddUser />
      case 'wallet':
        return <UserWallet />
      default:
        return <PageNotFound />
    }
  }

  return <>{renderPage()}</>
}
