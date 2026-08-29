// Centralized icon system for Banten IT Solutions
// Import all commonly used Lucide icons
import {
	// Navigation & UI
	ArrowRight,
	ChevronRight,
	ChevronLeft,
	ChevronDown,
	Home,
	Menu,
	X,
	Search,
	ExternalLink,
	Languages,

	// Social & Contact
	Mail,
	Phone,
	MessageCircle,
	Twitter,
	Linkedin,
	Facebook,
	Instagram,
	Youtube,
	MapPin,

	// Content & Media
	Calendar,
	Eye,
	FileText,
	Briefcase,
	Folder,
	Tag,
	ListOrdered,
	Image,
	Video,
	Play,

	// Technical
	Code,
	CodeXml,
	Database,
	Cpu,
	Server,
	Zap,
	Bot,
	Wallpaper,
	Palette,
	Cog,
	Network,
	HardDrive,
	Workflow,
	LineChart,
	Settings,
	PenTool,
	Layers,
	Smartphone,
	Cloud,
	Aperture,
	Shield,

	// Business & Status
	Trophy,
	Star,
	Heart,
	Check,
	CheckCircle,
	CheckCircle2,
	Globe,
	Sparkles,
	TrendingUp,
	Lightbulb,
	Users,
	Award,
	Building,

	// Theme
	Sun,
	Moon,

	// Forms
	Send,
	Link,
	Headphones,
	MessageSquare,
	Quote,
	MessageSquareQuote,
	Scale,
	Gavel,
	Lock,
	AlertCircle,
	Slack,

	// Additional
	ShoppingCart,
	Megaphone,
	LayoutDashboard,
	Rocket,
	Target,
	HeartHandshake,
	BarChart3,
	Brain,
	Activity,
	Monitor,
	GitBranch,
	DatabaseBackup,
	Package,
	ShieldAlert,
	Wifi,
	ShieldCheck,
	Clock,
	User,
	FolderGit
} from 'lucide-svelte';

import type { Component } from 'svelte';

// Type for icon names
export type IconName =
	// Navigation & UI
	| 'arrow-right'
	| 'chevron-right'
	| 'chevron-left'
	| 'chevron-down'
	| 'home'
	| 'menu'
	| 'x'
	| 'search'
	| 'external-link'
	| 'languages'

	// Social & Contact
	| 'mail'
	| 'phone'
	| 'message-circle'
	| 'twitter'
	| 'linkedin'
	| 'facebook'
	| 'instagram'
	| 'youtube'
	| 'map-pin'

	// Content & Media
	| 'calendar'
	| 'eye'
	| 'file-text'
	| 'briefcase'
	| 'folder'
	| 'tag'
	| 'list-ordered'
	| 'image'
	| 'video'
	| 'play'

	// Technical
	| 'code'
	| 'code-xml'
	| 'database'
	| 'cpu'
	| 'server'
	| 'zap'
	| 'bot'
	| 'wallpaper'
	| 'palette'
	| 'cog'
	| 'network'
	| 'hard-drive'
	| 'workflow'
	| 'line-chart'
	| 'settings'
	| 'pen-tool'
	| 'layers'
	| 'smartphone'
	| 'cloud'
	| 'aperture'
	| 'shield'

	// Business & Status
	| 'trophy'
	| 'star'
	| 'heart'
	| 'check'
	| 'check-circle'
	| 'check-circle-2'
	| 'globe'
	| 'sparkles'
	| 'trending-up'
	| 'lightbulb'
	| 'users'
	| 'award'
	| 'building'

	// Theme
	| 'sun'
	| 'moon'

	// Forms
	| 'send'
	| 'link'
	| 'headphones'
	| 'message-square'
	| 'quote'
	| 'message-square-quote'
	| 'scale'
	| 'gavel'
	| 'lock'
	| 'alert-circle'
	| 'slack'

	// Additional
	| 'shopping-cart'
	| 'megaphone'
	| 'layout-dashboard'
	| 'rocket'
	| 'target'
	| 'heart-handshake'
	| 'bar-chart-3'
	| 'brain'
	| 'activity'
	| 'monitor'
	| 'git-branch'
	| 'database-backup'
	| 'package'
	| 'shield-alert'
	| 'wifi'
	| 'shield-check'
	| 'clock'
	| 'user'
	| 'folder-git';

