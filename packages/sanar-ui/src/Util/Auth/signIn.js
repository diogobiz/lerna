import { Auth } from 'aws-amplify'

import i18n from '../../Translate'

const esSignIn = (email, password) => {
    return Auth.signIn(email, password).catch(err => {
        switch (err.code) {
            case 'UserNotFoundException':
                return Promise.reject({
                    code: err.code,
                    message: i18n.t(
                        'sanarui:authMessages.userNotFoundException'
                    )
                })
            case 'NotAuthorizedException':
                return Promise.reject({
                    code: err.code,
                    message: i18n.t(
                        'sanarui:authMessages.notAuthorizedException'
                    )
                })
            case 'UserLambdaValidationException':
                return Promise.reject({
                    code: err.code,
                    message: i18n.t('sanarui:authMessages.noEnrollment')
                })
            default:
                return Promise.reject({
                    code: err.code,
                    message: i18n.t('sanarui:authMessages.generic')
                })
        }
    })
}

export default esSignIn
