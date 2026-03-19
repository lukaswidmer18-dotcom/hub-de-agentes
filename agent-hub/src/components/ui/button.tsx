import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#FFC000] to-[#F6D52A] text-[#243F38] shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/45 hover:brightness-110 font-extrabold",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:brightness-110",
        outline:
          "border border-yellow-400/20 bg-white/5 hover:bg-yellow-400/10 hover:border-yellow-400/40 text-white",
        secondary:
          "bg-[#243F38] text-white hover:bg-[#2e5048] border border-yellow-400/10",
        ghost: "hover:bg-yellow-400/10 text-[#BFBFBF] hover:text-white border border-transparent hover:border-yellow-400/15",
        link: "text-[#FFC000] underline-offset-4 hover:underline",
        glass: "backdrop-blur-md border text-white hover:brightness-110 shadow-xl",
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
