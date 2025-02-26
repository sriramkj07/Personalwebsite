import { ThemeSwitcher } from './theme-switcher'

export function Footer() {
  return (
    <footer className="w-full max-w-2xl mx-auto px-4 pb-12">
      <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <a 
          href="https://x.com/Sriram0_7" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-gray-800 dark:hover:text-gray-200"
        >
          @sriram0_7
        </a>
        <ThemeSwitcher />
      </div>
    </footer>
  )
}
