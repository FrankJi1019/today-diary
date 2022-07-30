import {createContext, useContext} from 'react'
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession} from "amazon-cognito-identity-js";
import UserPool from "../cognito";
import {constants} from "../constants";
import {CognitoIdentityServiceProvider} from "aws-sdk";
import {useNavigate} from "react-router-dom";

const context = createContext({} as {
  login: (username: string, password: string) => Promise<boolean | string>
  signup: (username: string, email: string, password: string) => Promise<boolean | string>,
  confirmUser: (username: string, code: string) => Promise<boolean>
  getCurrentUser: () => CognitoUser | null,
  logout: () => void,
  resendCode: (username: string) => Promise<boolean>,
  getAccessToken: () => string | null,
})

// @ts-ignore
export const AuthProvider = ({children}) => {

  const navigate = useNavigate()

  const login = (username: string, password: string) => {
    return new Promise<boolean | string>(res => {
      const user = new CognitoUser({
        Username: username,
        Pool: UserPool
      })
      const authDetails = new AuthenticationDetails({
        Username: username,
        Password: password
      })
      user.authenticateUser(authDetails, {
        onSuccess: () => res(true),
        onFailure: (err) => res(err.message),
        newPasswordRequired: () => console.log('new password required'),
      })
    })
  }

  const signup = (username: string, email: string, password: string) => {
    return new Promise<boolean | string>(res => {
      UserPool.signUp(
        username,
        password,
        [
          {Name: 'email', Value: email} as CognitoUserAttribute
        ],
        [],
        (err) => {
          if (err) res(err.message)
          else res(true)
        }
      )
    })
  }

  const confirmUser = (username: string, code: string) => {
    return new Promise<boolean>(res => {
      const user = new CognitoUser({
        Username: username,
        Pool: UserPool
      })
      user.confirmRegistration(
        code,
        true,
        (err) => {
          if (err) res(false)
          else res(true)
        }
      )
    })
  }

  const getCurrentUser = () => {
    return UserPool.getCurrentUser()
  }

  const logout = () => {
    UserPool.getCurrentUser()?.signOut(() => navigate('/login'))
  }

  const resendCode = (username: string) => {
    return new Promise<boolean>(res => {
      const provider = new CognitoIdentityServiceProvider({
        region: constants.cognito.Region
      })
      provider.resendConfirmationCode({
        ClientId: constants.cognito.ClientId,
        Username: username,
      }, (err) => {
        if (err) res(false)
        else res(true)
      })
    })
  }

  const getAccessToken = () => {
    const user = UserPool.getCurrentUser()
    let res = null
    if (user) {
      user.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (session) res = session.getAccessToken().getJwtToken()
      })
    }
    return res
  }

  const data = {
    login,
    signup,
    confirmUser,
    getCurrentUser,
    logout,
    resendCode,
    getAccessToken
  }

  return (
    <context.Provider value={data}>
      {children}
    </context.Provider>
  )
}

export const useAuth = () => {
  return useContext(context)
}
