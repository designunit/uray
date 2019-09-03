import { shallow } from 'enzyme'
import { OnlineStatus } from '.'
import { Icon } from 'antd'

describe('<OnlineStatus/>', () => {
    it('properly render component', () => {
        const component = shallow((
            <OnlineStatus
                status={'online'}
            />
        ))

        expect(component).toMatchSnapshot()
    })
    
    it('should contain <Icon/> component', () => {
        const component = shallow((
            <OnlineStatus
                status={'online'}
            />
        ))

        expect(component.find(Icon).length).toBe(1)
    })
})
