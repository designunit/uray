import * as React from 'react'
import useWebSocket from 'react-use-websocket'

export type ConnectionStatus = 'online' | 'offline' | 'connecting' | 'failed'

export function useSync(websocketUrl: string, enabled: boolean): [any, ConnectionStatus] {
    const wsOptions = React.useMemo(() => ({
        retryOnError: true,
        onClose: (event: any) => console.log('WS:Close', event),  // tslint:disable-line:no-console
        onError: (error: any) => console.log('WS:Error', error),  // tslint:disable-line:no-console
        onOpen: (event: any) => console.log('WS:Open', event),  // tslint:disable-line:no-console
    }), [])

    const [wsSend, wsMessage, wsStatus] = useWebSocket(websocketUrl, wsOptions)
    const onlineStatus = wsStatus === 1
        ? 'online'
        : 'offline'

    const [message, setMessage] = React.useState(wsMessage)

    React.useEffect(() => {
        if (enabled && wsMessage) {
            try {
                const messageData = JSON.parse(wsMessage.data)
                setMessage(messageData)
            } catch (e) {
                console.log(e) // tslint:disable-line:no-console
            }
        } else {
            setMessage(null)
        }
    }, [wsMessage])

    return [message, onlineStatus]
}
