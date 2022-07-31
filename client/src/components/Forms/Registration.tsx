import authImg from '../../assets/images/auth/img-01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faEnvelope, faLock, faFileText } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/authReducer';
import { Link, useNavigate } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

const RegistrationForm = (props: {formError: string}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuth = useSelector((state: AppStateType) => state.authPage.isAuth)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameDirty, setNameDirty] = useState(false)
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameError, setNameError] = useState('Name can\'t be empty')
  const [emailError, setEmailError] = useState('Email can\'t be empty')
  const [passwordError, setPasswordError] = useState('Password can\'t be empty')
  const [isFormValid, setIsFormValid] = useState(false)
  
  useEffect(() => {
    if(emailError || passwordError) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [emailError, passwordError])

  useEffect(() => {
    if(isAuth) {
        navigate('/')
    }
  }, [isAuth, navigate])

  const nameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if(!e.target.value.length) {
      setNameError('Name can\'t be empty')
    } else{
      setNameError('')
    }
  }

  const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!re.test(String(e.target.value).toLowerCase())) {
      setEmailError('Incorrect email')
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if(e.target.value.length < 6 || e.target.value.length > 30) {
      setPasswordError('Password has to be more 6 and less 30')
      if(!e.target.value) {
        setPasswordError('Password can\'t be empty')
      }
    } else{
      setPasswordError('')
    }
  }

  const blurHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch(event.target.name) {
      case 'name':
        setNameDirty(true)
        break
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPasswordDirty(true)
        break
    }
  }

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if(!emailError && !passwordError) {
      dispatch(register({email, password, name}) as any)
    }
  }

  return (
      <div className="auth-form">
        <div className="auth-form--container">
          <div className="auth-form--wrap">
            <div className="auth-form--img">
                <img src={authImg} alt="IMG"/>
            </div>
            <form onSubmit={e => submitHandler(e as FormEvent<HTMLFormElement>)} className="auth-form--form">
              <span className="auth-form--title">
                Member Logind
              </span>

              {props.formError && 
                <span className="auth-form--validation">
                  <div>{props.formError}</div>
                </span>
              }

              <span className="auth-form--validation">
                {(nameDirty && nameError) && <div>{nameError}</div> }
              </span>
              <div className="auth-form--input-wrap">
                <input 
                  className="auth-form--input" 
                  name="name"
                  type="text" 
                  placeholder="First name" 
                  onBlur={e => blurHandler(e)}
                  value={name} 
                  onChange={e => nameHandler(e)}
                />
                <span className="auth-form--symbol-input">
                  <FontAwesomeIcon icon={faFileText} />
                </span>
              </div>

              <span className="auth-form--validation">
                {(emailDirty && emailError) && <div>{emailError}</div> }
              </span>
              <div className="auth-form--input-wrap">
                <input 
                  className="auth-form--input" 
                  name="email"
                  type="text" 
                  placeholder="Email" 
                  onBlur={e => blurHandler(e)}
                  value={email} 
                  onChange={e => emailHandler(e)}
                />
                <span className="auth-form--symbol-input">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
              </div>

              <span className="auth-form--validation">
                {(passwordDirty && passwordError) && <div>{passwordError}</div> }
              </span>
              <div className="auth-form--input-wrap">
                <input 
                  className="auth-form--input"
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  onBlur={e => blurHandler(e)}
                  value={password} 
                  onChange={e => passwordHandler(e)}
                />
                <span className="auth-form--symbol-input">
                  <FontAwesomeIcon icon={faLock} />
                </span>
              </div>

              <div className="auth-form--container-btn">
                <button disabled={!isFormValid} type='submit' className={"auth-form--submit-btn" + (isFormValid ? "" : " auth-form--disabled-submit-btn")}>
                  Sign up
                </button>
              </div>
              <div className="text-center p-t-136 auth-form--create-account">
                <Link className="auth-form--create-account-link" to='/login'>
                  Log in your Account &nbsp;
                  <FontAwesomeIcon icon={faArrowRightLong} />
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
  )
}

export default RegistrationForm