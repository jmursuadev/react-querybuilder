import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				outline: "hsl(var(--outline))",
				input: {
					DEFAULT: "hsl(var(--input))",
					foreground: "hsl(var(--input-foreground))",
				},
				ring: "rgba(var(--ring))",
				background: "hsl(var(--background))",
				foreground: {
					DEFAULT: "hsl(var(--foreground))",
					gray: "hsl(var(--foreground-gray))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
					rgb: "rgba(var(--primary-rgb), 1)",
					"rgb-light": "rgba(var(--primary-rgb), 0.06)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				tertiary: {
					foreground: "rgba(var(--green-2-rgb), 1)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				green: {
					DEFAULT: "hsl(var(--green))",
					rgb: "rgba(var(--green-rgb), 1)",
					2: "rgba(var(--green-2-rgb), 1)",
				},
				gray: {
					DEFAULT: "hsl(var(--gray))",
					2: "hsl(var(--gray-2))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
					border: "hsl(var(--border-popover))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			height: {
				input: "var(--input-height)",
			},
			maxHeight: {
				input: "var(--input-height)",
			},
			fontSize: {
				sm: "0.875rem",
			},
			boxShadow: {
				"drop-box": "var(--popover-shadow)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
