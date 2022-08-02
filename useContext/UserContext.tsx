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
  role: string | undefined ;
  divisiName: string | undefined ;
  divisiCode: string | undefined ;
  stateID: string | undefined ;
  stateName: string | undefined ;
  deleteUserData: () => void ;
}

const UserContext = createContext<UserContextType>({
  name: undefined,
  nim: undefined,
  email: undefined,
  role: undefined,
  divisiName: undefined,
  divisiCode: undefined,
  stateID: undefined,
  stateName: undefined,
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
    role: undefined,
    divisiName: undefined,
    divisiCode: undefined,
    stateID: undefined,
    stateName: undefined,
    deleteUserData: () => {}
  })

  const jwt = useReadLocalStorage<string>("token")

  const isMyTokenExpired = isExpired(jwt as string)

  const deleteUserData = () => {
    setUserData({
      name: undefined,
      nim: undefined,
      email: undefined,
      role: undefined,
      divisiName: undefined,
      divisiCode: undefined,
      stateID: undefined,
      stateName: undefined,
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
          role: string;
          divisiName: string;
          divisiCode: string;
          stateID: string;
          stateName: string;
        } = decodeToken(jwt.toString())!

        setUserData({
          name: decodedToken.name,
          nim: decodedToken.nim,
          email: decodedToken.email,
          role: decodedToken.role,
          divisiName: decodedToken.divisiName,
          divisiCode: decodedToken.divisiCode,
          stateID: decodedToken.stateID,
          stateName: decodedToken.stateName,
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