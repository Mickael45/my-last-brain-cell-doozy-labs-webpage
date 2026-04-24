
import nextPlugin from "@next/eslint-plugin-next";
import tseslint from 'typescript-eslint';
import globals from 'globals';


export default tseslint.config(
    {
        ignores: ['dist', '.next', 'convex/_generated', 'next-env.d.ts']
    },
    ...tseslint.configs.recommended,
    {
        plugins: {
            '@next/next': nextPlugin
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            // We intentionally don't use next/image to avoid Vercel's paid
            // image optimization endpoint (402 on quota exhaustion).
            '@next/next/no-img-element': 'off'
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        }
    }
);