// Centralized icon mapping
export const iconMap: Record<IconName, typeof import('lucide-svelte').Code> = {
	// Navigation & UI
	'arrow-right': ArrowRight,
	'chevron-right': ChevronRight,
	'chevron-left': ChevronLeft,
	'chevron-down': ChevronDown,
	home: Home,
	menu: Menu,
	x: X,
	search: Search,
	'external-link': ExternalLink,
	languages: Languages,

	// Social & Contact
	mail: Mail,
	phone: Phone,
	'message-circle': MessageCircle,
	twitter: Twitter,
	linkedin: Linkedin,
	facebook: Facebook,
	instagram: Instagram,
	youtube: Youtube,
	'map-pin': MapPin,

	// Content & Media
	calendar: Calendar,
	eye: Eye,
	'file-text': FileText,
	briefcase: Briefcase,
	folder: Folder,
	tag: Tag,
	'list-ordered': ListOrdered,
	image: Image,
	video: Video,
	play: Play,

	// Technical
	code: Code,
	'code-xml': CodeXml,
	database: Database,
	cpu: Cpu,
	server: Server,
	zap: Zap,
	bot: Bot,
	wallpaper: Wallpaper,
	palette: Palette,
	cog: Cog,
	network: Network,
	'hard-drive': HardDrive,
	workflow: Workflow,
	'line-chart': LineChart,
	settings: Settings,
	'pen-tool': PenTool,
	layers: Layers,
	smartphone: Smartphone,
	cloud: Cloud,
	aperture: Aperture,
	shield: Shield,

	// Business & Status
	trophy: Trophy,
	star: Star,
	heart: Heart,
	check: Check,
	'check-circle': CheckCircle,
	'check-circle-2': CheckCircle2,
	globe: Globe,
	sparkles: Sparkles,
	'trending-up': TrendingUp,
	lightbulb: Lightbulb,
	users: Users,
	award: Award,
	building: Building,

	// Theme
	sun: Sun,
	moon: Moon,

	// Forms
	send: Send,
	link: Link,
	headphones: Headphones,
	'message-square': MessageSquare,
	quote: Quote,
	'message-square-quote': MessageSquareQuote,
	scale: Scale,
	gavel: Gavel,
	lock: Lock,
	'alert-circle': AlertCircle,
	slack: Slack,

	// Additional
	'shopping-cart': ShoppingCart,
	megaphone: Megaphone,
	'layout-dashboard': LayoutDashboard,
	rocket: Rocket,
	target: Target,
	'heart-handshake': HeartHandshake,
	'bar-chart-3': BarChart3,
	brain: Brain,
	activity: Activity,
	monitor: Monitor,
	'git-branch': GitBranch,
	'database-backup': DatabaseBackup,
	package: Package,
	'shield-alert': ShieldAlert,
	wifi: Wifi,
	'shield-check': ShieldCheck,
	clock: Clock,
	user: User,
	'folder-git': FolderGit
};

/**
 * Get an icon component by name
 * @param name - The icon name
 * @returns The icon component or a fallback
 */
export function getIcon(name: IconName): typeof import('lucide-svelte').Code {
	return iconMap[name] || Sparkles;
}

/**
 * Get icon component by string name (for dynamic usage)
 * @param name - The icon name as string
 * @returns The icon component or a fallback
 */
export function getIconByName(name: string): typeof import('lucide-svelte').Code {
	return iconMap[name as IconName] || Sparkles;
}

/**
 * Get icon component with fallback mapping for CMS icon names
 * Handles variations like 'code-xml' vs 'CodeXml' and all icons from iconMap
 * @param iconName - The icon name from CMS
 * @returns The icon component or fallback
 */
export function getIconComponent(iconName?: string | null): typeof import('lucide-svelte').Code {
	if (!iconName) return Sparkles;
	const normalizedName = iconName.toLowerCase();
	const iconEntry = Object.entries(iconMap).find(([key]) => key === normalizedName);
	if (iconEntry) {
		return iconEntry[1];
	}
	return Sparkles;
}

/**
 * Get icon as a Component type for dynamic usage
 * @param iconName - The icon name
 * @returns The icon component cast as Svelte Component
 */
export function getIconAsComponent(name: string): Component {
	return getIconComponent(name) as unknown as Component;
}
