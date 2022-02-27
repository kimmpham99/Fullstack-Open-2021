const Notification = ({ message }) => {
    /*if (message === null || message.includes('will apear')) {
        return (
            <div className="pending_notification">
                New notifications will apear here!
            </div>
        )
    }*/

    if(message === null){
        return null
    }

    else if (message.includes('removed')) {
        return (
            <div className="error_notification">
                {message}
            </div>
        )
    }

    return (
        <div className="success_notification">
            {message}
        </div>
    )
}

export default Notification