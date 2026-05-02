// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    ID: string,
    String: string,
    Boolean: boolean,
}

export interface User {
    id: Scalars['ID']
    email: Scalars['String']
    status: Scalars['String']
    __typename: 'User'
}

export interface AuthPayload {
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
    user: User
    __typename: 'AuthPayload'
}

export interface TokenPair {
    accessToken: Scalars['String']
    refreshToken: Scalars['String']
    __typename: 'TokenPair'
}

export interface ResetRequestPayload {
    success: Scalars['Boolean']
    token: (Scalars['String'] | null)
    __typename: 'ResetRequestPayload'
}

export interface Query {
    me: User
    __typename: 'Query'
}

export interface Mutation {
    register: User
    login: AuthPayload
    refreshToken: TokenPair
    requestPasswordReset: ResetRequestPayload
    resetPassword: Scalars['Boolean']
    /**
     * Log out the user by revoking the provided refresh token.
     * Returns true even if the token is invalid or already revoked to ensure an idempotent and smooth UI logout flow.
     */
    logout: Scalars['Boolean']
    __typename: 'Mutation'
}

export interface UserGenqlSelection{
    id?: boolean | number
    email?: boolean | number
    status?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AuthPayloadGenqlSelection{
    accessToken?: boolean | number
    refreshToken?: boolean | number
    user?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TokenPairGenqlSelection{
    accessToken?: boolean | number
    refreshToken?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ResetRequestPayloadGenqlSelection{
    success?: boolean | number
    token?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryGenqlSelection{
    me?: UserGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationGenqlSelection{
    register?: (UserGenqlSelection & { __args: {email: Scalars['String'], password: Scalars['String']} })
    login?: (AuthPayloadGenqlSelection & { __args: {email: Scalars['String'], password: Scalars['String']} })
    refreshToken?: (TokenPairGenqlSelection & { __args: {refreshToken: Scalars['String']} })
    requestPasswordReset?: (ResetRequestPayloadGenqlSelection & { __args: {email: Scalars['String']} })
    resetPassword?: { __args: {email: Scalars['String'], token: Scalars['String'], newPassword: Scalars['String']} }
    /**
     * Log out the user by revoking the provided refresh token.
     * Returns true even if the token is invalid or already revoked to ensure an idempotent and smooth UI logout flow.
     */
    logout?: { __args: {refreshToken: Scalars['String']} }
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const User_possibleTypes: string[] = ['User']
    export const isUser = (obj?: { __typename?: any } | null): obj is User => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
      return User_possibleTypes.includes(obj.__typename)
    }
    


    const AuthPayload_possibleTypes: string[] = ['AuthPayload']
    export const isAuthPayload = (obj?: { __typename?: any } | null): obj is AuthPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isAuthPayload"')
      return AuthPayload_possibleTypes.includes(obj.__typename)
    }
    


    const TokenPair_possibleTypes: string[] = ['TokenPair']
    export const isTokenPair = (obj?: { __typename?: any } | null): obj is TokenPair => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTokenPair"')
      return TokenPair_possibleTypes.includes(obj.__typename)
    }
    


    const ResetRequestPayload_possibleTypes: string[] = ['ResetRequestPayload']
    export const isResetRequestPayload = (obj?: { __typename?: any } | null): obj is ResetRequestPayload => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isResetRequestPayload"')
      return ResetRequestPayload_possibleTypes.includes(obj.__typename)
    }
    


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const Mutation_possibleTypes: string[] = ['Mutation']
    export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
      return Mutation_possibleTypes.includes(obj.__typename)
    }
    