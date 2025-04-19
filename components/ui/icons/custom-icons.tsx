import {
  User,
  Search,
  List,
  Settings,
  Users,
  Music,
  Info,
  LogOut,
  Trash2,
  Lock,
  HelpCircle,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { Icon } from "./icon";

export const UserIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={User} {...props} />;

export const SearchIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Search} {...props} />;

export const ListIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={List} {...props} />;

export const SettingsIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Settings} {...props} />;

export const GroupIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Users} {...props} />;

export const MusicIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Music} {...props} />;

export const InfoIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Info} {...props} />;

export const LogOutIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={LogOut} {...props} />;

export const TrashIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Trash2} {...props} />;

export const LockIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Lock} {...props} />;

export const HelpIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={HelpCircle} {...props} />;

export const MailIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Mail} {...props} />;

export const MessageIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={MessageSquare} {...props} />;

export const PhoneIcon = (
  props: Omit<React.ComponentProps<typeof Icon>, "icon">
) => <Icon icon={Phone} {...props} />;
