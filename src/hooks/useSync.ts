import * as React from 'react'
import useWebSocket from 'react-use-websocket'

export function useSync(websocketUrl: string, enabled: boolean): [any, 'online' | 'offline' | 'connecting' | 'failed'] {
    const wsOptions = React.useMemo(() => ({
        retryOnError: true,
        onClose: (event: any) => console.log('WS:Close', event),
        onError: (error: any) => console.log('WS:Error', error),
        onOpen: (event: any) => console.log('WS:Open', event),
    }), [])

    const [wsSend, wsMessage, wsStatus] = useWebSocket(websocketUrl, wsOptions)
    const onlineStatus = wsStatus === 1
        ? 'online'
        : 'offline'

    const [message, setMessage] = React.useState(wsMessage)

    React.useEffect(() => {
        if (enabled) {
            try {
                const message = JSON.parse(wsMessage.data)
                setMessage(message)
            } catch (e) {
                console.log(e)
            }
        } else {
            setMessage(null)
        }
    }, [wsMessage])

    return [message, onlineStatus]
}
