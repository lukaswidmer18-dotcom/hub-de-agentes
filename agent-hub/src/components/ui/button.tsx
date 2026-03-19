import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:brightness-110",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:brightness-110",
        outline:
          "border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white",
        secondary:
          "bg-white/10 text-white hover:bg-white/20 border border-white/5",
        ghost: "hover:bg-white/5 text-slate-400 hover:text-white border border-transparent hover:border-white/5",
        link: "text-sky-400 underline-offset-4 hover:underline",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20 shadow-xl",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 rounded-lg text-xs",
        lg: "h-14 px-10 rounded-2xl text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
