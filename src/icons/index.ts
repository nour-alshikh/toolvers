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
import arrowFilled from '@/assets/images/arrow-filled.svg'
import lightDark from '@/assets/images/light-dark.svg'
import headerArrowDown from '@/assets/images/header-arrow-down.svg'
import person from '@/assets/images/person.svg' 
import logo from '@/assets/images/logo.png'
import darkLogo from '@/assets/images/logo-dark.png'
import editIcon  from '@/assets/images/edit.svg'
import copyIcon from '@/assets/images/copy.svg'
import deleteIcon from '@/assets/images/delete.svg'
import statisticsIcon from '@/assets/images/statistics.svg'
import show from '@/assets/images/show.svg'
import path from '@/assets/images/Path.svg'
import filter from '@/assets/images/filter.svg'
import plus from '@/assets/images/plus.svg'
import profile from '@/assets/images/profile.svg'
import logout from '@/assets/images/logout.svg'
import phone from '@/assets/images/phone.svg'
import salla from '@/assets/images/salla.svg'
import settings from '@/assets/images/settings.svg'
import gear from '@/assets/images/gear.svg'
import packages from '@/assets/images/packages.svg'
import packagesWhite from '@/assets/images/packages-white.svg'
import stack from '@/assets/images/stack.svg'
import check from '@/assets/images/Check.svg'
import rocket from '@/assets/images/rocket.svg'
import arrowLeft from '@/assets/images/arrow-left.svg'
import arrowLeftWhite from '@/assets/images/arrow-left-white.svg'
import authBg from '@/assets/images/auth-bg.jpg'

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
  arrowFilled: string
  lightDark: string
  headerArrowDown: string
  person: string
  logo: string
  darkLogo: string
  editIcon: string
  copyIcon: string
  deleteIcon: string
  statisticsIcon: string
  show: string
  path: string
  filter: string
  plus: string
  profile: string
  logout: string
  phone: string 
  salla: string
  settings: string
  gear: string
  packages: string
  packagesWhite: string
  stack: string
  check: string
  rocket: string
  arrowLeft: string
  arrowLeftWhite: string
  authBg: string
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
  arrowFilled: arrowFilled,
  lightDark: lightDark,
  headerArrowDown: headerArrowDown,
  person: person,
  logo: logo,
  darkLogo: darkLogo,
  editIcon: editIcon,
  copyIcon: copyIcon,
  deleteIcon: deleteIcon,
  statisticsIcon: statisticsIcon,
  show: show,
  path: path,
  filter: filter,
  plus: plus,
  profile: profile,
  logout: logout,
  phone: phone,
  salla: salla,
  settings: settings,
  gear: gear,
  packages: packages,
  packagesWhite: packagesWhite,
  stack: stack,
  check: check,
  rocket: rocket,
  arrowLeft: arrowLeft,
  arrowLeftWhite: arrowLeftWhite,
  authBg: authBg,
  }
