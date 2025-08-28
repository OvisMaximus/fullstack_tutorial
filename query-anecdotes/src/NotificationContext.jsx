/* eslint-disable react-refresh/only-export-components */
import {createContext, useContext, useReducer} from 'react'
import PropTypes from "prop-types";

const EMPTY_NOTIFICATION = {
    message: '',
    type: ''
}

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'NOTIFY_SUCCESS':
            return {
                message: action.notification,
                type: 'success'
            }
        case 'NOTIFY_ERROR':
            return {
                message: action.notification,
                type: 'error'
            }
        case 'NOTIFY_CLEAR':
        default:
            return EMPTY_NOTIFICATION
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, EMPTY_NOTIFICATION)
    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

NotificationContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

const useNotificationContextElement = (index) => {
    const notificationAndDispatch = useContext(NotificationContext)
    const result = notificationAndDispatch[index];
    console.log('useNotificationContextElement> ', result)
    return result;
}

export const useNotificationValue = () => useNotificationContextElement(0)
export const useNotificationDispatch = () => useNotificationContextElement(1)


let timeoutId = null
const dispatchMessage = (notification, type, dispatch) => {
    console.log('dispatch Message', notification)
    dispatch({type, notification})
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => dispatch({type: 'NOTIFY_CLEAR'}), 5000)
}

export const successMessage = (notification, dispatch) => {
    dispatchMessage(notification, 'NOTIFY_SUCCESS', dispatch)
}

export const errorMessage = (notification, dispatch) => {
    dispatchMessage(notification, 'NOTIFY_ERROR', dispatch)
}