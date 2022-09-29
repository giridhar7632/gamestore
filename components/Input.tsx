import { FC } from 'react'
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from 'react-hook-form'
import { Hidden, Visible } from '../utils/icons'
import classes from '../styles/Form.module.scss'

type inputProps = {
  label?: string
  type?: string
  show?: Boolean
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | any
  register?: UseFormRegisterReturn<string>
  handleClick?: () => void
  optional?: boolean
  [x: string]: any
}

const Input: FC<inputProps> = ({
  label,
  type,
  show,
  error,
  register,
  handleClick,
  optional,
  ...props
}) => {
  return (
    <div className={classes.input}>
      <div className={classes.label} role={'label'}>
        <label>
          {label} {optional ? `(optional)` : null}
        </label>
        {type === 'password' && (
          <span onClick={handleClick} className={classes.eye}>
            {show ? (
              <>
                <Hidden size={20} style={{ marginRight: 5 }} /> Hide
              </>
            ) : (
              <>
                <Visible size={20} style={{ marginRight: 5 }} /> Show
              </>
            )}
          </span>
        )}
      </div>
      <input
        className={classes.inputElement}
        type={type !== 'password' ? type : show ? 'text' : 'password'}
        {...props}
        {...register}
        style={
          error
            ? {
                outline: '2px solid rgba(238, 29, 82, 0.3)',
                border: '1px solid rgba(238, 29, 82, 0.3)',
              }
            : {}
        }
      />
      {error && <p className={classes.error}>{error.message}</p>}
    </div>
  )
}

export default Input
