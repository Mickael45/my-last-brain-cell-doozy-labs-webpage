
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
            ...nextPlugin.configs['core-web-vitals'].rules
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        }
    }
);
