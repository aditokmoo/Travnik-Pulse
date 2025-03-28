//import { BiSolidDrink } from 'react-icons/bi'
import {LiaStoreAltSolid} from 'react-icons/lia'
import {PiForkKnife} from 'react-icons/pi'
import {MdOutlineFastfood, MdOutlineBakeryDining, MdOutlineLocalGasStation} from 'react-icons/md'
export const allShopPreferences = [
    {
        value: 'Stores',
        preference: 'stores',
        icon: <LiaStoreAltSolid />,
    },
    {
        value: 'Resturants',
        preference: 'resturants',
        icon: <PiForkKnife />,
    },
    {
        value: 'Fast food',
        preference: 'food',
        icon: <MdOutlineFastfood />,
    },
    {
        value: 'Gas',
        preference: 'gas',
        icon: <MdOutlineLocalGasStation />,
    },
    {
        value: 'Bakery',
        preference: 'bakery',
        icon: <MdOutlineBakeryDining />,
    },
]