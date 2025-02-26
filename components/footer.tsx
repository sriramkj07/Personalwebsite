import { ThemeSwitcher } from './theme-switcher'

export function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 flex items-center justify-between text-sm">
        <a 
          href="https://x.com/Sriram0_7" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        >
          @sriram0_7
        </a>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
