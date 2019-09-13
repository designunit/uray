import * as React from 'react'

import MobileDetect from 'mobile-detect'

export function useMobile() {
    const [isMobile, setMobile] = React.useState(false)

    React.useEffect(() => {
        const md = new MobileDetect(window.navigator.userAgent)

        if (md.mobile()) {
            setMobile(true)
        }
    }, [])

    return isMobile
}
