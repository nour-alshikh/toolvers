// imports
import PrimaryMobile from '@/assets/images/primary-phone.svg'
import PrimaryDesktop from '@/assets/images/primary-desktop.svg'
import BlackMobile from '@/assets/images/black-phone.svg'
import BlackDesktop from '@/assets/images/black-desktop.svg'
import EditActive from '@/assets/images/edit-active.svg'
import EditNotActive from '@/assets/images/edit-not-active.svg'
import ShowSettingsActive from '@/assets/images/show-settings-active.svg'
import ShowSettingsNotActive from '@/assets/images/show-settings-not-active.svg'
import Download from '@/assets/images/download.svg'
import ArrowUpDownload from '@/assets/images/arrow-up-download.svg'
import freeMove from '@/assets/images/free-move.svg'
import addCircle from '@/assets/images/add-circle.svg'
// نوع موحد للأيقونات اللي فيها active/inactive
type StateIcons = {
  active: string
  inactive: string
}

// نوع موحد للأيقونات اللي فيها desktop/mobile
type DeviceIcons = {
  mobile: string
  desktop: string
}

export const icons: {
  primary: DeviceIcons
  black: DeviceIcons
  edit: StateIcons
  showSettings: StateIcons
  download: string
  arrowUpDownload: string
  freeMove: string
  addCircle: string
} = {
  primary: {
    mobile: PrimaryMobile,
    desktop: PrimaryDesktop,
  },
  black: {
    mobile: BlackMobile,
    desktop: BlackDesktop,
  },
  edit: {
    active: EditActive,
    inactive: EditNotActive,
  },
  showSettings: {
    active: ShowSettingsActive,
    inactive: ShowSettingsNotActive,
  },
  download: Download,
  arrowUpDownload: ArrowUpDownload,
  freeMove: freeMove,
  addCircle: addCircle,
}
