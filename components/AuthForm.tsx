import clsx from 'clsx'
import React, { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Logo } from '../utils/icons'
import classes from '../styles/Form.module.scss'
import Input from './Input'
import Provider from './Providers'

type formProps = {
  type?: string
  btn?: string | React.ReactNode
  providers?: any
  loading?: boolean
  loadingText?: string
  onFormSubmit: (data: FieldValues) => void
  handleProvider: (id: string) => void
}

const AuthForm: FC<formProps> = ({
  type,
  btn,
  loading,
  loadingText,
  onFormSubmit,
  providers,
  handleProvider,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = handleSubmit(
    (data) => {
      onFormSubmit(data)
    },
  )

  return (
    <div className={classes.formContainer}>
      <form className={classes.form}>
        <header className={classes.formHeader}>
          <Logo size={32} />
          <h2>{type === 'login' ? 'Welcome back!' : 'Create an account'}</h2>
          <p>
            {type === 'login'
              ? "Explore the new games that have been added while you're away."
              : 'A universe filled with a huge range of games awaits you.'}
          </p>
        </header>
        {type === 'register' && (
          <Input
            label="Nick Name"
            name="name"
            type="text"
            placeholder="The Futuristic Gamer"
            aria-label="username"
            autoComplete="current-name"
            autoFocus
            register={register('name', {
              minLength: {
                value: 3,
                message: `Your nick name must be at least 3 characters!`,
              },
            })}
            error={errors?.name}
            optional
          />
        )}
        <Input
          label={'Email'}
          name={'email'}
          type="email"
          required
          placeholder="Gaming email"
          aria-label="user-email"
          autoComplete="current-email"
          autoFocus={type === 'login'}
          register={register('email', {
            required: `Email is required!`,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'Invalid email address!',
            },
          })}
          error={errors?.email}
        />
        <Input
          label={'Password'}
          type="password"
          name="password"
          placeholder={
            type === 'login' ? `Your Super secret ✨` : `Super secret ✨ - minimum 8 characters`
          }
          aria-label="user-password"
          show={showPassword}
          handleClick={() => setShowPassword((prev) => !prev)}
          register={register('password', {
            required: `Password is required!`,
            ...(type === 'register'
              ? {
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                  },
                  minLength: {
                    value: 8,
                    message: 'Password should be atleast 8 characters long!',
                  },
                }
              : {}),
          })}
          error={errors?.password}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className={clsx(classes.btn, classes.primary)}
          disabled={loading}
        >
          {loading ? loadingText : btn}
        </button>
      </form>
      <div className={classes.separator}>
        <span className={classes.stroke} />
        <span className={classes.text}>Or</span> <span className={classes.stroke} />
      </div>
      {providers
        ? providers?.map((provider) =>
            provider.id !== 'credentials' ? (
              <button
                key={provider.id}
                type="button"
                onClick={() => handleProvider(provider.id)}
                className={clsx(classes.btn, classes.outlined)}
                disabled={loading}
              >
                <Provider id={provider.id} />
                Continue with {provider.name}
              </button>
            ) : null,
          )
        : null}
    </div>
  )
}

export default AuthForm
