import {CognitoUserPool} from 'amazon-cognito-identity-js'
import {constants} from "./constants";

const poolData = {
  UserPoolId: constants.cognito.UserPoolId,
  ClientId: constants.cognito.ClientId
}

const UserPool = new CognitoUserPool(poolData)

export default UserPool
