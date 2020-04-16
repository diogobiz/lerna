import React, { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { SANInput } from '../../Atoms/Input'
import { SANTextArea } from '../../Atoms/TextArea'
import { SANSpin } from '../../Atoms/Spin'
import { SANCheckbox } from '../../Atoms/Checkbox'
import { SANButton } from '../../Atoms/Button'
import { SANModal, SANModalFooter, ISANModalProps } from '../../Molecules/Modal'
import {
    SANForm,
    SANFormItem,
    withSANForm,
    ISANFormComponentProps
} from '../../Molecules/Form'

interface IForm {
    email?: string
    message?: string
    check?: boolean
}

interface IParams {
    setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISANSupportProps extends ISANFormComponentProps {
    ModalProps: ISANModalProps
    onSubmit?: (values: any, params: IParams) => void
    form: any
    data?: IForm
}

const SANSupport: React.FC<ISANSupportProps> = ({
    form,
    onSubmit,
    data = {} as IForm,
    ModalProps
}) => {
    const { t } = useTranslation('components')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = e => {
        e.preventDefault()
        form.validateFields((err, values) => {
            if (!err) {
                setSubmitting(true)
                onSubmit(values, { setSubmitting })
                form.setFieldsValue({
                    message: '',
                    check: ''
                })
            }
        })
    }

    return (
        <SANModal
            centered
            title={t('support.title')}
            closable={false}
            {...ModalProps}
        >
            <SANSpin spinning={submitting}>
                <SANForm form={form} onSubmit={handleSubmit} novalidate>
                    <SANFormItem
                        mb='xl'
                        name='email'
                        label={t('support.email')}
                        initialValue={data.email || undefined}
                        rules={[
                            {
                                required: true,
                                message: t('formValidateMessages.required')
                            },
                            {
                                type: 'email',
                                message: t('formValidateMessages.types.email')
                            }
                        ]}
                    >
                        <SANInput
                            placeholder={t('support.email')}
                            size='large'
                            iconLeft='email-outline'
                        />
                    </SANFormItem>
                    <SANFormItem
                        mb='xl'
                        name='message'
                        label={t('support.message.title')}
                        rules={[
                            {
                                required: true,
                                message: t('formValidateMessages.required')
                            }
                        ]}
                    >
                        <SANTextArea
                            placeholder={t('support.message.placeholder')}
                            size='large'
                            rows={4}
                        />
                    </SANFormItem>
                    <SANFormItem name='check' mb='lg' valuePropName='checked'>
                        <SANCheckbox>{t('support.check')}</SANCheckbox>
                    </SANFormItem>
                    <SANModalFooter>
                        <SANButton
                            size='small'
                            mr='md'
                            variant='text'
                            uppercase
                            bold
                            onClick={ModalProps.onCancel}
                        >
                            {t('support.cancel')}
                        </SANButton>
                        <SANFormItem m='0'>
                            <SANButton
                                size='small'
                                variant='solid'
                                color='primary'
                                uppercase
                                bold
                                htmlType='submit'
                            >
                                {t('support.send')}
                            </SANButton>
                        </SANFormItem>
                    </SANModalFooter>
                </SANForm>
            </SANSpin>
        </SANModal>
    )
}

export default withSANForm<ISANSupportProps>(SANSupport)
