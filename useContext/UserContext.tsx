import { decodeToken, isExpired } from "react-jwt"
import { useReadLocalStorage } from "usehooks-ts"
import { 
  useContext, 
  createContext, 
  useState, 
  useEffect, 
  ReactNode, 
  FunctionComponent 
} from "react"

interface UserContextType {
  name: string | undefined ;
  nim: string | undefined ;
  email: string | undefined ;
  deleteUserData: () => void ;
}

const UserContext = createContext<UserContextType>({
  name: undefined,
  nim: undefined,
  email: undefined,
  deleteUserData: () => {}
})

type UserContextWrapperType = {
  children: ReactNode;
}

export const UserContextWrapper: FunctionComponent<UserContextWrapperType> = ({ children }) => {
  const [userData, setUserData] = useState<UserContextType>({
    name: undefined,
    nim: undefined,
    email: undefined,
    deleteUserData: () => {}
  })

  const jwt = useReadLocalStorage<string>("token")

  const isMyTokenExpired = isExpired(jwt as string)

  const deleteUserData = () => {
    setUserData({
      name: undefined,
      nim: undefined,
      email: undefined,
      deleteUserData: () => {}
    })
  }

  useEffect(() => {
    if (jwt && !isMyTokenExpired) {
      try{
        const decodedToken: {
          name: string;
          nim: string;
          email: string;
        } = decodeToken(jwt.toString())!

        setUserData({
          name: decodedToken.name,
          nim: decodedToken.nim,
          email: decodedToken.email,
          deleteUserData: deleteUserData
        })
      } catch(err){
        console.log(err)
      }
    }
  }, [jwt])

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  return useContext(UserContext)
}