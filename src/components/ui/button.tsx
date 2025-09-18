import { defineComponent, computed, h, type HTMLAttributes, type ButtonHTMLAttributes, type VNode } from 'vue';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
export type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>['size']>;

export interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {
  asChild?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  class?: string;
}

export const Button = defineComponent({
  name: 'Button',
  props: {
    asChild: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String as () => ButtonVariant,
      default: 'default',
    },
    size: {
      type: String as () => ButtonSize,
      default: 'default',
    },
    class: {
      type: String,
      default: '',
    },
  },
  setup(props, { slots, attrs }) {
    const classes = computed(() => 
      cn(buttonVariants({ variant: props.variant, size: props.size, className: props.class }))
    );

    return () => {
      const Comp = props.asChild ? slots.default : 'button';
      
      if (typeof Comp === 'function') {
        const [child] = Comp();
        if (child) {
          return h(
            child.type as any,
            {
              ...child.props,
              class: [classes.value, child.props?.class],
              ...attrs,
            },
            child.children
          );
        }
      }

      return h(
        'button',
        {
          class: classes.value,
          ...attrs,
        },
        slots.default?.()
      );
    };
  },
});

export default Button;
